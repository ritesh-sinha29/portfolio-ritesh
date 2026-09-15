import { Resend } from "resend";
import { z } from "zod";
import { RITESH_PROFILE } from "@/lib/agent/knowledge";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const RITESH_PRIMARY_EMAIL = RITESH_PROFILE.email;
const SENDER_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Ritesh Portfolio <onboarding@resend.dev>";

const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(5, "Message must be at least 5 characters long"),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg =
        validation.error.issues?.[0]?.message || "Invalid input data";
      return new Response(JSON.stringify({ error: errorMsg }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { email, message, name } = validation.data;

    // 1. Resend Email Dispatch
    if (!resend) {
      console.warn(
        "[Contact API] RESEND_API_KEY not configured. Message recorded in local session.",
        { email, name, message }
      );
      return new Response(
        JSON.stringify({
          success: true,
          message: "Your message has been received! (Configure RESEND_API_KEY for live email dispatch).",
          simulated: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailSubject = name
      ? `[Portfolio Contact] Message from ${name} (${email})`
      : `[Portfolio Contact] Message from ${email}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf8f5; color: #141b16; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 2px solid #141b16; overflow: hidden; box-shadow: 4px 4px 0px #141b16; }
    .header { background: #141b16; color: #ffffff; padding: 24px 28px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .content { padding: 28px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #5a625b; font-weight: 700; margin-bottom: 6px; }
    .value { font-size: 15px; color: #141b16; margin-bottom: 20px; font-weight: 600; }
    .message-box { background: #faf8f5; border: 1.5px solid #141b16; padding: 18px 20px; border-radius: 10px; font-size: 15px; line-height: 1.6; color: #141b16; white-space: pre-wrap; box-shadow: 2px 2px 0px #141b16; }
    .footer { padding: 18px 28px; background: #faf8f5; border-top: 1px solid rgba(20,27,22,0.1); font-size: 12px; color: #5a625b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
    </div>
    <div class="content">
      ${name ? `<div class="label">Sender Name</div><div class="value">${name}</div>` : ""}
      <div class="label">Sender Email</div>
      <div class="value"><a href="mailto:${email}" style="color: #141b16; text-decoration: underline;">${email}</a></div>
      <div class="label">Message</div>
      <div class="message-box">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    </div>
    <div class="footer">
      Dispatched automatically from Ritesh Sinha's Portfolio Website
    </div>
  </div>
</body>
</html>
    `.trim();

    const response = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [RITESH_PRIMARY_EMAIL],
      replyTo: email,
      subject: emailSubject,
      html: htmlContent,
    });

    if (response.error) {
      console.error("[Contact API] Resend error:", response.error);
      return new Response(
        JSON.stringify({ error: response.error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your message has been dispatched directly to Ritesh!",
        emailId: response.data?.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("[Contact API] Exception:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal Server Error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
