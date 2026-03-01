import {baseTemplate} from "./baseMailTemplate.js";

export const registerTemplate = (name) =>
  baseTemplate({
    title: "Welcome to Dwellio 🎉",
    subtitle: "Your account has been successfully created.",
    content: `
      <p>Hello <strong>${name}</strong>,</p>
      <p>We're excited to have you on board. You can now explore properties, manage rentals, and make secure payments.</p>
      <p>Log in to your dashboard to get started.</p>
    `,
  });

  export const loginTemplate = () =>
  baseTemplate({
    title: "New Login Detected",
    subtitle: "We noticed a login to your account.",
    content: `
      <p>Your Dwellio account was just accessed.</p>
      <p>If this was you, no action is required.</p>
      <p>If not, please reset your password immediately.</p>
    `,
  });

