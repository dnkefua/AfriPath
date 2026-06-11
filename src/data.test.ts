import { describe, expect, it } from "vitest";
import {
  OPPORTUNITIES,
  DIRECTORY_ENTRIES,
  VISA_FREE_PROGRAMS,
  VISA_SPONSORED_PROGRAMS,
  APPROVED_SPONSOR_COMPANIES,
  APPROVED_SPONSOR_JOBS,
} from "./data";

describe("catalog data integrity", () => {
  it("has unique opportunity ids", () => {
    const ids = OPPORTUNITIES.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has parseable, non-stale deadline dates", () => {
    const today = new Date();
    for (const opportunity of OPPORTUNITIES) {
      if (!opportunity.rawDeadlineDate) continue;
      const parsed = new Date(`${opportunity.rawDeadlineDate}T00:00:00`);
      expect(parsed.getTime(), `${opportunity.id} has invalid rawDeadlineDate`).not.toBeNaN();
      // Catalog hygiene: flag records whose deadline passed more than 30 days ago.
      const staleCutoff = new Date(today.getTime() - 30 * 86_400_000);
      expect(
        parsed.getTime(),
        `${opportunity.id} deadline ${opportunity.rawDeadlineDate} is stale — refresh or remove it`,
      ).toBeGreaterThan(staleCutoff.getTime());
    }
  });

  it("provides image URLs and required display fields on every opportunity", () => {
    for (const opportunity of OPPORTUNITIES) {
      expect(opportunity.title.trim(), `${opportunity.id} missing title`).not.toBe("");
      expect(opportunity.imageUrl, `${opportunity.id} missing imageUrl`).toMatch(/^https?:\/\//);
      expect(opportunity.location.trim(), `${opportunity.id} missing location`).not.toBe("");
      expect(opportunity.fieldOfStudy.length, `${opportunity.id} missing fieldOfStudy`).toBeGreaterThan(0);
    }
  });

  it("uses https source URLs when present", () => {
    for (const opportunity of OPPORTUNITIES) {
      if (opportunity.sourceUrl) {
        expect(opportunity.sourceUrl, `${opportunity.id} sourceUrl must be https`).toMatch(/^https:\/\//);
      }
    }
  });

  it("has unique ids across the supporting datasets", () => {
    for (const [name, rows] of Object.entries({
      DIRECTORY_ENTRIES,
      VISA_FREE_PROGRAMS,
      VISA_SPONSORED_PROGRAMS,
      APPROVED_SPONSOR_COMPANIES,
      APPROVED_SPONSOR_JOBS,
    })) {
      const ids = (rows as { id: string }[]).map((row) => row.id);
      expect(new Set(ids).size, `${name} has duplicate ids`).toBe(ids.length);
    }
  });

  it("links every sponsor job to an https registry and job board", () => {
    for (const job of APPROVED_SPONSOR_JOBS) {
      expect(job.officialGovernmentRegistryLink, `${job.id} registry link`).toMatch(/^https:\/\//);
      expect(job.jobBoardUrl, `${job.id} job board link`).toMatch(/^https:\/\//);
    }
  });
});
