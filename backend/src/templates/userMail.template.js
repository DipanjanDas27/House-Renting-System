import {baseTemplate} from "./baseMailTemplate.js";

export const otpTemplate = (otp) =>
  baseTemplate({
    title: "Verification Code",
    subtitle: "Use the code below to proceed.",
    content: `
      <div style="text-align:center;margin:20px 0;">
        <div style="display:inline-block;padding:14px 28px;background:#2563EB;color:#ffffff;font-size:24px;letter-spacing:6px;border-radius:8px;">
          ${otp}
        </div>
      </div>
      <p>This code will expire shortly.</p>
    `,
  });

export const forgotPasswordTemplate = (otp) =>
  baseTemplate({
    title: "Password Reset Request",
    subtitle: "Use the code below to reset your password.",
    content: `
      <p>We received a request to reset your Dwellio account password.</p>

      <div style="text-align:center;margin:24px 0;">
        <div style="display:inline-block;padding:14px 28px;background:#2563EB;color:#ffffff;font-size:26px;letter-spacing:6px;border-radius:10px;">
          ${otp}
        </div>
      </div>

      <p>This code will expire in 5 minutes.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  });

export const passwordUpdatedTemplate = () =>
  baseTemplate({
    title: "Password Updated",
    subtitle: "Your account security has been updated.",
    content: `
      <p>Your password has been changed successfully.</p>
      <p>If this wasn’t you, contact support immediately.</p>
    `,
  });
  
export const passwordResetSuccessTemplate = () =>
  baseTemplate({
    title: "Password Reset Successful",
    subtitle: "Your password has been updated.",
    content: `
      <p>Your Dwellio account password has been successfully reset.</p>
      <p>If this was not you, please contact support immediately.</p>
    `,
  });

export const accountDeletedTemplate = () =>
  baseTemplate({
    title: "Account Deleted",
    subtitle: "Your account has been permanently removed.",
    content: `
      <p>Your Dwellio account has been deleted successfully.</p>
      <p>We're sorry to see you go.</p>
    `,
  });