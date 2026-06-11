import { ApplicationRecord, Opportunity, OpportunityCurationLead, UserPreferences, UserProfile } from "./types";
import { APP_URL } from "./config";
import { DEFAULT_USER_PREFERENCES } from "./matching";
import { DEFAULT_USER_PROFILE } from "./sessionData";
import { storage } from "./services/storage";

// Keep APP_VERSION in sync with android/app/build.gradle versionName.
export const APP_VERSION = "1.1.0";
export const DEV_MODE_TAP_TARGET = 7;

export const STUDY_FIELDS = ["Engineering", "Medicine", "Social Sciences", "Information Technology"];
export const DESTINATION_REGIONS = ["All", "United Kingdom", "Canada", "Germany", "USA", "Remote"];
export const PASSPORT_COUNTRIES = ["Nigeria", "Ghana", "Kenya", "Rwanda", "South Africa"];
export const OPPORTUNITY_GOALS: UserPreferences["opportunityGoal"][] = ["Scholarship", "Career", "Research", "Volunteer", "Any"];
export const URGENCY_OPTIONS: UserPreferences["urgency"][] = ["Flexible", "Soon", "Urgent"];

export type AppTab = "home" | "search" | "visahub" | "command" | "saved";

export const APPLICATION_STATUS_FLOW: ApplicationRecord["status"][] = ["Tracked", "Applied", "Reviewing", "Completed"];
export const CURATION_STATUS_FLOW: OpportunityCurationLead["status"][] = ["New", "Researching", "Verified", "Published"];
export const CURATION_TYPE_OPTIONS: Opportunity["type"][] = ["School", "Fellowship", "Job", "Volunteer", "Workshop", "Conference", "Seminar"];

export const AFRIPATH_LOGO_SRC = "/assets/afripath-logo.png";
export const PRIVACY_POLICY_URL = new URL("/privacy.html", APP_URL).toString();
export const SUPPORT_URL = new URL("/support.html", APP_URL).toString();

export const loadUserPreferences = (): UserPreferences => {
  const saved = storage.get("afripath_preferences");
  if (!saved) return DEFAULT_USER_PREFERENCES;

  try {
    return { ...DEFAULT_USER_PREFERENCES, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_USER_PREFERENCES;
  }
};

export const loadUserProfile = (): UserProfile => {
  const saved = storage.get("afripath_profile");
  if (!saved) return DEFAULT_USER_PROFILE;

  try {
    return { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_USER_PROFILE;
  }
};

export const getRecordNextAction = (record: ApplicationRecord) => {
  if (record.status === "Tracked") return "Prepare documents and move to applied";
  if (record.status === "Applied") return "Monitor portal, email, and sponsor replies";
  if (record.status === "Reviewing") return "Prepare interview, visa, or follow-up evidence";
  return "Archive evidence and capture outcome notes";
};

export const getNextApplicationStatus = (status: ApplicationRecord["status"]) => {
  const index = APPLICATION_STATUS_FLOW.indexOf(status);
  return APPLICATION_STATUS_FLOW[Math.min(index + 1, APPLICATION_STATUS_FLOW.length - 1)];
};

export const getNextCurationStatus = (status: OpportunityCurationLead["status"]) => {
  const index = CURATION_STATUS_FLOW.indexOf(status);
  return CURATION_STATUS_FLOW[Math.min(index + 1, CURATION_STATUS_FLOW.length - 1)];
};
