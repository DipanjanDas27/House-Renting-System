import {baseTemplate} from "./baseMailTemplate.js";

export const rentalCreatedTemplate = () =>
  baseTemplate({
    title: "Rental Request Submitted",
    subtitle: "Your rental is under processing.",
    content: `
      <p>Your rental request has been recorded successfully.</p>
      <p>Once payment is confirmed, the agreement will become active.</p>
    `,
  });

  export const ownerRentalRequestTemplate = (propertyTitle, tenantName) =>
  baseTemplate({
    title: "New Rental Request",
    subtitle: "A tenant has requested your property.",
    content: `
      <p><strong>${tenantName}</strong> has requested to rent <strong>${propertyTitle}</strong>.</p>
      <p>Please review from your dashboard.</p>
    `,
  });

  export const rentalActivatedTemplate = () =>
  baseTemplate({
    title: "Rental Activated",
    subtitle: "Your agreement is now active.",
    content: `
      <p style="color:#10B981;font-weight:600;">Your rental agreement is now active.</p>
      <p>You can manage or renew your rental from your dashboard.</p>
    `,
  });

  export const ownerRentalActivatedTemplate = (propertyTitle) =>
  baseTemplate({
    title: "Rental Activated",
    subtitle: "Your property is now rented.",
    content: `
      <p>Your property <strong>${propertyTitle}</strong> is now active under a rental agreement.</p>
    `,
  });

  export const rentalRenewedTemplate = () =>
  baseTemplate({
    title: "Rental Renewed",
    subtitle: "Your rental has been successfully renewed.",
    content: `
      <p>Your rental period has been extended successfully.</p>
      <p>Thank you for continuing with Dwellio.</p>
    `,
  });

  export const ownerRentalRenewedTemplate = (propertyTitle) =>
  baseTemplate({
    title: "Rental Renewed",
    subtitle: "A tenant has renewed their rental.",
    content: `
      <p>The rental for <strong>${propertyTitle}</strong> has been renewed successfully.</p>
    `,
  });

  export const rentalTerminatedTemplate = () =>
  baseTemplate({
    title: "Rental Terminated",
    subtitle: "Your rental agreement has ended.",
    content: `
      <p>Your rental agreement has been terminated.</p>
      <p>If this was unexpected, please contact support.</p>
    `,
  });

  export const ownerRentalTerminatedTemplate = (propertyTitle) =>
  baseTemplate({
    title: "Rental Terminated",
    subtitle: "Rental agreement has ended.",
    content: `
      <p>The rental agreement for <strong>${propertyTitle}</strong> has been terminated.</p>
    `,
  });

  export const rentalCancelledTemplate = () =>
  baseTemplate({
    title: "Rental Cancelled",
    subtitle: "Your rental has been cancelled.",
    content: `
      <p>Your rental request has been cancelled successfully.</p>
      <p>If a payment was made, refund processing will begin shortly.</p>
    `,
  });

  export const ownerRentalCancelledTemplate = (propertyTitle) =>
  baseTemplate({
    title: "Rental Cancelled",
    subtitle: "Rental request was cancelled.",
    content: `
      <p>The rental request for <strong>${propertyTitle}</strong> has been cancelled.</p>
    `,
  });