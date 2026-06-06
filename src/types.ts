export interface Benefit {
  label: string;
  value: string;
  iconName: "DollarSign" | "Plane" | "Home" | "Heart" | "Shield" | "BookOpen" | "Briefcase" | "Calendar" | "Award";
}

export interface Opportunity {
  id: string;
  title: string;
  type: "School" | "Workshop" | "Conference" | "Seminar" | "Scholarship" | "Fellowship" | "Job" | "Volunteer";
  description: string;
  eligibility: string[];
  benefits: Benefit[];
  location: string;
  deadline: string;
  rawDeadlineDate?: string; // used for sorting/comparison
  badge: "Fully Funded" | "Visa Sponsored" | "Verified" | "Closing in 4 days" | "Closing Soon" | "Travel Grant Available" | "International Hiring" | "Volunteer Placement";
  stipend: string;
  imageUrl: string;
  logoUrl?: string;
  companyName?: string;
  fieldOfStudy: string[];
  region: string;
  internationalApplicantPolicy?: "Visa Sponsorship" | "Work Permit Required" | "International Applicants Eligible" | "Remote International";
  curationEvidence?: string[];
  volunteerCommitment?: string;
  sourceUrl?: string;
  lastVerifiedAt?: string;
}

export interface UserPreferences {
  passportCountry: string;
  studyField: string;
  destinationRegion: string;
  opportunityGoal: "Scholarship" | "Career" | "Research" | "Volunteer" | "Any";
  urgency: "Flexible" | "Soon" | "Urgent";
}

export interface MatchInsight {
  score: number;
  label: "Excellent Fit" | "Strong Fit" | "Good Fit" | "Explore";
  reasons: string[];
}

export interface ActiveTrack {
  id: string;
  opportunityTitle: string;
  type: string;
  currentPhase: number;
  totalPhases: number;
  phases: string[];
  lastUpdated: string;
}

export interface VisaQuickLink {
  id: string;
  title: string;
  iconName: "Globe" | "Plane" | "Award";
}

export interface DirectoryEntry {
  id: string;
  title: string;
  companyName: string;
  location: string;
  imageUrl: string;
  logoUrl: string;
  isGovernmentApproved: boolean;
  tags: string[]; // e.g. ["VISA SPONSORED", "FULL-TIME"]
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface VisaFreeProgram {
  id: string;
  countryOrRegion: string;
  programName: string;
  officialSiteUrl: string;
  description: string;
  eligibilityDescription: string;
  keyLinkText: string;
}

export interface VisaSponsorshipProgram {
  id: string;
  country: string;
  programName: string;
  officialSiteUrl: string;
  description: string;
  eligibilityDescription: string;
  keyLinkText: string;
}

export interface ApprovedSponsorCompany {
  id: string;
  country: string;
  companyName: string;
  industry: string;
  officialRegistryLink: string;
  description: string;
  approvedStatus: boolean;
  activeRolesCount: number;
}

export interface SponsoredJob {
  id: string;
  title: string;
  companyName: string;
  country: string;
  location: string;
  salary: string;
  industry: string;
  officialGovernmentRegistryLink: string;
  jobBoardUrl: string;
  description: string;
  requirements: string[];
  visaTypeSupported: string;
  sponsorshipStatus: "Government Approved" | "Verified License" | "Direct Sponsorship";
  imageUrl: string;
}

export interface ApplicationRecord {
  id: string;
  sourceId: string;
  title: string;
  category: "Opportunity" | "Sponsored Job" | "Corporate Role" | "Visa Program";
  status: "Tracked" | "Applied" | "Reviewing" | "Completed";
  createdAt: string;
}

export interface ApplicationTask {
  id: string;
  applicationId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  name: string;
  description: string;
  required: boolean;
  ready: boolean;
  category: "Identity" | "Academic" | "Career" | "Financial" | "Visa" | "Statement";
}

export interface ApplicantCredential {
  id: string;
  name: string;
  description: string;
  category: ApplicationDocument["category"];
  ready: boolean;
  importance: "Core" | "Recommended" | "Optional";
}

export interface OpportunityCurationLead {
  id: string;
  title: string;
  type: Opportunity["type"];
  region: string;
  sourceUrl: string;
  notes: string;
  status: "New" | "Researching" | "Verified" | "Published";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  updatedAt: string;
}

export interface BackendSyncSnapshot {
  generatedAt: string;
  dataset: AfriPathDataset;
  applicationRecords: ApplicationRecord[];
  applicationTasks: ApplicationTask[];
  applicationDocuments: ApplicationDocument[];
  applicantCredentials: ApplicantCredential[];
  curationLeads: OpportunityCurationLead[];
  activeTracks: ActiveTrack[];
  savedIds: string[];
  preferences: UserPreferences;
}

export interface BackendSyncResult {
  status: "idle" | "syncing" | "synced" | "failed";
  endpoint: string;
  message: string;
  syncedAt?: string;
}

export interface AfriPathDataset {
  opportunities: Opportunity[];
  directoryEntries: DirectoryEntry[];
  visaFreePrograms: VisaFreeProgram[];
  visaSponsoredPrograms: VisaSponsorshipProgram[];
  approvedSponsorCompanies: ApprovedSponsorCompany[];
  approvedSponsorJobs: SponsoredJob[];
}
