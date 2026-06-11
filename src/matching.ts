import { MatchInsight, Opportunity, UserPreferences } from "./types";

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  passportCountry: "Nigeria",
  studyField: "Engineering",
  destinationRegion: "United Kingdom",
  opportunityGoal: "Scholarship",
  urgency: "Soon",
};

const goalTypeMap: Record<UserPreferences["opportunityGoal"], Opportunity["type"][]> = {
  Scholarship: ["School", "Scholarship", "Fellowship"],
  Career: ["Job", "Workshop", "Seminar", "Conference"],
  Research: ["School", "Conference", "Fellowship", "Seminar", "Volunteer"],
  Volunteer: ["Volunteer"],
  Any: ["School", "Workshop", "Conference", "Seminar", "Scholarship", "Fellowship", "Job", "Volunteer"],
};

const daysUntil = (dateValue?: string) => {
  if (!dateValue) return undefined;
  const target = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(target.getTime())) return undefined;
  return Math.ceil((target.getTime() - Date.now()) / 86_400_000);
};

export const scoreOpportunityMatch = (
  opportunity: Opportunity,
  preferences: UserPreferences,
): MatchInsight => {
  let score = 20;
  const reasons: string[] = [];

  if (opportunity.fieldOfStudy.includes(preferences.studyField)) {
    score += 22;
    reasons.push(`${preferences.studyField} aligned`);
  }

  if (
    preferences.destinationRegion === "All" ||
    opportunity.region.toLowerCase().includes(preferences.destinationRegion.toLowerCase()) ||
    opportunity.location.toLowerCase().includes(preferences.destinationRegion.toLowerCase())
  ) {
    score += 18;
    reasons.push("destination match");
  }

  if (goalTypeMap[preferences.opportunityGoal].includes(opportunity.type)) {
    score += 14;
    reasons.push(`${preferences.opportunityGoal.toLowerCase()} goal fit`);
  }

  if (opportunity.badge === "Fully Funded" || opportunity.badge === "Visa Sponsored") {
    score += 8;
    reasons.push(opportunity.badge.toLowerCase());
  }

  if (opportunity.type === "Job" && opportunity.internationalApplicantPolicy) {
    score += 10;
    reasons.push("international hiring proof");
  }

  if (opportunity.type === "Volunteer" && preferences.opportunityGoal === "Volunteer") {
    score += 12;
    reasons.push("volunteer placement fit");
  }

  const remainingDays = daysUntil(opportunity.rawDeadlineDate);
  if (typeof remainingDays === "number") {
    if (preferences.urgency === "Urgent" && remainingDays <= 120) {
      score += 8;
      reasons.push("near-term deadline");
    } else if (preferences.urgency === "Soon" && remainingDays <= 240) {
      score += 6;
      reasons.push("timely window");
    } else if (preferences.urgency === "Flexible" && remainingDays > 120) {
      score += 5;
      reasons.push("planning runway");
    }
  }

  // Cap below 100 — relevance is a heuristic, never a guarantee. No artificial
  // floor: weak matches should look weak.
  const normalizedScore = Math.min(98, Math.max(0, score));
  const label: MatchInsight["label"] =
    normalizedScore >= 86
      ? "Excellent Fit"
      : normalizedScore >= 74
      ? "Strong Fit"
      : normalizedScore >= 62
      ? "Good Fit"
      : "Explore";

  return {
    score: normalizedScore,
    label,
    reasons: reasons.slice(0, 3),
  };
};
