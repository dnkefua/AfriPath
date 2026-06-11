import { describe, expect, it } from "vitest";
import { DEFAULT_USER_PREFERENCES, scoreOpportunityMatch } from "./matching";
import { Opportunity, UserPreferences } from "./types";

const baseOpportunity: Opportunity = {
  id: "test-opportunity",
  title: "Test Scholarship",
  type: "Scholarship",
  description: "A test record.",
  eligibility: ["Open to African applicants"],
  benefits: [],
  location: "London, United Kingdom",
  deadline: "January 1, 2099",
  rawDeadlineDate: "2099-01-01",
  badge: "Fully Funded",
  stipend: "Fully funded",
  imageUrl: "https://example.com/image.png",
  fieldOfStudy: ["Engineering"],
  region: "United Kingdom",
};

describe("scoreOpportunityMatch", () => {
  it("scores a fully aligned opportunity highly", () => {
    const insight = scoreOpportunityMatch(baseOpportunity, DEFAULT_USER_PREFERENCES);
    expect(insight.score).toBeGreaterThanOrEqual(74);
    expect(insight.label).toMatch(/Excellent Fit|Strong Fit/);
    expect(insight.reasons.length).toBeGreaterThan(0);
  });

  it("scores a misaligned opportunity low and labels it Explore", () => {
    const preferences: UserPreferences = {
      passportCountry: "Kenya",
      studyField: "Medicine",
      destinationRegion: "Canada",
      opportunityGoal: "Volunteer",
      urgency: "Urgent",
    };
    const insight = scoreOpportunityMatch(baseOpportunity, preferences);
    expect(insight.score).toBeLessThan(62);
    expect(insight.label).toBe("Explore");
  });

  it("never returns a score above 98 (heuristic, not a guarantee)", () => {
    const stacked: Opportunity = {
      ...baseOpportunity,
      type: "Job",
      internationalApplicantPolicy: "Visa Sponsorship",
      badge: "Visa Sponsored",
    };
    const preferences: UserPreferences = {
      ...DEFAULT_USER_PREFERENCES,
      opportunityGoal: "Career",
      destinationRegion: "All",
    };
    const insight = scoreOpportunityMatch(stacked, preferences);
    expect(insight.score).toBeLessThanOrEqual(98);
  });

  it("does not apply an artificial floor to weak matches", () => {
    const weak: Opportunity = {
      ...baseOpportunity,
      type: "Conference",
      badge: "Verified",
      fieldOfStudy: ["Arts"],
      region: "Asia",
      location: "Tokyo, Japan",
      rawDeadlineDate: undefined,
    };
    const preferences: UserPreferences = {
      passportCountry: "Ghana",
      studyField: "Medicine",
      destinationRegion: "Canada",
      opportunityGoal: "Volunteer",
      urgency: "Urgent",
    };
    const insight = scoreOpportunityMatch(weak, preferences);
    expect(insight.score).toBeLessThanOrEqual(35);
  });

  it("returns at most three reasons", () => {
    const insight = scoreOpportunityMatch(baseOpportunity, DEFAULT_USER_PREFERENCES);
    expect(insight.reasons.length).toBeLessThanOrEqual(3);
  });
});
