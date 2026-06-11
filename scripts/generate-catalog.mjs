// Emits the bundled catalog as static JSON (public/api/catalog.json).
// The hosted app serves it at /api/catalog.json, letting installed apps pick
// up catalog updates without a Play Store release. Run via `npm run build`
// (prebuild hook) with tsx so the TypeScript catalog can be imported directly.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OPPORTUNITIES,
  DIRECTORY_ENTRIES,
  VISA_FREE_PROGRAMS,
  VISA_SPONSORED_PROGRAMS,
  APPROVED_SPONSOR_COMPANIES,
  APPROVED_SPONSOR_JOBS,
} from "../src/data.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "api");
const outFile = path.join(outDir, "catalog.json");

const catalog = {
  generatedAt: new Date().toISOString(),
  opportunities: OPPORTUNITIES,
  directoryEntries: DIRECTORY_ENTRIES,
  visaFreePrograms: VISA_FREE_PROGRAMS,
  visaSponsoredPrograms: VISA_SPONSORED_PROGRAMS,
  approvedSponsorCompanies: APPROVED_SPONSOR_COMPANIES,
  approvedSponsorJobs: APPROVED_SPONSOR_JOBS,
};

await mkdir(outDir, { recursive: true });
await writeFile(outFile, JSON.stringify(catalog));
console.log(`Catalog written to ${outFile} (${catalog.opportunities.length} opportunities)`);
