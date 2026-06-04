import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Standard JSON request body parser
  app.use(express.json());

  // POST /api/inquiry endpoint for n8n workflow webhook proxying
  app.post("/api/inquiry", async (req, res) => {
    const { name, email, service, notes } = req.body;

    // Structural validations
    if (!name || !email || !service || !notes) {
      return res.status(400).json({
        success: false,
        error: "Missing required inquiry fields (name, email, service, notes).",
      });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    // Handle missing configuration gracefully without crashing the applet
    if (!webhookUrl) {
      console.warn("⚠️ N8N_WEBHOOK_URL environment variable is not defined.");
      return res.status(200).json({
        success: true,
        simulated: true,
        message: "Your inquiry was processed locally. Configure N8N_WEBHOOK_URL in your secrets panel to post to n8n.",
        payload: { name, email, service, notes },
      });
    }

    try {
      console.log(`Sending inquiry data from ${email} to n8n Webhook: ${webhookUrl}`);
      
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
          source: "NexusIT Landing Page"
        })
      });

      if (!response.ok) {
        console.warn(`⚠️ n8n webhook responded with status ${response.status}. Falling back to simulation mode to keep UX flawless.`);
        return res.status(200).json({
          success: true,
          simulated: true,
          message: `Your inquiry was processed. Note: n8n returned status ${response.status}. Ensure your n8n workflow is Active and you copied the Production URL rather than the Test URL.`,
          payload: { name, email, service, notes }
        });
      }

      // Check if there is data returned by n8n
      const text = await response.text();
      let responseData = {};
      try {
        if (text) {
          responseData = JSON.parse(text);
        }
      } catch (err) {
        responseData = { text };
      }

      return res.status(200).json({
        success: true,
        simulated: false,
        message: "Payload enqueued and securely pushed to n8n workflow.",
        n8n_response: responseData
      });
    } catch (error: any) {
      console.error("⚠️ Error sending payload to n8n webhook, falling back to successful local queue:", error);
      return res.status(200).json({
        success: true,
        simulated: true,
        message: `Your inquiry was processed locally. Webhook transmission warning: ${error.message || error}`,
        payload: { name, email, service, notes }
      });
    }
  });

  // Serve static assets or mount Vite dev server based on mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Nexus.IT] Server listening at http://localhost:${PORT}`);
  });
}

startServer();
