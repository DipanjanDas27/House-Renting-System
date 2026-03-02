import {
  createPayment,
  getPaymentsByTenant,
  getPaymentsByOwner,
  updatePaymentStatus,
  deletePayment,
  getPaymentById,
  getPaymentByTransactionId,
} from "../models/payment.model.js";

import { getUserById } from "../models/user.model.js";
import sendMail from "./mail.service.js";
import { ApiError } from "../utils/apiError.js";
import { paymentCreatedTemplate, paymentFailedTemplate, paymentSuccessTemplate, refundTemplate, ownerPaymentReceivedTemplate } from "../templates/paymentMail.template.js";

export const createPaymentService = async ({
  agreement_id,
  tenant_id,
  owner_id,
  amount,
  idempotency_key,
  gatewayResponse,
}) => {

  const tenant = await getUserById(tenant_id);
  if (!tenant) throw new ApiError(404, "Tenant not found");

  const owner = await getUserById(owner_id);
  if (!owner) throw new ApiError(404, "Owner not found");

  if (tenant.role !== "tenant")
    throw new ApiError(403, "Only tenants can make payments");

  const rental = await getRentalById(agreement_id);
  if (!rental)
    throw new ApiError(404, "Rental not found");

  if (rental.status === "cancelled")
    throw new ApiError(400, "Payment not allowed for this rental status");

  let payment;
  let gatewaySuccess = false;

  try {

    payment = await createPayment({
      agreement_id,
      tenant_id,
      owner_id,
      amount,
      payment_status: "pending",
      idempotency_key,
    });

    await sendMail({
      to: tenant.email,
      subject: "Payment Initiated - Dwellio",
      html: paymentCreatedTemplate(amount),
    });

    if (!gatewayResponse) {

      const failed = await updatePaymentStatus(
        payment.id,
        "failed",
        null
      );

      await sendMail({
        to: tenant.email,
        subject: "Payment Failed - Dwellio",
        html: paymentFailedTemplate(amount),
      });

      return failed;
    }

    if (gatewayResponse.status === "success") {

      gatewaySuccess = true;

       const result = await updatePaymentStatus(
        payment.id,
        "success",
        gatewayResponse.transaction_id
      );

      await sendMail({
        to: tenant.email,
        subject: "Payment Successful - Dwellio",
        html: paymentSuccessTemplate(amount),
      });

      await sendMail({
        to: owner.email,
        subject: "Payment Received - Dwellio",
        html: ownerPaymentReceivedTemplate(
          tenant.full_name,
          amount
        ),
      });

      return result;
    }

     const failed = await updatePaymentStatus(
      payment.id,
      "failed",
      gatewayResponse.transaction_id || null
    );

    await sendMail({
      to: tenant.email,
      subject: "Payment Failed - Dwellio",
      html: paymentFailedTemplate(amount),
    });

    return failed;

  } catch (error) {

    if (gatewaySuccess && gatewayResponse?.transaction_id) {

      await processDummyRefund({
        transaction_id: gatewayResponse.transaction_id,
      });

      if (payment?.id) {
        await updatePaymentStatus(payment.id, "refunded");
      }

      await sendMail({
        to: tenant.email,
        subject: "Refund Processed - Dwellio",
        html: refundTemplate(amount),
      });
    }

    throw error;
  }
};

export const getTenantPaymentsService = async (tenantId) => {
  const tenant = await getUserById(tenantId);
  if (!tenant) throw new ApiError(404, "Tenant not found");

  const result = await getPaymentsByTenant(tenantId);
  if (!result || result.length === 0)
    throw new ApiError(404, "No payments found for this tenant");
  return result;
};

export const getOwnerPaymentsService = async (ownerId) => {
  const owner = await getUserById(ownerId);
  if (!owner) throw new ApiError(404, "Owner not found");

  const result = await getPaymentsByOwner(ownerId);
  if (!result || result.length === 0)
    throw new ApiError(404, "No payments found for this owner");
  return result;
};

export const getPaymentByIdService = async (paymentId, userId) => {
  const payment = await getPaymentById(paymentId);

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (
    payment.tenant_id !== userId &&
    payment.owner_id !== userId
  ) {
    throw new ApiError(403, "Forbidden: Access denied");
  }

  return payment;
};

export const getPaymentByTransactionIdService = async (transactionId, userId) => {
  const payment = await getPaymentByTransactionId(transactionId);

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (
    payment.tenant_id !== userId &&
    payment.owner_id !== userId
  ) {
    throw new ApiError(403, "Forbidden: Access denied");
  }

  return payment;
};

export const deletePaymentService = async (paymentId) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) throw new ApiError(404, "Payment not found");
  if (payment.payment_status !== "failed")
    throw new ApiError(400, "Only failed payments can be deleted");

  const deleted = await deletePayment(paymentId);

  if (!deleted) throw new ApiError(404, "Payment not found");

  return { message: "Payment deleted successfully" };
};