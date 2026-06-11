// Captures Play Store phone screenshots (1080x1920 PNG) from the production
// preview server and verifies every tab renders without console errors.
// Usage: start `npm run preview`, then `node scripts/capture-screenshots.mjs`.
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "playstore-submission", "assets", "screenshots", "phone");
mkdirSync(outDir, { recursive: true });

const BASE_URL = process.env.PREVIEW_URL || "http://localhost:4173/";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-first-run", "--hide-scrollbars"],
});

const errors = [];
try {
  const page = await browser.newPage();
  // 540x960 CSS @2x device pixels => 1080x1920 output (9:16, Play-compliant)
  await page.setViewport({ width: 540, height: 960, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console.error: ${message.text()}`);
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await delay(1500);

  const shoot = async (name) => {
    await page.screenshot({ path: path.join(outDir, name), type: "png" });
    console.log(`captured ${name}`);
  };

  const tap = async (selector) => {
    await page.waitForSelector(selector, { timeout: 10000 });
    await page.click(selector);
    await delay(1400); // lazy chunk load + tab transition
  };

  await shoot("01-home.png");

  await tap("#tab-search");
  // Bookmark the first two results so the Saved tab shows real content.
  const saveButtons = await page.$$("[id^='save-v-']");
  for (const button of saveButtons.slice(0, 2)) {
    await button.click();
    await delay(600);
  }
  await delay(2600); // let the save toast fade before capturing
  await shoot("02-search.png");

  // Open the first opportunity detail from search results
  const detailCard = await page.$("[id^='details-v-']");
  if (detailCard) {
    await detailCard.click();
    await delay(1400);
    await shoot("03-opportunity-detail.png");
    await page.click("#tab-search");
    await delay(900);
  }

  await tap("#tab-visahub");
  await shoot("04-visa-hub.png");

  await tap("#tab-command");
  await shoot("05-command-center.png");

  await tap("#tab-saved");
  await shoot("06-saved.png");
} finally {
  await browser.close();
}

if (errors.length) {
  console.error("\nRuntime errors detected:");
  for (const error of errors) console.error("  " + error);
  process.exit(1);
}
console.log("\nAll tabs rendered with zero console errors.");
