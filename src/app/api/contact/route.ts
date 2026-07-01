import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/content";

export const runtime = "nodejs";

// Sender must be on a domain verified in Resend. Until meerkatphotography.au
// is verified there, fall back to Resend's shared onboarding sender.
const FROM = process.env.CONTACT_FROM ?? "Meerkat Photography <onboarding@resend.dev>";
// Where enquiries land. Defaults to the studio inbox from site content.
const TO = process.env.CONTACT_TO ?? site.email;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  source?: unknown;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  // The Vercel env var is called RESEND (the raw API key).
  const apiKey = process.env.RESEND;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured. Please try again later." },
      { status: 500 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message);
  const source = clean(body.source) || "Website";

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Please fill in your name, email and phone." },
      { status: 400 },
    );
  }

  // Basic email sanity check.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Message", message || "(no message)"],
    ["Source", source],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#382f27;line-height:1.5">
      <h2 style="color:#d85850;margin:0 0 16px">New enquiry from ${escapeHtml(source)}</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
                 <td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">${label}</td>
                 <td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td>
               </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry from ${name} (${source})`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your enquiry. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
