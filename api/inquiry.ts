import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed. Use POST." });
  }

  const { name, email, service, notes } = req.body;

  // Validation
  if (!name || !email || !service || !notes) {
    return res.status(400).json({
      success: false,
      error: "Missing required inquiry fields (name, email, service, notes).",
    });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  // Fallback if environment variable is not defined on Vercel Dashboard secrets yet
  if (!webhookUrl) {
    console.warn("⚠️ N8N_WEBHOOK_URL is not defined in Vercel Environment Variables.");
    return res.status(200).json({
      success: true,
      simulated: true,
      message: "Inquiry processed. Please configure N8N_WEBHOOK_URL in your Vercel Dashboard secrets.",
      payload: { name, email, service, notes },
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        service,
        notes,
        timestamp: new Date().toISOString(),
        source: "NexusIT Landing Page (Vercel Serverless)"
      })
    });

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    const text = await response.text();
    let responseData = {};
    try {
      if (text) responseData = JSON.parse(text);
    } catch (_) {
      responseData = { text };
    }

    return res.status(200).json({
      success: true,
      simulated: false,
      message: "Inquiry enqueued and forwarded to n8n workflow successfully.",
      n8n_response: responseData
    });
  } catch (error: any) {
    console.error("❌ n8n webhook error under Serverless context:", error);
    return res.status(500).json({
      success: false,
      error: "Transmitting payload to n8n webhook failed.",
      details: error.message || error
    });
  }
}
