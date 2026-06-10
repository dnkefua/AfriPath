import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 8080);
const distPath = path.join(__dirname, "dist");

app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" }));

app.get("/healthz", (_request, response) => {
  response.status(200).json({ status: "ok", service: "afripath" });
});

app.post("/api/afripath/sync", (request, response) => {
  response.status(202).json({
    status: "accepted",
    receivedAt: new Date().toISOString(),
    records: Array.isArray(request.body?.opportunities) ? request.body.opportunities.length : undefined,
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
