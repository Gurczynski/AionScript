// Netlify Function: Contact form email via Resend
// Env vars to set in Netlify UI:
// - RESEND_API_KEY (required)
// - CONTACT_TO_EMAIL (required: where to receive messages)
// - CONTACT_FROM_EMAIL (optional: verified sender, else uses onboarding@resend.dev)
// - CONTACT_SUBJECT_PREFIX (optional)

/* eslint-disable no-undef */

exports.handler = async (event) => {
  const allowedMethods = ["OPTIONS", "POST"];
  if (!allowedMethods.includes(event.httpMethod)) {
    return respond(405, { error: "Method Not Allowed" });
  }

  // CORS (same origin on Netlify; keep permissive for simplicity)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(),
      body: "",
    };
  }

  try {
    const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";
    let payload = {};
    if (contentType.includes("application/json")) {
      payload = JSON.parse(event.body || "{}");
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      payload = Object.fromEntries(new URLSearchParams(event.body));
    } else {
      // Fallback: try JSON parse
      try { payload = JSON.parse(event.body || "{}"); } catch (_) { payload = {}; }
    }

    const { firstName = "", lastName = "", email = "", message = "", company = "" } = payload;

    // Honeypot: if filled, treat as spam silently succeed
    if (company && String(company).trim().length > 0) {
      return respond(200, { ok: true });
    }

    if (!email || !message || !firstName || !lastName) {
      return respond(400, { error: "Missing required fields" });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) return respond(500, { error: "Server not configured (CONTACT_TO_EMAIL missing)" });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return respond(500, { error: "Server not configured (RESEND_API_KEY missing)" });

    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || "AionScript Contact";

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `${subjectPrefix}: ${fullName}`;

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">New Contact Message</h2>
        <p><strong>From:</strong> ${escapeHtml(fullName)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;border-left:3px solid #76C5F0;padding-left:12px">${escapeHtml(message)}</div>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
        <p style="font-size:12px;color:#555">Sent via aionscript.com contact form</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, reply_to: email }),
    });

    if (!res.ok) {
      const text = await safeText(res);
      return respond(502, { error: "Failed to send", detail: text });
    }

    return respond(200, { ok: true });
  } catch (err) {
    return respond(500, { error: "Unexpected error", detail: String(err && err.message || err) });
  }
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify(body),
  };
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function safeText(res) {
  try { return await res.text(); } catch { return ""; }
}

