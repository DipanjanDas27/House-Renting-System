export const baseTemplate = ({ title, subtitle, content, footerNote }) => `
  <div style="margin:0;padding:0;background:#F3F4F6;font-family:Segoe UI,Arial,sans-serif;">
    <div style="max-width:640px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.05);">

      <div style="background:#2563EB;padding:24px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:1px;">Dwellio</h1>
      </div>

      <div style="padding:32px;color:#111827;">
        <h2 style="margin-top:0;font-size:20px;">${title}</h2>
        <p style="color:#6B7280;margin-top:4px;">${subtitle || ""}</p>

        <div style="margin-top:24px;font-size:15px;line-height:1.6;">
          ${content}
        </div>
      </div>

      <div style="background:#F9FAFB;padding:20px;text-align:center;font-size:12px;color:#6B7280;">
        ${footerNote || "This is an automated email from Dwellio. Please do not reply directly."}
      </div>

    </div>
  </div>
`;