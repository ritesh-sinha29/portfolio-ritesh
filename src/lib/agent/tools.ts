// src/lib/agent/tools.ts

import fs from "fs";
import path from "path";
import { Resend } from "resend";
import { RITESH_PROFILE } from "./knowledge";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const RITESH_PRIMARY_EMAIL = RITESH_PROFILE.email;
const SENDER_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Ritesh AI <onboarding@resend.dev>";

export interface ContactRiteshParams {
  visitorEmail: string;
  visitorName?: string;
  subject?: string;
  message: string;
}

export interface SendRiteshDetailsParams {
  recipientEmail: string;
  recipientName?: string;
  note?: string;
}

/**
 * Deliver a visitor's inquiry directly to Ritesh's inbox
 */
export async function contactRitesh({
  visitorEmail,
  visitorName,
  subject,
  message,
}: ContactRiteshParams) {
  if (!resend) {
    console.warn("[Ritesh Tool] RESEND_API_KEY is not configured in environment.");
    return {
      success: true,
      message: `Your message has been recorded for Ritesh Sinha (${RITESH_PRIMARY_EMAIL}). (Note: Configure RESEND_API_KEY in .env.local for live email dispatch).`,
      simulated: true,
    };
  }

  try {
    const senderTitle = visitorName ? `${visitorName} (${visitorEmail})` : visitorEmail;
    const emailSubject = subject
      ? `[Portfolio Inquiry] ${subject} - from ${senderTitle}`
      : `[Portfolio Inquiry] New message from ${senderTitle}`;

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #faf8f5; border: 2px solid #141b16; border-radius: 16px; color: #141b16;">
        <div style="padding-bottom: 16px; border-bottom: 2px solid #141b16;">
          <span style="background-color: #c5eb35; color: #141b16; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; padding: 4px 12px; border-radius: 9999px; border: 1px solid #141b16;">
            New Portfolio Message
          </span>
          <h2 style="margin: 14px 0 4px 0; font-size: 22px; color: #141b16;">
            Inquiry from ${visitorName || "A Portfolio Visitor"}
          </h2>
          <p style="margin: 0; color: #5a625b; font-size: 13px;">
            Reply directly to: <a href="mailto:${visitorEmail}" style="color: #141b16; font-weight: bold;">${visitorEmail}</a>
          </p>
        </div>

        <div style="padding: 20px 0;">
          <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #5a625b; margin: 0 0 8px 0;">
            Message Content:
          </h3>
          <div style="background-color: #ffffff; border: 1.5px solid #141b16; border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.6; color: #141b16; white-space: pre-wrap; box-shadow: 2px 2px 0px #141b16;">
${message}
          </div>
        </div>

        <div style="padding-top: 14px; border-top: 1px solid rgba(20,27,22,0.1); font-size: 12px; color: #5a625b; text-align: center;">
          Sent automatically via Ritesh AI Assistant on portfolio-ritesh.
        </div>
      </div>
    `;

    const response = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [RITESH_PRIMARY_EMAIL],
      replyTo: visitorEmail,
      subject: emailSubject,
      html: emailHtml,
    });

    if (response.error) {
      console.error("[Ritesh Tool] Resend error in contactRitesh:", response.error);
      return {
        success: false,
        message: `Failed to deliver email: ${response.error.message}`,
      };
    }

    return {
      success: true,
      message: `Your message has been delivered directly to Ritesh Sinha's inbox (${RITESH_PRIMARY_EMAIL}). He will get back to you at ${visitorEmail} soon!`,
      emailId: response.data?.id,
    };
  } catch (err: unknown) {
    console.error("[Ritesh Tool] Exception in contactRitesh:", err);
    return {
      success: false,
      message: `Error sending message: ${err instanceof Error ? err.message : "Unknown error"}`,
    };
  }
}

/**
 * Email Ritesh's complete resume PDF, dossier, and links to a visitor's email
 */
