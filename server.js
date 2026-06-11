import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 8080);
const distPath = path.join(__dirname, "dist");
// Shared secret for the admin sync endpoint. When unset, sync is disabled.
const syncKey = process.env.AFRIPATH_SYNC_KEY || "";

app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" }));

// The native app fetches the catalog cross-origin (capacitor https://localhost).
app.use("/api", (_request, response, next) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type, X-AfriPath-Sync-Key");
  next();
});

app.get("/healthz", (_request, response) => {
  response.status(200).json({ status: "ok", service: "afripath" });
});

app.post("/api/afripath/sync", (request, response) => {
  if (!syncKey) {
    response.status(503).json({
      status: "disabled",
      message: "Sync is not configured on this deployment.",
    });
    return;
  }

  if (request.get("x-afripath-sync-key") !== syncKey) {
    response.status(401).json({ status: "unauthorized" });
    return;
  }

  response.status(202).json({
    status: "accepted",
    receivedAt: new Date().toISOString(),
    records: Array.isArray(request.body?.dataset?.opportunities)
      ? request.body.dataset.opportunities.length
      : undefined,
  });
});

app.use(
  express.static(distPath, {
    extensions: ["html"],
    maxAge: "1h",
  }),
);

app.get("*", (_request, response) => {
  response.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`AfriPath server listening on ${port}`);
});
