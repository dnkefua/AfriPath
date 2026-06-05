export interface Benefit {
  label: string;
  value: string;
  iconName: "DollarSign" | "Plane" | "Home" | "Heart" | "Shield" | "BookOpen" | "Briefcase" | "Calendar" | "Award";
}

export interface Opportunity {
  id: string;
  title: string;
  type: "School" | "Workshop" | "Conference" | "Seminar" | "Scholarship" | "Fellowship";
  description: string;
  eligibility: string[];
  benefits: Benefit[];
  location: string;
  deadline: string;
  rawDeadlineDate?: string; // used for sorting/comparison
  badge: "Fully Funded" | "Visa Sponsored" | "Verified" | "Closing in 4 days" | "Closing Soon" | "Travel Grant Available";
  stipend: string;
  imageUrl: string;
  logoUrl?: string;
  companyName?: string;
  fieldOfStudy: string[];
  region: string;
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