export async function sendRiteshDetails({
  recipientEmail,
  recipientName,
  note,
}: SendRiteshDetailsParams) {
  if (!resend) {
    console.warn("[Ritesh Tool] RESEND_API_KEY is not configured in environment.");
    return {
      success: true,
      message: `Ritesh's portfolio dossier & resume download link have been prepared for ${recipientEmail}! (Note: Set RESEND_API_KEY in .env.local for automatic inbox PDF dispatch).`,
      simulated: true,
    };
  }

  const greetingName = recipientName ? ` ${recipientName}` : "";

  // Load resume PDF buffer from public directory if present
  const attachments: { filename: string; content: Buffer }[] = [];
  try {
    const resumePath = path.join(process.cwd(), "public", "resume.pdf");
    if (fs.existsSync(resumePath)) {
      const resumeBuffer = fs.readFileSync(resumePath);
      attachments.push({
        filename: "Ritesh_Sinha_Resume.pdf",
        content: resumeBuffer,
      });
    }
  } catch (attachErr) {
    console.warn("[Ritesh Tool] Could not read resume.pdf for attachment:", attachErr);
  }

  try {
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background-color: #123826; color: #ffffff; border-radius: 16px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.15);">
          <span style="background-color: #c5eb35; color: #141b16; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; padding: 4px 12px; border-radius: 9999px;">
            AI Engineer Dossier &amp; Resume
          </span>
          <h1 style="color: #ffffff; margin: 16px 0 6px 0; font-size: 26px; letter-spacing: -0.02em;">
            Ritesh Sinha
          </h1>
          <p style="color: #c5eb35; margin: 0; font-size: 14px; font-weight: 500;">
            Founder @ VRSA Analytics • Full-Stack AI Engineer
          </p>
        </div>

        <div style="padding: 20px 0;">
          <p style="font-size: 15px; line-height: 1.6; color: #e2e8f0; margin: 0 0 16px 0;">
            Hello${greetingName},
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 16px 0;">
            Thank you for your interest! Attached to this email is <strong>Ritesh Sinha's official Resume PDF (Ritesh_Sinha_Resume.pdf)</strong> along with his complete profile, direct links, and engineering dossier.
          </p>

          ${
            note
              ? `<div style="background: rgba(255,255,255,0.08); border-left: 3px solid #c5eb35; padding: 12px 16px; border-radius: 6px; margin: 16px 0;">
                  <p style="margin: 0; font-size: 13px; color: #e2e8f0;"><em>"${note}"</em></p>
                </div>`
              : ""
          }

          <div style="background-color: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px; margin: 20px 0;">
            <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5eb35;">
              📌 Direct Links &amp; Resume
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 2;">
              <li>📄 <strong>Resume Attachment:</strong> <em>Ritesh_Sinha_Resume.pdf</em> (attached below)</li>
              <li>📧 <strong>Email:</strong> <a href="mailto:${RITESH_PRIMARY_EMAIL}" style="color: #c5eb35; text-decoration: none;">${RITESH_PRIMARY_EMAIL}</a></li>
              <li>💻 <strong>GitHub:</strong> <a href="${RITESH_PROFILE.socials.github}" style="color: #90caff; text-decoration: none;">${RITESH_PROFILE.socials.github}</a></li>
              <li>💼 <strong>LinkedIn:</strong> <a href="${RITESH_PROFILE.socials.linkedin}" style="color: #90caff; text-decoration: none;">${RITESH_PROFILE.socials.linkedin}</a></li>
            </ul>
          </div>

          <div style="background-color: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5eb35;">
              🛠️ Core Stack &amp; Focus
            </h3>
            <p style="font-size: 13px; line-height: 1.6; color: #cbd5e1; margin: 0;">
              Multi-Agent Systems (LangGraph), Temporal.io Durable Execution, Vercel AI SDK, Voice AI (Vapi), Next.js 16, React 19, TypeScript, PostgreSQL, Redis, and Scalable Cloud Architectures.
            </p>
          </div>

          <div style="text-align: center; margin-top: 28px;">
            <a href="mailto:${RITESH_PRIMARY_EMAIL}" style="display: inline-block; background-color: #c5eb35; color: #141b16; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 9999px;">
              Reply or Schedule a Call
            </a>
          </div>
        </div>

        <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px; margin-top: 20px;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">
            Sent automatically by Ritesh AI • Ritesh Sinha's Portfolio Agent
          </p>
        </div>
      </div>
    `;

    const response = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [recipientEmail],
      replyTo: RITESH_PRIMARY_EMAIL,
      subject: "Ritesh Sinha - Resume PDF & Portfolio Dossier",
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (response.error) {
      console.error("[Ritesh Tool] Resend error in sendRiteshDetails:", response.error);
      return {
        success: false,
        message: `Resend notice: ${response.error.message}`,
      };
    }

    return {
      success: true,
      message: `Ritesh's complete details, resume PDF attachment, and social profiles have been dispatched to ${recipientEmail}!`,
      emailId: response.data?.id,
    };
  } catch (err: unknown) {
    console.error("[Ritesh Tool] Exception in sendRiteshDetails:", err);
    return {
      success: false,
      message: `Error dispatching details: ${err instanceof Error ? err.message : "Unknown error"}`,
    };
  }
}
