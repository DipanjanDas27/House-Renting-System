import {baseTemplate} from "./baseMailTemplate.js";

export const paymentCreatedTemplate = (amount) =>
  baseTemplate({
    title: "Payment Initiated",
    subtitle: "Your payment request has been created.",
    content: `
      <p>Payment Amount: <strong>₹${amount}</strong></p>
      <p>The transaction is currently being processed.</p>
    `,
  });

  export const paymentSuccessTemplate = (amount) =>
  baseTemplate({
    title: "Payment Successful",
    subtitle: "Your transaction was completed successfully.",
    content: `
      <p style="color:#10B981;font-weight:600;">₹${amount} has been successfully received.</p>
      <p>You can view transaction details in your dashboard.</p>
    `,
  });

  export const ownerPaymentReceivedTemplate = (tenantName, amount) =>
  baseTemplate({
    title: "Payment Received",
    subtitle: "You have received a new payment.",
    content: `
      <p><strong>${tenantName}</strong> has paid <strong>₹${amount}</strong>.</p>
      <p>The amount has been successfully credited.</p>
    `,
  });
  
  export const paymentFailedTemplate = (amount) =>
  baseTemplate({
    title: "Payment Failed",
    subtitle: "Your transaction could not be processed.",
    content: `
      <p style="color:#EF4444;font-weight:600;">₹${amount} payment failed.</p>
      <p>Please retry the transaction from your dashboard.</p>
    `,
  });

  export const refundTemplate = (amount) =>
  baseTemplate({
    title: "Refund Initiated",
    subtitle: "Your payment has been successfully refunded.",
    content: `
      <p style="color:#EF4444;font-weight:600;">
        ₹${amount} has been refunded to your original payment method.
      </p>
      <p>Please allow 3–5 business days for the amount to reflect in your account.</p>
      <p>If you do not receive the refund within this period, please contact support.</p>
    `,
  });