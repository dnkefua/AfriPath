import React, { useState, useEffect, useMemo, useRef } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import {
  GraduationCap,
  Users,
  Presentation,
  Search,
  SlidersHorizontal,
  Bell,
  Database,
  Download,
  Plus,
  Home as HomeIcon,
  Search as SearchIcon,
  ShieldCheck,
  Bookmark,
  ChevronRight,
  User,
  Sparkles,
  Award,
  CheckCircle,
  X,
  Sliders,
  Heart,
  Globe,
  Briefcase,
  ClipboardList,
  FileCheck,
  FileText,
  FolderOpen,
  UploadCloud
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AfriPathDataset,
  ApplicantCredential,
  ApplicationDocument,
  ApplicationRecord,
  ApplicationTask,
  BackendSyncResult,
  BackendSyncSnapshot,
  OpportunityCurationLead,
  Opportunity,
  ActiveTrack,
  UserProfile,
  SponsoredJob,
  UserPreferences,
} from "./types";
import {
  DEFAULT_USER_PROFILE,
  INITIAL_ACTIVE_TRACKS,
} from "./sessionData";
import { storage } from "./services/storage";
import { OpportunityCard } from "./components/OpportunityCard";
import { ActiveTrackWidget } from "./components/ActiveTrackWidget";
import { OpportunityDetailView } from "./components/OpportunityDetailView";
import { SponsorshipDirectory } from "./components/SponsorshipDirectory";
import { VisaProgressTracker } from "./components/VisaProgressTracker";
import { APP_URL } from "./config";
import { DEFAULT_USER_PREFERENCES, scoreOpportunityMatch } from "./matching";
import { afripathApi } from "./services/afripathApi";
import { backendSync } from "./services/backendSync";

const loadUserPreferences = (): UserPreferences => {
  const saved = storage.get("afripath_preferences");
  if (!saved) return DEFAULT_USER_PREFERENCES;

  try {
    return { ...DEFAULT_USER_PREFERENCES, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_USER_PREFERENCES;
  }
};

const loadUserProfile = (): UserProfile => {
  const saved = storage.get("afripath_profile");
  if (!saved) return DEFAULT_USER_PROFILE;

  try {
    return { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_USER_PROFILE;
  }
};

const APP_VERSION = "1.1.0";
const DEV_MODE_TAP_TARGET = 7;

const STUDY_FIELDS = ["Engineering", "Medicine", "Social Sciences", "Information Technology"];
const DESTINATION_REGIONS = ["All", "United Kingdom", "Canada", "Germany", "USA", "Remote"];
const PASSPORT_COUNTRIES = ["Nigeria", "Ghana", "Kenya", "Rwanda", "South Africa"];
const OPPORTUNITY_GOALS: UserPreferences["opportunityGoal"][] = ["Scholarship", "Career", "Research", "Volunteer", "Any"];
const URGENCY_OPTIONS: UserPreferences["urgency"][] = ["Flexible", "Soon", "Urgent"];
type AppTab = "home" | "search" | "visahub" | "command" | "saved";

const APPLICATION_STATUS_FLOW: ApplicationRecord["status"][] = ["Tracked", "Applied", "Reviewing", "Completed"];
const CURATION_STATUS_FLOW: OpportunityCurationLead["status"][] = ["New", "Researching", "Verified", "Published"];
const CURATION_TYPE_OPTIONS: Opportunity["type"][] = ["School", "Fellowship", "Job", "Volunteer", "Workshop", "Conference", "Seminar"];
const AFRIPATH_LOGO_SRC = "/assets/afripath-logo.png";
const PRIVACY_POLICY_URL = new URL("/privacy.html", APP_URL).toString();
const SUPPORT_URL = new URL("/support.html", APP_URL).toString();

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab ] = useState<AppTab>("home");
  const [lastTab, setLastTab] = useState<AppTab>("home");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // User & Global Session State — single local profile, no accounts
  const [user, setUser] = useState<UserProfile>(loadUserProfile);
  const [profileNameDraft, setProfileNameDraft] = useState(user.name);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [devMode, setDevMode] = useState<boolean>(() => storage.get("afripath_devmode") === "1");
  const [devTapCount, setDevTapCount] = useState(0);
  const [showPreferenceEditor, setShowPreferenceEditor] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(loadUserPreferences);
  const [dataset, setDataset] = useState<AfriPathDataset>({
    opportunities: [],
    directoryEntries: [],
    visaFreePrograms: [],
    visaSponsoredPrograms: [],
    approvedSponsorCompanies: [],
    approvedSponsorJobs: [],
  });
  const [applicationRecords, setApplicationRecords] = useState<ApplicationRecord[]>([]);
  const [applicationTasks, setApplicationTasks] = useState<ApplicationTask[]>([]);
  const [applicationDocuments, setApplicationDocuments] = useState<ApplicationDocument[]>([]);
  const [applicantCredentials, setApplicantCredentials] = useState<ApplicantCredential[]>([]);
  const [curationLeads, setCurationLeads] = useState<OpportunityCurationLead[]>([]);
  const [dataSyncStatus, setDataSyncStatus] = useState<"loading" | "synced" | "offline">("loading");
  const [lastSyncedAt, setLastSyncedAt] = useState<string>("");
  const [backendSyncResult, setBackendSyncResult] = useState<BackendSyncResult>({
    status: "idle",
    endpoint: backendSync.getEndpoint(),
    message: "Ready to push a signed-off snapshot to the configured backend.",
  });

  const {
    opportunities,
    directoryEntries,
    visaFreePrograms,
    visaSponsoredPrograms,
    approvedSponsorCompanies,
    approvedSponsorJobs,
  } = dataset;

  // Persisted bookmarks & custom tracks — both start empty for new users
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = storage.get("afripath_saved");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTracks, setActiveTracks] = useState<ActiveTrack[]>(() => {
    const tracks = storage.get("afripath_tracks");
    return tracks ? JSON.parse(tracks) : INITIAL_ACTIVE_TRACKS;
  });

  // Search & Filters state
  const [searchText, setSearchText] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>(["Engineering"]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "title">("newest");

  // Visa Hub Switcher Filters
  const [selectedType, setSelectedType] = useState<string>("All");
  const [visaHubCategory, setVisaHubCategory] = useState<"free" | "sponsored" | "companies" | "jobs">("jobs");
  const [visaSearchText, setVisaSearchText] = useState("");
  const [visaSelectedCountry, setVisaSelectedCountry] = useState("All");

  // Point Score Calculator State
  const [calcAge, setCalcAge] = useState<string>("25-30");
  const [calcEducation, setCalcEducation] = useState<string>("Master");
  const [calcLanguage, setCalcLanguage] = useState<string>("B2");
  const [calcJobOffer, setCalcJobOffer] = useState<boolean>(true);
  const [calcActiveTab, setCalcActiveTab] = useState<"uk" | "germany">("uk");

  // Passport selection state for visa-free lookup
  const [userPassport, setUserPassport] = useState<string>("Nigeria");

  // Notifications State — derived from real data (saved deadlines), never seeded
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Contextual Modal state for manually inserting new custom tracking
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [newTrackForm, setNewTrackForm] = useState({
    title: "",
    type: "Scholarship",
    stepsCount: 4,
    stepsText: "Review Documents, Submit Form, Visa Booking, Ready"
  });

  const [curationLeadForm, setCurationLeadForm] = useState({
    title: "",
    type: "School" as Opportunity["type"],
    region: "United Kingdom",
    sourceUrl: "",
    notes: "",
    priority: "High" as OpportunityCurationLead["priority"],
  });

  // Success alert overlay status
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Sync to durable storage (localStorage mirrored to native Preferences)
  useEffect(() => {
    storage.set("afripath_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    storage.set("afripath_tracks", JSON.stringify(activeTracks));
  }, [activeTracks]);

  useEffect(() => {
    storage.set("afripath_preferences", JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    storage.set("afripath_profile", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    storage.set("afripath_devmode", devMode ? "1" : "0");
  }, [devMode]);

  // Native Android polish: brand status bar + hardware back button handling
  const backNavStateRef = useRef<{
    closeOverlay: () => boolean;
    hasDetail: boolean;
    clearDetail: () => void;
    isHome: boolean;
    goHome: () => void;
  }>({
    closeOverlay: () => false,
    hasDetail: false,
    clearDetail: () => {},
    isHome: true,
    goHome: () => {},
  });

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    StatusBar.setBackgroundColor({ color: "#131b2e" }).catch(() => {});
    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});

    const listener = CapacitorApp.addListener("backButton", () => {
      const nav = backNavStateRef.current;
      if (nav.closeOverlay()) return;
      if (nav.hasDetail) {
        nav.clearDetail();
        return;
      }
      if (!nav.isHome) {
        nav.goHome();
        return;
      }
      CapacitorApp.minimizeApp();
    });

    return () => {
      listener.then((handle) => handle.remove());
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDataset = async () => {
      setDataSyncStatus("loading");

      try {
        const [nextDataset, records] = await Promise.all([
          afripathApi.getDataset(),
          afripathApi.listApplicationRecords(),
        ]);
        const [tasks, documents, credentials, leads] = await Promise.all([
          afripathApi.listApplicationTasks(),
          afripathApi.listApplicationDocuments(),
          afripathApi.listApplicantCredentials(),
          afripathApi.listCurationLeads(),
        ]);

        if (!isMounted) return;
        setDataset(nextDataset);
        setApplicationRecords(records);
        setApplicationTasks(tasks);
        setApplicationDocuments(documents);
        setApplicantCredentials(credentials);
        setCurationLeads(leads);
        setLastSyncedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        setDataSyncStatus("synced");
      } catch {
        if (!isMounted) return;
        setDataSyncStatus("offline");
      }
    };

    loadDataset();

    return () => {
      isMounted = false;
    };
  }, []);

  // Real notifications: upcoming deadlines on saved opportunities only.
  useEffect(() => {
    if (!dataset.opportunities.length) return;

    const upcoming = dataset.opportunities
      .filter((opportunity) => savedIds.includes(opportunity.id) && opportunity.rawDeadlineDate)
      .map((opportunity) => {
        const target = new Date(`${opportunity.rawDeadlineDate}T00:00:00`);
        const days = Math.ceil((target.getTime() - Date.now()) / 86_400_000);
        return { opportunity, days };
      })
      .filter(({ days }) => days > 0 && days <= 90)
      .sort((a, b) => a.days - b.days)
      .slice(0, 6)
      .map(({ opportunity, days }) =>
        `${opportunity.title} closes in ${days} day${days === 1 ? "" : "s"}.`,
      );

    setNotifications(upcoming);
    // Recompute only when the dataset arrives; saving/unsaving mid-session
    // shouldn't resurrect cleared notifications.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset.opportunities]);

  const matchInsights = useMemo(() => {
    return Object.fromEntries(
      opportunities.map((opp) => [opp.id, scoreOpportunityMatch(opp, preferences)]),
    );
  }, [opportunities, preferences]);

  const topMatchedOpportunities = useMemo(() => {
    return [...opportunities]
      .sort((a, b) => matchInsights[b.id].score - matchInsights[a.id].score)
      .slice(0, 3);
  }, [matchInsights, opportunities]);

  const applicationSummary = useMemo(() => {
    return {
      total: applicationRecords.length,
      tracked: applicationRecords.filter((record) => record.status === "Tracked").length,
      applied: applicationRecords.filter((record) => record.status === "Applied").length,
      reviewing: applicationRecords.filter((record) => record.status === "Reviewing").length,
      completed: applicationRecords.filter((record) => record.status === "Completed").length,
    };
  }, [applicationRecords]);

  const taskSummary = useMemo(() => {
    return {
      total: applicationTasks.length,
      completed: applicationTasks.filter((task) => task.completed).length,
      highPriorityOpen: applicationTasks.filter((task) => task.priority === "High" && !task.completed).length,
    };
  }, [applicationTasks]);

  const catalogSummary = useMemo(() => {
    return {
      sourceVerified: opportunities.filter((opportunity) => opportunity.sourceUrl).length,
      internationalJobs: opportunities.filter((opportunity) => opportunity.type === "Job").length,
      volunteerPlacements: opportunities.filter((opportunity) => opportunity.type === "Volunteer").length,
      fullyFunded: opportunities.filter((opportunity) => opportunity.badge === "Fully Funded").length,
    };
  }, [opportunities]);

  const curationSummary = useMemo(() => {
    const verifiedRecords = opportunities.filter((opportunity) => opportunity.sourceUrl);
    const recordsNeedingSource = opportunities.filter((opportunity) => !opportunity.sourceUrl);
    const staleVerifiedRecords = verifiedRecords.filter((opportunity) => {
      if (!opportunity.lastVerifiedAt) return true;
      const verifiedDate = new Date(opportunity.lastVerifiedAt);
      if (Number.isNaN(verifiedDate.getTime())) return true;

      const daysSinceVerification = (Date.now() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceVerification > 90;
    });

    return {
      sourceCoverage: opportunities.length
        ? Math.round((verifiedRecords.length / opportunities.length) * 100)
        : 0,
      publishedFromDesk: opportunities.filter((opportunity) => opportunity.id.startsWith("published-")).length,
      needsSource: recordsNeedingSource,
      staleVerifiedRecords,
      leadCounts: {
        total: curationLeads.length,
        researching: curationLeads.filter((lead) => lead.status === "Researching").length,
        verified: curationLeads.filter((lead) => lead.status === "Verified").length,
        published: curationLeads.filter((lead) => lead.status === "Published").length,
      },
    };
  }, [curationLeads, opportunities]);

  const documentSummary = useMemo(() => {
    return {
      total: applicationDocuments.length,
      ready: applicationDocuments.filter((document) => document.ready).length,
      requiredOpen: applicationDocuments.filter(
        (document) => document.required && !document.ready,
      ).length,
    };
  }, [applicationDocuments]);

  const applicantReadiness = useMemo(() => {
    const coreCredentials = applicantCredentials.filter((credential) => credential.importance === "Core");
    const readyCoreCredentials = coreCredentials.filter((credential) => credential.ready);
    const readyCredentials = applicantCredentials.filter((credential) => credential.ready);
    const readinessScore = applicantCredentials.length
      ? Math.round((readyCredentials.length / applicantCredentials.length) * 100)
      : 0;
    const coreScore = coreCredentials.length
      ? Math.round((readyCoreCredentials.length / coreCredentials.length) * 100)
      : 0;

    return {
      readinessScore,
      coreScore,
      ready: readyCredentials.length,
      total: applicantCredentials.length,
      coreReady: readyCoreCredentials.length,
      coreTotal: coreCredentials.length,
      missingCore: coreCredentials.filter((credential) => !credential.ready),
    };
  }, [applicantCredentials]);

  const priorityOpportunities = useMemo(() => {
    return opportunities
      .map((opportunity) => {
        const deadlineDate = opportunity.rawDeadlineDate
          ? new Date(opportunity.rawDeadlineDate)
          : undefined;
        const daysUntilDeadline = deadlineDate && !Number.isNaN(deadlineDate.getTime())
          ? Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : 999;
        const isTracked = applicationRecords.some(
          (record) => record.category === "Opportunity" && record.sourceId === opportunity.id,
        );
        const deadlineBoost = daysUntilDeadline > 0 && daysUntilDeadline <= 45
          ? 12
          : daysUntilDeadline > 45 && daysUntilDeadline <= 120
            ? 6
            : 0;
        const sourceBoost = opportunity.sourceUrl ? 10 : 0;
        const globalPathBoost = opportunity.internationalApplicantPolicy ? 8 : 0;
        const savedBoost = savedIds.includes(opportunity.id) ? 5 : 0;
        const trackedPenalty = isTracked ? 18 : 0;
        const readinessPenalty = applicantReadiness.coreScore < 75 ? 8 : 0;

        return {
          opportunity,
          score: Math.max(
            0,
            (matchInsights[opportunity.id]?.score ?? 0) +
              deadlineBoost +
              sourceBoost +
              globalPathBoost +
              savedBoost -
              trackedPenalty -
              readinessPenalty,
          ),
          daysUntilDeadline,
          isTracked,
          blockers: applicantReadiness.missingCore.slice(0, 2).map((credential) => credential.name),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [applicantReadiness.coreScore, applicantReadiness.missingCore, applicationRecords, matchInsights, opportunities, savedIds]);

  const getRecordNextAction = (record: ApplicationRecord) => {
    if (record.status === "Tracked") return "Prepare documents and move to applied";
    if (record.status === "Applied") return "Monitor portal, email, and sponsor replies";
    if (record.status === "Reviewing") return "Prepare interview, visa, or follow-up evidence";
    return "Archive evidence and capture outcome notes";
  };

  const getNextApplicationStatus = (status: ApplicationRecord["status"]) => {
    const index = APPLICATION_STATUS_FLOW.indexOf(status);
    return APPLICATION_STATUS_FLOW[Math.min(index + 1, APPLICATION_STATUS_FLOW.length - 1)];
  };

  const getNextCurationStatus = (status: OpportunityCurationLead["status"]) => {
    const index = CURATION_STATUS_FLOW.indexOf(status);
    return CURATION_STATUS_FLOW[Math.min(index + 1, CURATION_STATUS_FLOW.length - 1)];
  };

  const buildBackendSnapshot = (): BackendSyncSnapshot => ({
    generatedAt: new Date().toISOString(),
    dataset,
    applicationRecords,
    applicationTasks,
    applicationDocuments,
    applicantCredentials,
    curationLeads,
    activeTracks,
    savedIds,
    preferences,
  });

  const handlePushBackendSnapshot = async () => {
    setBackendSyncResult((prev) => ({
      ...prev,
      status: "syncing",
      message: "Pushing AfriPath snapshot to backend...",
    }));

    const result = await backendSync.pushSnapshot(buildBackendSnapshot());
    setBackendSyncResult(result);
    triggerSuccessAlert(result.status === "synced" ? "Backend sync complete." : "Backend sync needs configuration.");
  };

  const handleExportBackendSnapshot = () => {
    const snapshot = buildBackendSnapshot();
    const file = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `afripath-sync-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    triggerSuccessAlert("AfriPath backend snapshot exported.");
  };

  // Handle Bookmarks
  const handleToggleSave = (opportunityId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => {
      const exists = prev.includes(opportunityId);
      const updated = exists
        ? prev.filter((id) => id !== opportunityId)
        : [...prev, opportunityId];
      
      triggerSuccessAlert(
        exists ? "Opportunity removed from Saved list." : "Opportunity added to Saved list! 🎉"
      );
      return updated;
    });
  };

  const triggerSuccessAlert = (message: string) => {
    setSuccessAlert(message);
    setTimeout(() => {
      setSuccessAlert(null);
    }, 2500);
  };

  const recordApplicationActivity = async (
    record: Omit<ApplicationRecord, "id" | "createdAt">,
  ) => {
    const created = await afripathApi.createApplicationRecord(record);
    const [tasks, documents] = await Promise.all([
      afripathApi.listApplicationTasks(),
      afripathApi.listApplicationDocuments(),
    ]);
    setApplicationRecords((prev) => [
      created,
      ...prev.filter(
        (existing) => `${existing.category}:${existing.sourceId}` !== `${created.category}:${created.sourceId}`,
      ),
    ]);
    setApplicationTasks(tasks);
    setApplicationDocuments(documents);
  };

  const handleAdvanceApplicationRecord = async (record: ApplicationRecord) => {
    const nextStatus = getNextApplicationStatus(record.status);
    const updated = await afripathApi.updateApplicationRecordStatus(record.id, nextStatus);
    if (!updated) return;

    setApplicationRecords((prev) =>
      prev.map((existing) => (existing.id === updated.id ? updated : existing)),
    );
    triggerSuccessAlert(`Application moved to ${nextStatus}.`);
  };

  const handleToggleApplicationTask = async (task: ApplicationTask) => {
    const updated = await afripathApi.setApplicationTaskCompleted(task.id, !task.completed);
    if (!updated) return;

    setApplicationTasks((prev) =>
      prev.map((existing) => (existing.id === updated.id ? updated : existing)),
    );
  };

  const handleToggleApplicationDocument = async (document: ApplicationDocument) => {
    const updated = await afripathApi.setApplicationDocumentReady(document.id, !document.ready);
    if (!updated) return;

    setApplicationDocuments((prev) =>
      prev.map((existing) => (existing.id === updated.id ? updated : existing)),
    );
  };

  const handleToggleApplicantCredential = async (credential: ApplicantCredential) => {
    const updated = await afripathApi.setApplicantCredentialReady(credential.id, !credential.ready);
    if (!updated) return;

    setApplicantCredentials((prev) =>
      prev.map((existing) => (existing.id === updated.id ? updated : existing)),
    );
  };

  const handleCreateCurationLead = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!curationLeadForm.title.trim() || !curationLeadForm.sourceUrl.trim()) {
      triggerSuccessAlert("Add a title and official source URL before saving the lead.");
      return;
    }

    const created = await afripathApi.createCurationLead({
      ...curationLeadForm,
      title: curationLeadForm.title.trim(),
      sourceUrl: curationLeadForm.sourceUrl.trim(),
      notes: curationLeadForm.notes.trim() || "Needs source review, eligibility extraction, and funding validation.",
      status: "New",
    });

    setCurationLeads((prev) => [
      created,
      ...prev.filter((lead) => lead.sourceUrl !== created.sourceUrl),
    ]);
    setCurationLeadForm((prev) => ({
      ...prev,
      title: "",
      sourceUrl: "",
      notes: "",
    }));
    triggerSuccessAlert("Research lead added to the curation queue.");
  };

  const handleAdvanceCurationLead = async (lead: OpportunityCurationLead) => {
    const nextStatus = getNextCurationStatus(lead.status);
    const updated = await afripathApi.updateCurationLeadStatus(lead.id, nextStatus);
    if (!updated) return;

    setCurationLeads((prev) =>
      prev.map((existing) => (existing.id === updated.id ? updated : existing)),
    );
    triggerSuccessAlert(`Lead moved to ${nextStatus}.`);
  };

  const handlePublishCurationLead = async (lead: OpportunityCurationLead) => {
    const result = await afripathApi.publishCurationLead(lead.id);
    if (!result.lead || !result.opportunity) return;

    const nextDataset = await afripathApi.getDataset();
    setDataset(nextDataset);
    setCurationLeads((prev) =>
      prev.map((existing) => (existing.id === result.lead?.id ? result.lead : existing)),
    );
    setSelectedType(result.opportunity.type);
    triggerSuccessAlert("Verified lead published into the live catalog.");
  };

  // Stepper milestone advancement helper
  const handleUpdatePhase = (trackId: string, nextPhase: number) => {
    setActiveTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, currentPhase: nextPhase } : t))
    );
    triggerSuccessAlert(`Application progress advanced to Phase ${nextPhase}!`);
  };

  // Adds the opportunity to the user's personal tracker. AfriPath never
  // submits applications — that always happens on the official site.
  const handleTrackOpportunity = (opportunity: Opportunity) => {
    const alreadyTracked = activeTracks.some((t) => t.opportunityTitle === opportunity.title);
    if (!alreadyTracked) {
      const newTrack: ActiveTrack = {
        id: `track-${Date.now()}`,
        opportunityTitle: opportunity.title,
        type: opportunity.type,
        currentPhase: 1,
        totalPhases: 4,
        phases: ["Documents prepared", "Submitted on official site", "Awaiting decision", "Outcome recorded"],
        lastUpdated: "Just now"
      };
      setActiveTracks((prev) => [newTrack, ...prev]);
    }

    setNotifications((prev) => [
      `Now tracking: ${opportunity.title}. Apply on the official site, then update your progress here.`,
      ...prev
    ]);

    recordApplicationActivity({
      sourceId: opportunity.id,
      title: opportunity.title,
      category: "Opportunity",
      status: "Tracked",
    });

    triggerSuccessAlert("Added to your application tracker.");
  };

  // Create manual track
  const handleCreateTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackForm.title) return;

    const stepsArray = newTrackForm.stepsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newTrack: ActiveTrack = {
      id: `custom-${Date.now()}`,
      opportunityTitle: newTrackForm.title,
      type: newTrackForm.type,
      currentPhase: 1,
      totalPhases: stepsArray.length || 4,
      phases: stepsArray.length ? stepsArray : ["Initiated", "Review", "Interview", "Approved"],
      lastUpdated: "Created today"
    };

    setActiveTracks((prev) => [newTrack, ...prev]);
    setShowAddTrackModal(false);
    setNewTrackForm({
      title: "",
      type: "Scholarship",
      stepsCount: 4,
      stepsText: "Review Documents, Submit Form, Visa Booking, Ready"
    });
    
    triggerSuccessAlert("Custom application track successfully created!");
  };

  // Filter & Search Logic
  const filteredOpportunities = opportunities.filter((opp) => {
    // text search matches title, location, type
    const matchesSearch =
      opp.title.toLowerCase().includes(searchText.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchText.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchText.toLowerCase());

    // check fields of study
    const matchesField =
      selectedFields.length === 0 ||
      opp.fieldOfStudy.some((field) => selectedFields.includes(field));

    // check region
    const matchesRegion =
      selectedRegion === "All" ||
      opp.region.toLowerCase().includes(selectedRegion.toLowerCase());

    // check opportunity type
    const matchesType =
      selectedType === "All" ||
      opp.type.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesField && matchesRegion && matchesType;
  });

  // Sorts
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return matchInsights[b.id].score - matchInsights[a.id].score;
  });

  // Toggle filter fields
  const handleToggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  // Dynamic tab routing triggers
  const handleCategoryClick = (categoryType: "School" | "Workshop" | "Conference" | "Seminar" | "Job" | "Volunteer") => {
    setSearchText("");
    setSelectedType(categoryType);
    setSelectedRegion("All");
    setSelectedFields([]);
    setActiveTab("search");
    triggerSuccessAlert(`Showing ${categoryType} opportunities.`);
  };

  const handleVersionTap = () => {
    const next = devTapCount + 1;
    if (next >= DEV_MODE_TAP_TARGET) {
      setDevTapCount(0);
      setDevMode((value) => {
        triggerSuccessAlert(value ? "Developer tools hidden." : "Developer tools enabled.");
        return !value;
      });
      return;
    }
    setDevTapCount(next);
  };

  const handleSaveProfileName = () => {
    const trimmed = profileNameDraft.trim();
    if (!trimmed) return;
    setUser((prev) => ({ ...prev, name: trimmed }));
    setShowProfileMenu(false);
    triggerSuccessAlert("Profile name updated.");
  };

  // Keep the hardware back button handler in sync with the latest UI state.
  backNavStateRef.current = {
    closeOverlay: () => {
      if (showNotifications) {
        setShowNotifications(false);
        return true;
      }
      if (showProfileMenu) {
        setShowProfileMenu(false);
        return true;
      }
      if (showAddTrackModal) {
        setShowAddTrackModal(false);
        return true;
      }
      return false;
    },
    hasDetail: selectedOpportunity !== null,
    clearDetail: () => {
      setSelectedOpportunity(null);
      setActiveTab(lastTab);
    },
    isHome: activeTab === "home",
    goHome: () => setActiveTab("home"),
  };

  return (
    <div className="min-h-screen relative font-sans app-shell text-[#0b1c30] pb-24">
      
      {/* Top Application Bar */}
      <header className="w-full sticky top-0 z-40 app-header backdrop-blur-md border-b flex items-center justify-between px-6 py-3">
        <div 
          onClick={() => {
            setSelectedOpportunity(null);
            setActiveTab("home");
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 border border-white/20 relative shadow-sm">
            <img
              src={AFRIPATH_LOGO_SRC}
              alt="AfriPath logo"
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg font-extrabold text-white leading-none tracking-wider font-mono glow-text">
              AfriPath
            </span>
            <span className="text-[10px] tracking-wider text-[#ffb690] font-bold uppercase leading-none mt-1">
              Global Opportunity Hub
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => {
              setProfileNameDraft(user.name);
              setShowProfileMenu(!showProfileMenu);
            }}
            title="Edit your profile"
            aria-label="Edit your profile"
            className="hidden sm:flex w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:border-[#ffb690]/60 transition-colors items-center justify-center text-[#ffdbca] font-bold text-sm"
          >
            {user.name.trim().charAt(0).toUpperCase() || "A"}
          </button>

          {devMode && (
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              title="Open hosted AfriPath app"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#ffb690]/30 bg-white/10 text-[#ffdbca] hover:bg-white/15 hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-wider"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live</span>
            </a>
          )}

          {/* Notifications Trigger */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="p-2 text-slate-300 rounded-full hover:bg-white/10 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5 text-[#ffb690]" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#fd761a] rounded-full glow-cyan"></span>
            )}
          </button>

          {/* Local Profile Editor */}
          <AnimatePresence>
            {showProfileMenu && (
              <div className="absolute right-0 top-12 bg-[#0b0c16]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 py-3 w-64 z-50">
                <p className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-widest px-4 py-1.5">
                  Your Profile
                </p>
                <div className="px-4 py-2 space-y-2">
                  <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider" htmlFor="profile-name">
                    Display name
                  </label>
                  <input
                    id="profile-name"
                    value={profileNameDraft}
                    onChange={(event) => setProfileNameDraft(event.target.value)}
                    maxLength={40}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400/60"
                  />
                  <button
                    onClick={handleSaveProfileName}
                    className="w-full px-3 py-2 bg-cyan-500 text-black rounded-lg text-xs font-bold hover:bg-cyan-400 transition-colors"
                  >
                    Save
                  </button>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Stored only on this device. AfriPath has no accounts.
                  </p>
                </div>
                <button
                  onClick={handleVersionTap}
                  className="w-full px-4 pt-2 text-left text-[10px] font-mono text-slate-500 border-t border-white/5 select-none"
                >
                  AfriPath v{APP_VERSION}
                  {devMode ? " · dev tools on" : ""}
                </button>
              </div>
            )}
          </AnimatePresence>

          {/* Notifications Dropdown Panel */}
          <AnimatePresence>
            {showNotifications && (
              <div className="absolute right-0 top-12 bg-[#0b0c16]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 p-4 w-72 sm:w-80 z-50">
                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                  <h4 className="text-sm font-bold text-slate-100">Notifications</h4>
                  <button
                    onClick={() => setNotifications([])}
                    className="text-[10px] text-cyan-450 hover:text-cyan-300 font-bold"
                  >
                    Clear All
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No new updates.</p>
                ) : (
                  <div className="space-y-3.5 max-h-60 overflow-y-auto">
                    {notifications.map((notif, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-slate-300 border-b border-white/5 pb-2 last:border-b-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0 glow-cyan" />
                        <p className="leading-tight">{notif}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Canvas View */}
      <main className="px-6 py-4 max-w-7xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          {selectedOpportunity ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <OpportunityDetailView
                opportunity={selectedOpportunity}
                onBack={() => {
                  setSelectedOpportunity(null);
                  setActiveTab(lastTab);
                }}
                isSaved={savedIds.includes(selectedOpportunity.id)}
                isTracked={applicationRecords.some(
                  (record) => record.category === "Opportunity" && record.sourceId === selectedOpportunity.id,
                )}
                onToggleSave={(id) => handleToggleSave(id)}
                onTrack={handleTrackOpportunity}
                relatedOpportunities={opportunities.filter(
                  (opp) => opp.id !== selectedOpportunity.id
                ).slice(0, 2)}
                onSelectRelated={(opp) => setSelectedOpportunity(opp)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* TAB 1: HOME SCREEN (Screen 1) */}
              {activeTab === "home" && (
                <div className="space-y-6">
                  {/* Greeting Block */}
                  <section className="mt-2">
                    <h1 className="text-2xl font-bold font-headline text-[#0b1c30] tracking-tight">
                      Hello, {user.name}
                    </h1>
                    <p className="text-sm text-[#45464d]">
                      Your global journey starts here. {topMatchedOpportunities.length} high-fit matches are ready for review.
                    </p>
                  </section>

                  <section className="glass-panel overflow-hidden rounded-3xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="p-5 sm:p-6 flex flex-col justify-between gap-6">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131b2e] text-white rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                          <img
                            src={AFRIPATH_LOGO_SRC}
                            alt=""
                            className="w-5 h-5 rounded-md object-cover bg-white"
                            aria-hidden="true"
                          />
                          AfriPath
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-2xl sm:text-3xl font-black font-headline text-[#0b1c30] leading-tight">
                            Opportunities, guidance, and global impact in one path.
                          </h2>
                          <p className="text-sm text-[#45464d] leading-relaxed max-w-xl">
                            Curated scholarships, international hiring tracks, volunteer pathways, and visa evidence are organized into one vibrant operating system.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setActiveTab("search")}
                          className="px-4 py-2.5 bg-[#fd761a] text-white hover:bg-[#9d4300] rounded-lg text-xs font-bold flex items-center gap-2 transition-all"
                        >
                          <SearchIcon className="w-4 h-4" />
                          Explore Matches
                        </button>
                        <button
                          onClick={() => setActiveTab("command")}
                          className="px-4 py-2.5 bg-white border border-[#dce9ff] text-[#131b2e] hover:border-[#ffb690] rounded-lg text-xs font-bold flex items-center gap-2 transition-all"
                        >
                          <ClipboardList className="w-4 h-4" />
                          Command Center
                        </button>
                      </div>
                    </div>

                    <div className="relative min-h-[220px] bg-[#131b2e] overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 20% 20%, rgba(253,118,26,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.25), transparent 50%)",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={AFRIPATH_LOGO_SRC}
                          alt=""
                          aria-hidden="true"
                          className="w-32 h-32 rounded-3xl object-cover shadow-2xl border border-white/20"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0b1c30]/80 to-transparent">
                        <div className="flex flex-wrap items-center gap-2">
                          {["Opportunities", "Guidance", "Global Impact"].map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="glass-panel p-5 rounded-3xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ffdbca] text-[#5c2400] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          Personalized Path
                        </div>
                        <h2 className="text-lg font-bold font-headline text-[#0b1c30]">
                          {topMatchedOpportunities[0] ? matchInsights[topMatchedOpportunities[0].id].score : 0}% top relevance score
                        </h2>
                        <p className="text-xs text-[#45464d] max-w-2xl">
                          Tuned for a {preferences.passportCountry} passport, {preferences.studyField} background, {preferences.destinationRegion} destination preference, and {preferences.opportunityGoal.toLowerCase()} goal.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPreferenceEditor((value) => !value)}
                        className="px-4 py-2.5 bg-[#131b2e] text-white hover:bg-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all"
                      >
                        <User className="w-4 h-4" />
                        <span>{showPreferenceEditor ? "Close Profile" : "Tune Profile"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        ["Passport", preferences.passportCountry],
                        ["Field", preferences.studyField],
                        ["Destination", preferences.destinationRegion],
                        ["Goal", preferences.opportunityGoal],
                        ["Timing", preferences.urgency],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-[#eff4ff] border border-[#dce9ff] rounded-2xl p-3">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">{label}</p>
                          <p className="text-sm font-bold text-[#0b1c30] mt-1">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white border border-[#dce9ff] rounded-2xl p-3">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">Data Sync</p>
                        <p className="text-sm font-bold text-[#0b1c30] mt-1">
                          {dataSyncStatus === "loading" ? "Loading" : dataSyncStatus === "offline" ? "Offline" : "Synced"}
                        </p>
                        <p className="text-[10px] text-[#45464d] mt-0.5">{lastSyncedAt || "Preparing records"}</p>
                      </div>
                      <div className="bg-white border border-[#dce9ff] rounded-2xl p-3">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">Opportunities</p>
                        <p className="text-sm font-bold text-[#0b1c30] mt-1">{opportunities.length} records</p>
                        <p className="text-[10px] text-[#45464d] mt-0.5">Backend-ready catalog</p>
                      </div>
                      <div className="bg-white border border-[#dce9ff] rounded-2xl p-3">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">Sponsors</p>
                        <p className="text-sm font-bold text-[#0b1c30] mt-1">{approvedSponsorCompanies.length + approvedSponsorJobs.length} verified</p>
                        <p className="text-[10px] text-[#45464d] mt-0.5">Companies and roles</p>
                      </div>
                      <div className="bg-white border border-[#dce9ff] rounded-2xl p-3">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">Applications</p>
                        <p className="text-sm font-bold text-[#0b1c30] mt-1">{applicationRecords.length} records</p>
                        <p className="text-[10px] text-[#45464d] mt-0.5">Saved locally via API layer</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        ["Source Verified", catalogSummary.sourceVerified, "Official links checked"],
                        ["Fully Funded", catalogSummary.fullyFunded, "Scholarships and grants"],
                        ["Global Jobs", catalogSummary.internationalJobs, "International hiring only"],
                        ["Volunteer", catalogSummary.volunteerPlacements, "Service placements"],
                      ].map(([label, value, helper]) => (
                        <div key={label} className="bg-[#f4fff8] border border-[#cdebd8] rounded-2xl p-3">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803d]">{label}</p>
                          <p className="text-sm font-bold text-[#0b1c30] mt-1">{value} records</p>
                          <p className="text-[10px] text-[#45464d] mt-0.5">{helper}</p>
                        </div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {showPreferenceEditor && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2"
                        >
                          <label className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d]">Passport</span>
                            <select
                              value={preferences.passportCountry}
                              onChange={(e) => setPreferences((prev) => ({ ...prev, passportCountry: e.target.value }))}
                              className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                            >
                              {PASSPORT_COUNTRIES.map((country) => <option key={country}>{country}</option>)}
                            </select>
                          </label>
                          <label className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d]">Field</span>
                            <select
                              value={preferences.studyField}
                              onChange={(e) => setPreferences((prev) => ({ ...prev, studyField: e.target.value }))}
                              className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                            >
                              {STUDY_FIELDS.map((field) => <option key={field}>{field}</option>)}
                            </select>
                          </label>
                          <label className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d]">Destination</span>
                            <select
                              value={preferences.destinationRegion}
                              onChange={(e) => setPreferences((prev) => ({ ...prev, destinationRegion: e.target.value }))}
                              className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                            >
                              {DESTINATION_REGIONS.map((region) => <option key={region}>{region}</option>)}
                            </select>
                          </label>
                          <label className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d]">Goal</span>
                            <select
                              value={preferences.opportunityGoal}
                              onChange={(e) => setPreferences((prev) => ({ ...prev, opportunityGoal: e.target.value as UserPreferences["opportunityGoal"] }))}
                              className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                            >
                              {OPPORTUNITY_GOALS.map((goal) => <option key={goal}>{goal}</option>)}
                            </select>
                          </label>
                          <label className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#45464d]">Timing</span>
                            <select
                              value={preferences.urgency}
                              onChange={(e) => setPreferences((prev) => ({ ...prev, urgency: e.target.value as UserPreferences["urgency"] }))}
                              className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                            >
                              {URGENCY_OPTIONS.map((urgency) => <option key={urgency}>{urgency}</option>)}
                            </select>
                          </label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  {/* High fidelity search banner triggers search redirect */}
                  <section className="glass-panel home-search-panel p-4 rounded-2xl flex items-center gap-3">
                    <Search className="w-5 h-5 text-[#565e74]" />
                    <input
                      type="text"
                      placeholder="Search scholarships, visas, or countries..."
                      className="flex-grow bg-transparent text-sm text-[#0b1c30] focus:outline-none placeholder:text-[#76777d]"
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                        setActiveTab("search");
                      }}
                      onFocus={() => {
                        setActiveTab("search");
                      }}
                    />
                    <button 
                      onClick={() => setActiveTab("search")}
                      className="p-2.5 bg-[#fd761a] text-white hover:bg-[#9d4300] rounded-lg active:scale-95 transition-transform glow-cyan cursor-pointer"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                  </section>

                  {/* Bento Categories grid */}
                  <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                      onClick={() => handleCategoryClick("School")}
                      className="category-card category-card-cyan p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group hover:shadow-[0_20px_36px_rgba(8,145,178,0.26)]"
                    >
                      <div className="category-icon w-10 h-10 rounded-2xl flex items-center justify-center text-white">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#0b1c30] transition-colors uppercase tracking-wider">
                          Schools
                        </span>
                        <span className="text-[10px] text-[#45464d] font-light">With Scholarships</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Workshop")}
                      className="category-card category-card-amber p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group hover:shadow-[0_20px_36px_rgba(194,65,12,0.26)]"
                    >
                      <div className="category-icon w-10 h-10 rounded-2xl flex items-center justify-center text-white">
                        <SlidersHorizontal className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#0b1c30] transition-colors uppercase tracking-wider">
                          Workshops
                        </span>
                        <span className="text-[10px] text-[#45464d] font-light">Direct application</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Job")}
                      className="category-card category-card-job p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group hover:shadow-[0_20px_36px_rgba(19,27,46,0.18)]"
                    >
                      <div className="category-icon w-10 h-10 rounded-2xl flex items-center justify-center text-white">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#0b1c30] transition-colors uppercase tracking-wider">
                          Jobs
                        </span>
                        <span className="text-[10px] text-[#45464d] font-light">International hiring only</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Volunteer")}
                      className="category-card category-card-volunteer p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group hover:shadow-[0_20px_36px_rgba(249,189,34,0.22)]"
                    >
                      <div className="category-icon w-10 h-10 rounded-2xl flex items-center justify-center text-white">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#0b1c30] transition-colors uppercase tracking-wider">
                          Volunteer
                        </span>
                        <span className="text-[10px] text-[#45464d] font-light">Global service tracks</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Conference")}
                      className="category-card category-card-rose p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group hover:shadow-[0_20px_36px_rgba(126,34,206,0.24)]"
                    >
                      <div className="category-icon w-10 h-10 rounded-2xl flex items-center justify-center text-white">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#0b1c30] transition-colors uppercase tracking-wider">
                          Conferences
                        </span>
                        <span className="text-[10px] text-[#45464d] font-light">Global assemblies</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Seminar")}
                      className="category-card category-card-emerald p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group hover:shadow-[0_20px_36px_rgba(21,128,61,0.26)]"
                    >
                      <div className="category-icon w-10 h-10 rounded-2xl flex items-center justify-center text-white">
                        <Presentation className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#0b1c30] transition-colors uppercase tracking-wider">
                          Seminars
                        </span>
                        <span className="text-[10px] text-[#45464d] font-light">Interactive panels</span>
                      </div>
                    </div>
                  </section>

                  {/* Visa Programs and Approved Organizations database Promo Banner */}
                  <section 
                    onClick={() => {
                      setActiveTab("visahub");
                      triggerSuccessAlert("Opening Visa & Sponsorship Programs Platform! 🌍");
                    }}
                    className="glass-panel mobility-banner relative overflow-hidden hover:border-cyan-100 p-5 rounded-3xl cursor-pointer hover:shadow-[0_20px_40px_rgba(6,182,212,0.22)] transition-all group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#131b2e] text-white border border-[#131b2e] font-bold font-mono uppercase rounded-full text-[9px] tracking-wider">
                          <ShieldCheck className="w-3 h-3 text-[#ffb690]" />
                          <span>Mobility Database</span>
                        </div>
                        <h3 className="text-md font-bold text-[#0b1c30] group-hover:text-[#9d4300] transition-colors">
                          Visa-Free Programs & Sponsoring Employers Directory
                        </h3>
                        <p className="text-xs text-[#45464d] leading-relaxed max-w-xl font-light">
                          Browse authentic government pathways, verify regional bilateral visa exemptions, and connect with licensed sponsor companies offering vetted employment.
                        </p>
                      </div>
                      
                      <div className="w-12 h-12 rounded-2xl bg-[#fd761a] border border-[#ffb690] flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <ShieldCheck className="w-6 h-6 text-white fill-white/10 animate-pulse" />
                      </div>
                    </div>
                  </section>

                  {/* Horizontal Opportunity slider stream */}
                  <section className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-[#0b1c30]">For You</h2>
                      <button
                        onClick={() => setActiveTab("search")}
                        className="text-xs font-bold text-[#fd761a] hover:text-orange-400 font-mono tracking-wider"
                      >
                        See all
                      </button>
                    </div>

                    {/* horizontal container */}
                    <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-3 -mx-6 px-6">
                      {topMatchedOpportunities.map((opp) => (
                        <OpportunityCard
                          key={opp.id}
                          opportunity={opp}
                          layout="horizontal"
                          isSaved={savedIds.includes(opp.id)}
                          matchInsight={matchInsights[opp.id]}
                          onToggleSave={handleToggleSave}
                          onClick={() => {
                            setLastTab("home");
                            setSelectedOpportunity(opp);
                          }}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Active track widget stepper */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-bold text-[#0b1c30]">My Application Tracker</h2>
                    <div className="space-y-4">
                      {activeTracks.map((track) => (
                        <ActiveTrackWidget
                          key={track.id}
                          track={track}
                          onUpdatePhase={handleUpdatePhase}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Self-reported visa journey planner */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-100">Visa Journey Planner</h2>
                    <VisaProgressTracker />
                  </section>
                </div>
              )}

              {/* TAB 2: SEARCH SCREEN (Screen 2) */}
              {activeTab === "search" && (
                <div className="space-y-6">
                  {/* Header Search input */}
                  <section className="space-y-2">
                    <h2 className="text-xl font-bold font-headline text-slate-100">Opportunities Directory</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Filter matching records across fields and locations</p>
                  </section>

                  <section className="space-y-4">
                    <div className="relative flex items-center glass-panel border border-white/10 rounded-xl px-4 py-3">
                      <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search scholarships, visa pathways..."
                        className="flex-grow pl-3 text-sm focus:outline-none placeholder:text-slate-500 text-slate-100 bg-transparent"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      {searchText && (
                        <button onClick={() => setSearchText("")} className="text-slate-500 hover:text-slate-300">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Program Type Filter row */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 pt-1 border-b border-white/5">
                      {["All Types", "School", "Job", "Volunteer", "Workshop", "Conference", "Seminar"].map((typeOpt) => {
                        const isSelected = (typeOpt === "All Types" && selectedType === "All") || (selectedType === typeOpt);
                        return (
                          <button
                            key={typeOpt}
                            onClick={() => setSelectedType(typeOpt === "All Types" ? "All" : typeOpt)}
                            className={`flex-shrink-0 px-4.5 py-2 rounded-full border text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-cyan-500 border-cyan-500 text-black glow-cyan font-bold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            <span>{typeOpt === "All Types" ? "All Types" : typeOpt === "School" ? "Schools" : typeOpt === "Job" ? "Curated Jobs" : typeOpt === "Volunteer" ? "Volunteer" : typeOpt === "Workshop" ? "Workshops" : typeOpt === "Conference" ? "Conferences" : "Seminars"}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Filter chips scrollbar */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 pt-1">
                      {["Engineering", "Medicine", "Social Sciences", "Art"].map((field) => {
                        const isSelected = selectedFields.includes(field);
                        return (
                          <button
                            key={field}
                            onClick={() => handleToggleField(field)}
                            className={`flex-shrink-0 flex items-center gap-1 px-4 py-2 rounded-full border text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-cyan-950/80 border-cyan-400 text-cyan-400 font-semibold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            <span>{field}</span>
                            {isSelected && <X className="w-3 h-3 text-cyan-400 ml-0.5" />}
                          </button>
                        );
                      })}

                      {/* Region buttons */}
                      {["United Kingdom", "Germany", "USA", "Remote"].map((reg) => {
                        const isSelected = selectedRegion === reg;
                        return (
                          <button
                            key={reg}
                            onClick={() => setSelectedRegion(isSelected ? "All" : reg)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#fd761a]/90 border-[#fd761a] text-white"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            <span>📍 {reg}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Sort action row indexer */}
                  <section className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5 text-xs font-mono">
                    <span className="text-slate-300 font-bold">
                      {sortedOpportunities.length} opportunities matched
                    </span>
                    <button
                      onClick={() => setSortBy((prev) => (prev === "newest" ? "title" : "newest"))}
                      className="text-orange-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Sort: {sortBy === "newest" ? "Best Match" : "Alpha Title"}
                    </button>
                  </section>

                  {/* Listings block */}
                  <section className="space-y-4">
                    {sortedOpportunities.length === 0 ? (
                      <div className="py-12 bg-white/5 rounded-xl border border-dashed border-white/10 text-center space-y-2">
                        <p className="text-sm font-bold text-slate-500">No matching search metrics.</p>
                        <button
                          onClick={() => {
                            setSearchText("");
                            setSelectedFields(["Engineering"]);
                            setSelectedRegion("All");
                            setSelectedType("All");
                          }}
                          className="text-xs text-[#fd761a] font-bold underline"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sortedOpportunities.map((opp) => (
                          <OpportunityCard
                          key={opp.id}
                          opportunity={opp}
                          layout="vertical"
                          isSaved={savedIds.includes(opp.id)}
                          matchInsight={matchInsights[opp.id]}
                          onToggleSave={handleToggleSave}
                          onClick={() => {
                              setLastTab("search");
                              setSelectedOpportunity(opp);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              )}

                       {/* TAB 3: VISA HUB (Screen 3) */}
              {activeTab === "visahub" && (
                <div className="space-y-8">
                  {/* Title Headers */}
                  <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold font-headline text-slate-100 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-cyan-400" />
                        Visa & Mobility Hub
                      </h1>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-2xl font-light">
                        Verify regional visa-free exemptions, explore government points-based immigration tools, or search certified corporate sponsors sorted by country.
                      </p>
                    </div>
                  </section>

                  {/* Dynamic Category Switcher */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                    <button
                      onClick={() => {
                        setVisaHubCategory("jobs");
                        setVisaSearchText("");
                      }}
                      className={`py-2.5 text-center text-xs font-semibold font-mono tracking-wide rounded-lg transition-all cursor-pointer ${
                        visaHubCategory === "jobs"
                          ? "bg-cyan-550 text-black glow-cyan font-bold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      💼 Sponsoring Jobs
                    </button>
                    <button
                      onClick={() => {
                        setVisaHubCategory("sponsored");
                        setVisaSearchText("");
                      }}
                      className={`py-2.5 text-center text-xs font-semibold font-mono tracking-wide rounded-lg transition-all cursor-pointer ${
                        visaHubCategory === "sponsored"
                          ? "bg-cyan-550 text-black glow-cyan font-bold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      ⚡ Govt Pathways
                    </button>
                    <button
                      onClick={() => {
                        setVisaHubCategory("companies");
                        setVisaSearchText("");
                      }}
                      className={`py-2.5 text-center text-xs font-semibold font-mono tracking-wide rounded-lg transition-all cursor-pointer ${
                        visaHubCategory === "companies"
                          ? "bg-cyan-550 text-black glow-cyan font-bold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      🏢 Corporate Sponsors
                    </button>
                    <button
                      onClick={() => {
                        setVisaHubCategory("free");
                        setVisaSearchText("");
                      }}
                      className={`py-2.5 text-center text-xs font-semibold font-mono tracking-wide rounded-lg transition-all cursor-pointer ${
                        visaHubCategory === "free"
                          ? "bg-cyan-550 text-black glow-cyan font-bold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      🌐 Visa-Free Lists
                    </button>
                  </div>

                  {/* Search and Country Selector row */}
                  <div className="space-y-4 bg-white/5 border border-white/5 p-5 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="relative flex items-center glass-panel border border-white/10 rounded-xl px-3 py-2.5 flex-grow">
                        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <input
                          type="text"
                          placeholder={
                            visaHubCategory === "jobs"
                              ? "Search jobs, certified roles, key skills, healthcare, SRE..."
                              : visaHubCategory === "companies"
                              ? "Search sponsoring companies, technology, healthcare..."
                              : visaHubCategory === "sponsored"
                              ? "Search points-based visa regulations, express pathways..."
                              : "Search exemption rules, regional passport covenants..."
                          }
                          className="flex-grow pl-2.5 text-xs focus:outline-none placeholder:text-slate-500 text-slate-100 bg-transparent animate-pulse-once"
                          value={visaSearchText}
                          onChange={(e) => setVisaSearchText(e.target.value)}
                        />
                        {visaSearchText && (
                          <button onClick={() => setVisaSearchText("")} className="text-slate-500 hover:text-slate-300">
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Quick Country select dropdown */}
                      <div className="flex items-center gap-2">
                        <select
                          value={visaSelectedCountry}
                          onChange={(e) => setVisaSelectedCountry(e.target.value)}
                          className="bg-[#020205] text-xs font-semibold text-slate-200 border border-white/15 px-3 py-2.5 rounded-xl accent-cyan-400 focus:outline-none focus:border-cyan-405/50"
                        >
                          <option value="All">🌎 All Countries</option>
                          <option value="United Kingdom">🇬🇧 United Kingdom</option>
                          <option value="Germany">🇩🇪 Germany</option>
                          <option value="Canada">🇨🇦 Canada</option>
                          <option value="United States">🇺🇸 United States</option>
                          <option value="Nigeria">🇳🇬 Nigeria</option>
                          <option value="Seychelles">🇸🇨 Seychelles</option>
                          <option value="Namibia">🇳🇦 Namibia</option>
                          <option value="Kenya">🇰🇪 Kenya</option>
                        </select>
                      </div>
                    </div>

                    {/* Filter quick pills row */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pt-1.5 border-t border-white/5">
                      {["All", "United Kingdom", "Germany", "Canada", "United States"].map((countryOption) => {
                        const isSelected = visaSelectedCountry === countryOption;
                        return (
                          <button
                            key={countryOption}
                            onClick={() => setVisaSelectedCountry(countryOption)}
                            className={`flex-shrink-0 px-3.5 py-1.5 text-[10px] font-bold tracking-wide rounded-full border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#fd761a] text-white border-[#fd761a]"
                                : "bg-white/5 text-slate-400 border-white/10 hover:text-slate-200"
                            }`}
                          >
                            {countryOption === "All" ? "🌍 Global Registry" : countryOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* RENDER ACTIVE CATEGORIES GRID */}
                  <div className="space-y-4">
                    
                    {/* SPONSORED JOBS */}
                    {visaHubCategory === "jobs" && (() => {
                      const filtered = approvedSponsorJobs.filter(j => {
                        const matchesCountry = visaSelectedCountry === "All" || j.country.toLowerCase() === visaSelectedCountry.toLowerCase();
                        const matchesSearch = j.title.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              j.companyName.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              j.industry.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              j.description.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              j.requirements.some(r => r.toLowerCase().includes(visaSearchText.toLowerCase()));
                        return matchesCountry && matchesSearch;
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="py-12 border border-dashed border-white/10 rounded-2xl bg-white/5 text-center text-xs text-slate-400">
                            No government approved sponsored job openings match current filters.
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse-once">
                          {filtered.map(j => (
                            <div key={j.id} className="glass-panel border border-[#fd761a]/30 p-5 rounded-2xl space-y-4 hover:border-[#fd761a]/60 hover:shadow-[0_0_15px_rgba(253,118,26,0.05)] transition-all flex flex-col justify-between bg-zinc-950/30">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold font-mono tracking-widest text-[#fd761a] bg-[#fd761a]/10 border border-[#fd761a]/20 px-2.5 py-0.5 rounded-full uppercase">
                                      {j.sponsorshipStatus}
                                    </span>
                                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-1.5 leading-snug">
                                      {j.title}
                                    </h3>
                                    <p className="text-[11px] text-zinc-400 font-medium">{j.companyName}</p>
                                  </div>
                                  <span className="text-[10px] bg-sky-950/80 text-sky-400 border border-sky-500/20 px-2.5 py-0.5 rounded-full font-bold flex-shrink-0 self-start">
                                    📍 {j.country}
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono py-1.5 px-2 bg-[#050510]/60 rounded-lg border border-white/5">
                                  <div className="text-slate-400">
                                    <span className="text-zinc-500 block uppercase text-[8px] tracking-wider font-bold">Salary Package:</span>
                                    <span className="text-slate-200 font-semibold">{j.salary}</span>
                                  </div>
                                  <div className="text-slate-400">
                                    <span className="text-zinc-500 block uppercase text-[8px] tracking-wider font-bold">Relocation Visa:</span>
                                    <span className="text-cyan-400 font-semibold">{j.visaTypeSupported}</span>
                                  </div>
                                </div>

                                <p className="text-[11px] text-slate-350 leading-relaxed font-light">{j.description}</p>

                                <div className="space-y-1 pt-1">
                                  <span className="text-[9px] font-bold font-mono text-[#fd761a]/85 uppercase tracking-wider block">Key Requirements:</span>
                                  <ul className="space-y-1">
                                    {j.requirements.map((req, index) => (
                                      <li key={index} className="text-[10px] text-slate-400 flex items-start gap-1 font-light leading-snug">
                                        <span className="text-[#fd761a] font-bold">✓</span>
                                        <span>{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="pt-3.5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <a
                                  href={j.officialGovernmentRegistryLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] text-zinc-400 underline hover:text-[#fd761a] flex items-center gap-1 font-mono tracking-wide"
                                >
                                  📄 Official Govt License Register ↗
                                </a>
                                <div className="flex items-center gap-2">
                                  <a
                                    href={j.jobBoardUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-[#fd761a] text-white hover:opacity-95 text-[10px] font-mono rounded-lg font-bold tracking-wide text-center"
                                  >
                                    Apply on Board 🔗
                                  </a>
                                  <button
                                    onClick={() => {
                                      const alreadyExists = activeTracks.some((t) => t.opportunityTitle.includes(j.title));
                                      if (!alreadyExists) {
                                        const newTrack: ActiveTrack = {
                                          id: `direct-job-${j.id}-${Date.now()}`,
                                          opportunityTitle: `${j.title} (${j.companyName})`,
                                          type: "Visa Sponsor Job",
                                          currentPhase: 1,
                                          totalPhases: 4,
                                          phases: ["Role researched", "Applied on job board", "Interview process", "Outcome recorded"],
                                          lastUpdated: "Just now"
                                        };
                                        setActiveTracks((prev) => [newTrack, ...prev]);
                                      }
                                      recordApplicationActivity({
                                        sourceId: j.id,
                                        title: `${j.title} (${j.companyName})`,
                                        category: "Sponsored Job",
                                        status: "Tracked",
                                      });
                                      triggerSuccessAlert("Added to your tracker. Apply through the official job board link.");
                                    }}
                                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-455 text-black text-[10px] font-mono rounded-lg font-bold tracking-wide"
                                  >
                                    Track Pathway
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {/* COMPANIES */}
                    {visaHubCategory === "companies" && (() => {
                      const filteredEntries = directoryEntries.filter(e => {
                        const matchesCountry = visaSelectedCountry === "All" || e.location.toLowerCase().includes(visaSelectedCountry.toLowerCase());
                        const matchesSearch = e.title.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              e.companyName.toLowerCase().includes(visaSearchText.toLowerCase());
                        return matchesCountry && matchesSearch;
                      });

                      if (filteredEntries.length === 0) {
                        return (
                          <div className="py-12 border border-dashed border-white/10 rounded-2xl bg-white/5 text-center text-xs text-slate-400">
                            No certified sponsoring employers found matching current filter metrics.
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-4">
                          <SponsorshipDirectory
                            entries={filteredEntries}
                            onApplyRole={(companyName, roleTitle) => {
                              const trackTitle = `${roleTitle} (${companyName})`;
                              const alreadyExists = activeTracks.some((t) => t.opportunityTitle === trackTitle);
                              if (!alreadyExists) {
                                const newTrack: ActiveTrack = {
                                  id: `dir-track-${Date.now()}`,
                                  opportunityTitle: trackTitle,
                                  type: "Corporate Sponsorship",
                                  currentPhase: 1,
                                  totalPhases: 4,
                                  phases: ["Role researched", "Applied via employer", "Interview process", "Outcome recorded"],
                                  lastUpdated: "Just now"
                                };
                                setActiveTracks(prev => [newTrack, ...prev]);
                              }
                              recordApplicationActivity({
                                sourceId: trackTitle,
                                title: trackTitle,
                                category: "Corporate Role",
                                status: "Tracked",
                              });
                              triggerSuccessAlert("Role added to your tracker. Apply through the employer's official channel.");
                            }}
                          />
                        </div>
                      );
                    })()}

                    {/* SPONSORED PATHWAYS WITH POINTS SCORE CALCULATOR INTEGRATION */}
                    {visaHubCategory === "sponsored" && (() => {
                      const filtered = visaSponsoredPrograms.filter(p => {
                        const matchesCountry = visaSelectedCountry === "All" || p.country.toLowerCase() === visaSelectedCountry.toLowerCase();
                        const matchesSearch = p.programName.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              p.description.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              p.eligibilityDescription.toLowerCase().includes(visaSearchText.toLowerCase());
                        return matchesCountry && matchesSearch;
                      });

                      // Real-time calculation math
                      let totalPoints = 0;
                      let isPassing = false;
                      let formulaExplanation = "";

                      if (calcActiveTab === "uk") {
                        const offerPoints = calcJobOffer ? 20 : 0;
                        const skillPoints = 20;
                        const langPoints = (calcLanguage === "C1" || calcLanguage === "B2") ? 10 : 0;
                        const eduPoints = calcEducation === "PhD" ? 20 : (calcEducation === "Master" ? 10 : (calcEducation === "Bachelor" ? 10 : 0));
                        const agePoints = (calcAge === "25-30" || calcAge === "under25") ? 20 : 10;
                        
                        totalPoints = offerPoints + skillPoints + langPoints + eduPoints + agePoints;
                        isPassing = totalPoints >= 70;
                        formulaExplanation = `Sponsorship (20) + Professional Skill (20) + English Language (${langPoints}) + ${calcEducation} Degree (${eduPoints}) + Age Salary Relief (${agePoints}) = ${totalPoints} Points (70 pts required)`;
                      } else {
                        const langPoints = (calcLanguage === "C1" || calcLanguage === "B2") ? 1 : 0;
                        const eduPoints = (calcEducation === "PhD" || calcEducation === "Master") ? 4 : (calcEducation === "Bachelor" ? 3 : 0);
                        const agePoints = (calcAge === "under25" || calcAge === "25-30") ? 2 : (calcAge === "31-35" ? 1 : 0);
                        const jobOfferPoints = calcJobOffer ? 1 : 0;
                        
                        totalPoints = langPoints + eduPoints + agePoints + jobOfferPoints + 2; 
                        isPassing = totalPoints >= 6;
                        formulaExplanation = `Academic Qualification (${eduPoints}) + Age Rating (${agePoints}) + Language (${langPoints}) + Pre-placement Job (${jobOfferPoints}) + Base Eligibility (2) = ${totalPoints} Points (6 pts required)`;
                      }

                      return (
                        <div className="space-y-6">
                          {/* Point Assessment Panel Widget */}
                          <div className="glass-panel border border-cyan-500/30 p-5 rounded-3xl bg-[#0b0c16]/80 flex flex-col gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                              <div>
                                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
                                  <Sliders className="w-4 h-4 text-cyan-400" />
                                  POINTS ASSESSMENT SCORECARD
                                </h3>
                                <p className="text-[10px] text-slate-400 font-sans mt-0.5">Test your regulatory points qualification for EU/UK migration routes</p>
                              </div>
                              
                              <div className="flex gap-1.5 self-start sm:self-center">
                                <button
                                  onClick={() => setCalcActiveTab("uk")}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                                    calcActiveTab === "uk"
                                      ? "bg-cyan-500 text-black font-extrabold"
                                      : "bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200"
                                  }`}
                                >
                                  🇬🇧 UK Skilled Worker
                                </button>
                                <button
                                  onClick={() => setCalcActiveTab("germany")}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                                    calcActiveTab === "germany"
                                      ? "bg-[#fd761a] text-white font-extrabold"
                                      : "bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200"
                                  }`}
                                >
                                  🇩🇪 DE Opportunity Card
                                </button>
                              </div>
                            </div>

                            {/* Filters and options */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#030307]/80 p-3 rounded-xl border border-white/5">
                              {/* Age Selector */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide">Age Range</span>
                                <select
                                  value={calcAge}
                                  onChange={(e) => setCalcAge(e.target.value)}
                                  className="w-full bg-[#0d0d18] border border-white/10 px-2 py-1.5 rounded-lg text-[11px] text-slate-200 focus:outline-none"
                                >
                                  <option value="under25">Age &lt; 25</option>
                                  <option value="25-30">Age 25 - 30</option>
                                  <option value="31-35">Age 31 - 35</option>
                                  <option value="35plus">Age 35+</option>
                                </select>
                              </div>

                              {/* Education Selector */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide">Education Level</span>
                                <select
                                  value={calcEducation}
                                  onChange={(e) => setCalcEducation(e.target.value)}
                                  className="w-full bg-[#0d0d18] border border-white/10 px-2 py-1.5 rounded-lg text-[11px] text-slate-200 focus:outline-none"
                                >
                                  <option value="PhD">Doctorate (PhD)</option>
                                  <option value="Master">Master Degree</option>
                                  <option value="Bachelor">Bachelor Degree</option>
                                  <option value="None">No Degree</option>
                                </select>
                              </div>

                              {/* Language Selector */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide">Language (IELTS)</span>
                                <select
                                  value={calcLanguage}
                                  onChange={(e) => setCalcLanguage(e.target.value)}
                                  className="w-full bg-[#0d0d18] border border-white/10 px-2 py-1.5 rounded-lg text-[11px] text-slate-200 focus:outline-none"
                                >
                                  <option value="C1">C1 Fluent (IELTS 7.5+)</option>
                                  <option value="B2">B2 Competent (IELTS 6.5)</option>
                                  <option value="None">No Exam Completed</option>
                                </select>
                              </div>

                              {/* Sponsor Offer Option */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide">Job Invitation</span>
                                <button
                                  type="button"
                                  onClick={() => setCalcJobOffer(!calcJobOffer)}
                                  className={`w-full text-left border px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                                    calcJobOffer
                                      ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-400"
                                      : "bg-[#0d0d18] border-white/10 text-slate-400"
                                  }`}
                                >
                                  {calcJobOffer ? "✓ Confirmed Offer" : "No Active Offer"}
                                </button>
                              </div>
                            </div>

                            {/* Score Display */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-[#05060d]">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-slate-200">Overall Score:</span>
                                  <span className={`text-lg font-mono font-black ${isPassing ? "text-emerald-400" : "text-amber-500 animate-pulse"}`}>
                                    {totalPoints} Points
                                  </span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                                    isPassing 
                                      ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/20" 
                                      : "bg-amber-950/80 text-amber-500 border border-amber-500/10"
                                  }`}>
                                    {isPassing ? "✓ PASSED" : "PENDING CRITERIA"}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-mono italic">{formulaExplanation}</p>
                              </div>

                              <button
                                onClick={() => {
                                  if (isPassing) {
                                    triggerSuccessAlert(`Your points scorecard is eligible! Proceeding to the legal government portal directory.`);
                                  } else {
                                    triggerSuccessAlert(`Tip: Secure a certified sponsor job offer or achieve B2 IELTS to satisfy target thresholds.`);
                                  }
                                }}
                                className={`px-4 py-2 text-xs font-mono font-semibold rounded-xl text-center cursor-pointer transition-all active:scale-95 ${
                                  isPassing
                                    ? "bg-emerald-500 text-black font-black hover:bg-emerald-450 shadow-lg shadow-emerald-500/10"
                                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                                }`}
                              >
                                {isPassing ? "Lock Assessment ↗" : "Improve Score Plan"}
                              </button>
                            </div>
                          </div>

                          {/* Filtered program listings */}
                          {filtered.length === 0 ? (
                            <div className="py-12 border border-dashed border-white/10 rounded-2xl bg-white/5 text-center text-xs text-slate-400">
                              No authentic points-based programs found matching current criteria.
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {filtered.map(p => (
                                <div key={p.id} className="glass-panel border border-[#fd761a]/15 bg-gradient-to-br from-slate-950/90 via-slate-950/45 to-[#fd761a]/5 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-start gap-4">
                                      <div className="space-y-1">
                                        <h3 className="text-base font-bold text-slate-100 group-hover:text-[#fd761a] transition-colors">
                                          {p.programName}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] font-semibold text-orange-400">
                                          <span>Official Host Jurisdiction:</span>
                                          <span className="bg-orange-950/60 border border-orange-500/20 px-2 py-0.5 rounded-full text-[10px] tracking-wide text-orange-450">
                                            📍 {p.country}
                                          </span>
                                        </div>
                                      </div>
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-950/80 text-orange-400 border border-orange-800/30 text-[10px] font-bold font-mono uppercase rounded-full">
                                        Points System
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">{p.description}</p>
                                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                                      <span className="text-[9px] font-bold font-mono text-zinc-400 uppercase tracking-widest block">Primary Prerequisite:</span>
                                      <p className="text-[11px] text-cyan-400 font-medium">{p.eligibilityDescription}</p>
                                    </div>
                                  </div>

                                  <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <span className="text-[10px] text-slate-500 font-mono font-light">Direct government application process</span>
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={p.officialSiteUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-[#fd761a] hover:opacity-95 text-white rounded-xl text-xs font-mono font-bold tracking-wide shadow-md shadow-orange-500/10 text-center"
                                      >
                                        Verify Portal 🌍
                                      </a>
                                      <button
                                        onClick={() => {
                                          const alreadyExists = activeTracks.some((t) => t.opportunityTitle.includes(p.programName));
                                          if (!alreadyExists) {
                                            const newTrack: ActiveTrack = {
                                              id: `direct-${Date.now()}`,
                                              opportunityTitle: `${p.programName}`,
                                              type: "Visa Sponsor",
                                              currentPhase: 1,
                                              totalPhases: 4,
                                              phases: ["Eligibility checked", "Applied on official portal", "Awaiting decision", "Outcome recorded"],
                                              lastUpdated: "Just now"
                                            };
                                            setActiveTracks((prev) => [newTrack, ...prev]);
                                          }
                                          recordApplicationActivity({
                                            sourceId: p.id,
                                            title: p.programName,
                                            category: "Visa Program",
                                            status: "Tracked",
                                          });
                                          triggerSuccessAlert("Program added to your tracker on the home screen.");
                                        }}
                                        className="px-3.5 py-2 bg-white/5 hover:bg-white/15 text-slate-100 rounded-xl text-xs font-mono font-bold text-center border border-white/10"
                                      >
                                        Generate Tracker
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* VISA FREE PROTOCOLS WITH PASSPORT EXEMPTION RADAR */}
                    {visaHubCategory === "free" && (() => {
                      const filtered = visaFreePrograms.filter(p => {
                        const matchesCountry = visaSelectedCountry === "All" || 
                                              p.countryOrRegion.toLowerCase().includes(visaSelectedCountry.toLowerCase());
                        const matchesSearch = p.programName.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              p.description.toLowerCase().includes(visaSearchText.toLowerCase()) ||
                                              p.eligibilityDescription.toLowerCase().includes(visaSearchText.toLowerCase());
                        return matchesCountry && matchesSearch;
                      });

                      return (
                        <div className="space-y-6">
                          {/* Passport Selector Widget */}
                          <div className="glass-panel border border-emerald-500/30 p-5 rounded-3xl bg-[#030805]/95 flex flex-col gap-3 relative overflow-hidden">
                            <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                              <Globe className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs font-bold font-mono tracking-wider text-slate-100">AFRICAN PASSPORT EXEMPTION RADAR</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="space-y-0.5">
                                <span className="text-[10px] text-slate-400 font-sans block">Identify exemption destinations for your specific passport:</span>
                                <div className="flex gap-1.5 pt-1.5 flex-wrap">
                                  {["Nigeria", "Kenya", "Ghana", "Rwanda", "South Africa"].map((pass) => (
                                    <button
                                      key={pass}
                                      onClick={() => setUserPassport(pass)}
                                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                                        userPassport === pass
                                          ? "bg-emerald-500 text-black font-black"
                                          : "bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200"
                                      }`}
                                    >
                                      👑 {pass} Passport
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#020503]/90 p-3.5 rounded-xl border border-white/5 space-y-2">
                              <h4 className="text-[10px] font-black font-mono text-emerald-405 uppercase tracking-widest">
                                ⚡ VISAFREE OR ARRIVAL EXEMPT DESTINATIONS FOR {userPassport.toUpperCase()}:
                              </h4>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {userPassport === "Nigeria" ? (
                                  <>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇬🇭 Ghana</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 90 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇷🇼 Rwanda</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇨 Seychelles</span>
                                      <span className="text-[9px] text-amber-505 font-sans">Arrival Permit • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇰🇪 Kenya</span>
                                      <span className="text-[9px] text-sky-450 font-sans">Online ETA • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇳 Senegal</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • ECOWAS Protocol</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇨🇻 Cape Verde</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • ECOWAS Protocol</span>
                                    </div>
                                  </>
                                ) : userPassport === "Kenya" ? (
                                  <>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇷🇼 Rwanda</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • EAC Reciprocal</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇺🇬 Uganda</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • EAC Reciprocal</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇿🇦 South Africa</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 90 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇬 Singapore</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇲🇾 Malaysia</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇳🇦 Namibia</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Nomad Permit Waiver</span>
                                    </div>
                                  </>
                                ) : userPassport === "Ghana" ? (
                                  <>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇳🇬 Nigeria</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • ECOWAS Protocol</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇿🇦 South Africa</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 90 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇨 Seychelles</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇷🇼 Rwanda</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇬 Singapore</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇬🇪 Georgia</span>
                                      <span className="text-[9px] text-cyan-455 font-sans">Visa on Arrival</span>
                                    </div>
                                  </>
                                ) : userPassport === "Rwanda" ? (
                                  <>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇰🇪 Kenya</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • EAC Protocol</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇺🇬 Uganda</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • EAC Protocol</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇬 Singapore</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇬🇦 Gabon</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇨 Seychelles</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇵🇭 Philippines</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇮🇪 Ireland</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 90 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇧🇷 Brazil</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 90 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇰🇪 Kenya</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇷🇼 Rwanda</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇷🇺 Russia</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 90 Days</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] font-mono">
                                      <span className="text-slate-200 block">🇸🇬 Singapore</span>
                                      <span className="text-[9px] text-emerald-400 font-sans">Exempt • 30 Days</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Filtered agreements list */}
                          {filtered.length === 0 ? (
                            <div className="py-12 border border-dashed border-white/10 rounded-2xl bg-white/5 text-center text-xs text-slate-400">
                              No visa-exempt regional covenants found matching current criteria.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filtered.map(p => (
                                <div key={p.id} className="glass-panel border border-white/10 p-5 rounded-2xl space-y-4 hover:border-emerald-400/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.05)] transition-all flex flex-col justify-between bg-zinc-950/25">
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-start gap-4">
                                      <div className="space-y-0.5">
                                        <h3 className="text-sm font-bold text-slate-100">
                                          {p.programName}
                                        </h3>
                                        <span className="text-[10px] text-cyan-400 font-mono font-semibold">Territory: {p.countryOrRegion}</span>
                                      </div>
                                      <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                                        Visa Exempt
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-350 leading-relaxed font-light">{p.description}</p>
                                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                                      <span className="text-[9px] font-bold font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">Eligibility Guideline:</span>
                                      <p className="text-[11px] text-emerald-450 leading-snug">{p.eligibilityDescription}</p>
                                    </div>
                                  </div>

                                  <div className="pt-3 border-t border-white/5 flex justify-end">
                                    <a
                                      href={p.officialSiteUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-4 py-2 bg-white/5 hover:bg-white/15 text-slate-200 rounded-xl text-xs font-mono font-bold text-center border border-white/10 w-full sm:w-auto"
                                    >
                                      Open Exemption Portal 🔗
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                  </div>
                </div>
              )}



              {/* TAB 4: APPLICATION COMMAND CENTER */}
              {activeTab === "command" && (
                <div className="space-y-6">
                  <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdbca] text-[#5c2400] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                        <ClipboardList className="w-3.5 h-3.5" />
                        Command Center
                      </div>
                      <h2 className="text-2xl font-bold font-headline text-[#0b1c30]">Application Command Center</h2>
                      <p className="text-[#45464d] text-sm mt-1 max-w-2xl">
                        Track every scholarship, curated international job, volunteer placement, sponsor role, and visa pathway from one operating dashboard.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("search")}
                      className="px-4 py-2.5 bg-[#131b2e] text-white hover:bg-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <SearchIcon className="w-4 h-4" />
                      <span>Add Pathway</span>
                    </button>
                  </section>

                  <section className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {[
                      ["Total", applicationSummary.total],
                      ["Tracked", applicationSummary.tracked],
                      ["Applied", applicationSummary.applied],
                      ["Reviewing", applicationSummary.reviewing],
                      ["Tasks Done", `${taskSummary.completed}/${taskSummary.total}`],
                      ["Docs Ready", `${documentSummary.ready}/${documentSummary.total}`],
                    ].map(([label, value]) => (
                      <div key={label} className="glass-panel rounded-2xl p-4">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">{label}</p>
                        <p className="text-2xl font-black text-[#0b1c30] mt-1">{value}</p>
                      </div>
                    ))}
                  </section>

                  <section className="glass-panel rounded-3xl p-5 space-y-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eff4ff] text-[#131b2e] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                          <FolderOpen className="w-3.5 h-3.5" />
                          Applicant Readiness
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1c30]">Reusable Profile Vault</h3>
                        <p className="text-sm text-[#45464d] mt-1 max-w-2xl">
                          Prepare the core documents once, then reuse them across scholarships, curated jobs, volunteer placements, and visa pathways.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 min-w-full sm:min-w-[320px] lg:min-w-[360px]">
                        <div className="rounded-2xl bg-[#f4fff8] border border-[#cdebd8] p-4">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803d]">Readiness</p>
                          <p className="text-2xl font-black text-[#0b1c30] mt-1">{applicantReadiness.readinessScore}%</p>
                          <p className="text-[10px] text-[#45464d] mt-0.5">
                            {applicantReadiness.ready}/{applicantReadiness.total} credentials ready
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[#fff9f5] border border-[#ffdbca] p-4">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9d4300]">Core Pack</p>
                          <p className="text-2xl font-black text-[#0b1c30] mt-1">{applicantReadiness.coreScore}%</p>
                          <p className="text-[10px] text-[#45464d] mt-0.5">
                            {applicantReadiness.coreReady}/{applicantReadiness.coreTotal} core ready
                          </p>
                        </div>
                      </div>
                    </div>

                    {applicantReadiness.missingCore.length > 0 && (
                      <div className="rounded-2xl border border-[#ffdbca] bg-[#fff9f5] px-4 py-3">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9d4300] mb-1">
                          Missing Core Credentials
                        </p>
                        <p className="text-sm text-[#45464d]">
                          {applicantReadiness.missingCore.map((credential) => credential.name).join(", ")}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                      {applicantCredentials.map((credential) => (
                        <label
                          key={credential.id}
                          className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                            credential.ready
                              ? "bg-[#f4fff8] border-[#cdebd8]"
                              : credential.importance === "Core"
                                ? "bg-white border-[#ffdbca] hover:border-[#ffb690]"
                                : "bg-white border-[#dce9ff] hover:border-[#ffb690]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={credential.ready}
                            onChange={() => handleToggleApplicantCredential(credential)}
                            className="mt-1 accent-[#15803d]"
                          />
                          <span className="space-y-1 min-w-0">
                            <span className={`block text-sm font-bold ${credential.ready ? "text-[#15803d]" : "text-[#0b1c30]"}`}>
                              {credential.name}
                            </span>
                            <span className="block text-xs text-[#45464d] leading-relaxed">
                              {credential.description}
                            </span>
                            <span className="flex flex-wrap gap-2 pt-1">
                              <span className="text-[10px] font-mono font-bold text-[#0b1c30] bg-[#eff4ff] rounded-full px-2 py-0.5">
                                {credential.category}
                              </span>
                              <span className={`text-[10px] font-mono font-bold rounded-full px-2 py-0.5 ${
                                credential.importance === "Core"
                                  ? "text-[#5c2400] bg-[#ffdbca]"
                                  : credential.importance === "Recommended"
                                    ? "text-[#15803d] bg-[#f4fff8]"
                                    : "text-[#45464d] bg-[#f3f4f6]"
                              }`}>
                                {credential.importance}
                              </span>
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className="glass-panel rounded-3xl p-5 space-y-5">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdbca] text-[#5c2400] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                          <Award className="w-3.5 h-3.5" />
                          Decision Intelligence
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1c30]">Pathway Priority Board</h3>
                        <p className="text-sm text-[#45464d] mt-1 max-w-2xl">
                          Ranked next actions based on match confidence, source quality, international eligibility, deadline pressure, and applicant readiness.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#eff4ff] border border-[#dce9ff] p-4 min-w-full sm:min-w-[260px] lg:min-w-[300px]">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">Core Readiness Gate</p>
                        <p className="text-2xl font-black text-[#0b1c30] mt-1">{applicantReadiness.coreScore}%</p>
                        <p className="text-[10px] text-[#45464d] mt-0.5">
                          {applicantReadiness.coreScore >= 75 ? "Ready to prioritize submissions" : "Finish core credentials before aggressive applications"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
                      {priorityOpportunities.map(({ opportunity, score, daysUntilDeadline, isTracked, blockers }, index) => (
                        <div key={opportunity.id} className="rounded-2xl border border-[#dce9ff] bg-white p-4 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#131b2e] text-white flex items-center justify-center font-black text-sm">
                              {index + 1}
                            </div>
                            <span className="text-[10px] font-mono font-bold rounded-full bg-[#f4fff8] text-[#15803d] px-2 py-1">
                              {score}% Priority
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0b1c30] line-clamp-2">{opportunity.title}</p>
                            <p className="text-[10px] text-[#45464d] font-mono mt-1">
                              {opportunity.type} / {opportunity.region}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                              <span className="text-[#76777d]">Match</span>
                              <span className="font-bold text-[#0b1c30]">{matchInsights[opportunity.id]?.score ?? 0}%</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                              <span className="text-[#76777d]">Deadline</span>
                              <span className={`font-bold ${daysUntilDeadline <= 45 ? "text-[#9d4300]" : "text-[#0b1c30]"}`}>
                                {daysUntilDeadline === 999
                                  ? "Check source"
                                  : daysUntilDeadline < 0
                                    ? "Past date"
                                    : `${daysUntilDeadline} days`}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {opportunity.sourceUrl && (
                                <span className="text-[10px] font-mono font-bold rounded-full bg-[#f4fff8] text-[#15803d] px-2 py-0.5">
                                  Source
                                </span>
                              )}
                              {opportunity.internationalApplicantPolicy && (
                                <span className="text-[10px] font-mono font-bold rounded-full bg-[#ffdbca] text-[#5c2400] px-2 py-0.5">
                                  Global
                                </span>
                              )}
                              {isTracked && (
                                <span className="text-[10px] font-mono font-bold rounded-full bg-[#eff4ff] text-[#131b2e] px-2 py-0.5">
                                  Tracked
                                </span>
                              )}
                            </div>
                          </div>
                          {blockers.length > 0 && (
                            <p className="text-[11px] text-[#9d4300] leading-relaxed">
                              Missing: {blockers.join(", ")}
                            </p>
                          )}
                          <div className="flex flex-col gap-2 pt-2 border-t border-[#dce9ff]">
                            <button
                              onClick={() => {
                                setLastTab("command");
                                setSelectedOpportunity(opportunity);
                              }}
                              className="px-3 py-2 bg-[#131b2e] text-white hover:bg-black rounded-lg text-xs font-bold"
                            >
                              Review
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => handleToggleSave(opportunity.id)}
                                className="px-3 py-2 bg-white border border-[#dce9ff] text-[#131b2e] hover:border-[#ffb690] rounded-lg text-[11px] font-bold"
                              >
                                {savedIds.includes(opportunity.id) ? "Saved" : "Save"}
                              </button>
                              <button
                                onClick={() =>
                                  recordApplicationActivity({
                                    sourceId: opportunity.id,
                                    title: opportunity.title,
                                    category: "Opportunity",
                                    status: "Tracked",
                                  })
                                }
                                disabled={isTracked}
                                className={`px-3 py-2 rounded-lg text-[11px] font-bold ${
                                  isTracked
                                    ? "bg-[#eff4ff] text-[#76777d] cursor-not-allowed"
                                    : "bg-[#fd761a] text-white hover:bg-[#9d4300]"
                                }`}
                              >
                                {isTracked ? "Tracked" : "Track"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Internal curation + sync tooling — hidden unless dev mode is enabled */}
                  {devMode && (
                  <section className="glass-panel rounded-3xl p-5 space-y-5">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4fff8] text-[#15803d] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Curation Console
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1c30]">Research Verification Desk</h3>
                        <p className="text-sm text-[#45464d] mt-1 max-w-2xl">
                          Capture new opportunities, validate official sources, and keep the catalog ready for backend admin publishing.
                        </p>
                      </div>

                      <div className="min-w-[220px] rounded-2xl bg-[#eff4ff] border border-[#dce9ff] p-4">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">Source Coverage</p>
                            <p className="text-2xl font-black text-[#0b1c30]">{curationSummary.sourceCoverage}%</p>
                          </div>
                          <span className="text-[10px] font-mono text-[#45464d]">
                            {catalogSummary.sourceVerified}/{opportunities.length}
                          </span>
                        </div>
                        <div className="h-2 bg-white rounded-full overflow-hidden mt-3">
                          <div
                            className="h-full bg-[#15803d] rounded-full"
                            style={{ width: `${curationSummary.sourceCoverage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        ["Leads", curationSummary.leadCounts.total, "Research queue"],
                        ["Researching", curationSummary.leadCounts.researching, "In validation"],
                        ["Verified Leads", curationSummary.leadCounts.verified, "Ready to publish"],
                        ["Published", curationSummary.publishedFromDesk, "Live from desk"],
                      ].map(([label, value, helper]) => (
                        <div key={label} className="rounded-2xl border border-[#dce9ff] bg-white p-3">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d]">{label}</p>
                          <p className="text-xl font-black text-[#0b1c30] mt-1">{value}</p>
                          <p className="text-[10px] text-[#45464d] mt-0.5">{helper}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-4">
                      <form
                        onSubmit={handleCreateCurationLead}
                        className="rounded-2xl border border-[#dce9ff] bg-white p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-sm font-bold text-[#0b1c30]">Add Research Lead</h4>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803d]">
                            Admin Intake
                          </span>
                        </div>
                        <input
                          value={curationLeadForm.title}
                          onChange={(event) => setCurationLeadForm((prev) => ({ ...prev, title: event.target.value }))}
                          placeholder="Opportunity title"
                          className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                        />
                        <input
                          value={curationLeadForm.sourceUrl}
                          onChange={(event) => setCurationLeadForm((prev) => ({ ...prev, sourceUrl: event.target.value }))}
                          placeholder="Official source URL"
                          className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <select
                            value={curationLeadForm.type}
                            onChange={(event) => setCurationLeadForm((prev) => ({ ...prev, type: event.target.value as Opportunity["type"] }))}
                            className="rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                          >
                            {CURATION_TYPE_OPTIONS.map((type) => (
                              <option key={type}>{type}</option>
                            ))}
                          </select>
                          <select
                            value={curationLeadForm.region}
                            onChange={(event) => setCurationLeadForm((prev) => ({ ...prev, region: event.target.value }))}
                            className="rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                          >
                            {DESTINATION_REGIONS.filter((region) => region !== "All").map((region) => (
                              <option key={region}>{region}</option>
                            ))}
                          </select>
                          <select
                            value={curationLeadForm.priority}
                            onChange={(event) => setCurationLeadForm((prev) => ({ ...prev, priority: event.target.value as OpportunityCurationLead["priority"] }))}
                            className="rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                          >
                            {["High", "Medium", "Low"].map((priority) => (
                              <option key={priority}>{priority}</option>
                            ))}
                          </select>
                        </div>
                        <textarea
                          value={curationLeadForm.notes}
                          onChange={(event) => setCurationLeadForm((prev) => ({ ...prev, notes: event.target.value }))}
                          placeholder="Curation notes: eligibility, funding evidence, visa signal, source risk..."
                          rows={3}
                          className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-2 text-sm text-[#0b1c30] focus:outline-none focus:border-[#fd761a]"
                        />
                        <button className="w-full px-4 py-2.5 bg-[#131b2e] text-white hover:bg-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all">
                          <Plus className="w-4 h-4" />
                          <span>Save Lead</span>
                        </button>
                      </form>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-[#dce9ff] bg-white p-4 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="text-sm font-bold text-[#0b1c30]">Research Queue</h4>
                            <span className="text-[10px] font-mono text-[#76777d]">
                              {curationLeads.length} leads
                            </span>
                          </div>
                          {curationLeads.length === 0 ? (
                            <p className="text-xs text-[#45464d] leading-relaxed">
                              No draft leads yet. Add opportunities here before turning them into published catalog records.
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                              {curationLeads.map((lead) => (
                                <div key={lead.id} className="rounded-xl border border-[#dce9ff] bg-[#f8f9ff] p-3 space-y-2">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="text-sm font-bold text-[#0b1c30]">{lead.title}</p>
                                      <p className="text-[10px] text-[#45464d] font-mono">
                                        {lead.type} / {lead.region}
                                      </p>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-[#5c2400] bg-[#ffdbca] rounded-full px-2 py-0.5">
                                      {lead.status}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[#45464d] leading-relaxed">{lead.notes}</p>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <a
                                      href={lead.sourceUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#15803d] hover:underline"
                                    >
                                      <Globe className="w-3 h-3" />
                                      Source
                                    </a>
                                    <span className="text-[10px] font-mono text-[#76777d]">
                                      {lead.priority} priority
                                    </span>
                                    <button
                                      onClick={() => {
                                        if (lead.status === "Verified") {
                                          handlePublishCurationLead(lead);
                                          return;
                                        }

                                        handleAdvanceCurationLead(lead);
                                      }}
                                      disabled={lead.status === "Published"}
                                      className={`ml-auto px-3 py-1.5 rounded-lg text-[10px] font-bold ${
                                        lead.status === "Published"
                                          ? "bg-[#eff4ff] text-[#76777d] cursor-not-allowed"
                                          : lead.status === "Verified"
                                            ? "bg-[#15803d] text-white hover:bg-[#0f5d2c]"
                                            : "bg-[#fd761a] text-white hover:bg-[#9d4300]"
                                      }`}
                                    >
                                      {lead.status === "Published"
                                        ? "Published"
                                        : lead.status === "Verified"
                                          ? "Publish to Catalog"
                                          : `Move to ${getNextCurationStatus(lead.status)}`}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="rounded-2xl border border-[#dce9ff] bg-white p-4 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="text-sm font-bold text-[#0b1c30]">Source Gaps</h4>
                            <span className="text-[10px] font-mono text-[#76777d]">
                              {curationSummary.staleVerifiedRecords.length} stale
                            </span>
                          </div>
                          {curationSummary.needsSource.length === 0 ? (
                            <p className="text-xs text-[#45464d] leading-relaxed">
                              Every catalog item has an official source URL. That is the kind of cleanliness we like.
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {curationSummary.needsSource.slice(0, 5).map((opportunity) => (
                                <div key={opportunity.id} className="rounded-xl border border-[#ffdbca] bg-[#fff9f5] p-3">
                                  <p className="text-sm font-bold text-[#0b1c30]">{opportunity.title}</p>
                                  <p className="text-[10px] text-[#45464d] font-mono mt-0.5">
                                    {opportunity.type} / {opportunity.region}
                                  </p>
                                </div>
                              ))}
                              {curationSummary.needsSource.length > 5 && (
                                <p className="text-[10px] font-mono text-[#76777d]">
                                  +{curationSummary.needsSource.length - 5} more records need source links.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#dce9ff] bg-[#f8f9ff] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-[#131b2e] text-white flex items-center justify-center">
                            <Database className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#0b1c30]">Backend Connection</h4>
                            <p className="text-[10px] font-mono text-[#76777d] break-all">{backendSyncResult.endpoint}</p>
                          </div>
                        </div>
                        <p className={`text-xs leading-relaxed ${
                          backendSyncResult.status === "synced"
                            ? "text-[#15803d]"
                            : backendSyncResult.status === "failed"
                              ? "text-[#9d4300]"
                              : "text-[#45464d]"
                        }`}>
                          {backendSyncResult.message}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={handlePushBackendSnapshot}
                          disabled={backendSyncResult.status === "syncing"}
                          className="px-4 py-2.5 bg-[#fd761a] text-white hover:bg-[#9d4300] disabled:bg-[#ffdbca] disabled:text-[#9d4300] rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>{backendSyncResult.status === "syncing" ? "Pushing..." : "Push Snapshot"}</span>
                        </button>
                        <button
                          onClick={handleExportBackendSnapshot}
                          className="px-4 py-2.5 bg-white border border-[#dce9ff] text-[#131b2e] hover:border-[#ffb690] rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export JSON</span>
                        </button>
                      </div>
                    </div>
                  </section>
                  )}

                  {applicationRecords.length === 0 ? (
                    <section className="glass-panel rounded-3xl p-8 text-center space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center mx-auto">
                        <FileCheck className="w-7 h-7 text-[#131b2e]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0b1c30]">No application records yet</h3>
                        <p className="text-sm text-[#45464d] mt-1">
                          Track an opportunity or a sponsored pathway to populate this command center.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => setActiveTab("search")}
                          className="px-4 py-2.5 bg-[#131b2e] text-white rounded-lg text-xs font-bold"
                        >
                          Browse Opportunities
                        </button>
                        <button
                          onClick={() => setActiveTab("visahub")}
                          className="px-4 py-2.5 bg-[#fd761a] text-white rounded-lg text-xs font-bold"
                        >
                          Open Visa Hub
                        </button>
                      </div>
                    </section>
                  ) : (
                    <section className="space-y-3">
                      {applicationRecords.map((record) => (
                        <div key={record.id} className="glass-panel rounded-2xl p-5 space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-1 rounded-full bg-[#131b2e] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                                  {record.category}
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-[#ffdbca] text-[#5c2400] text-[10px] font-mono font-bold uppercase tracking-wider">
                                  {record.status}
                                </span>
                                <span className="text-[10px] text-[#76777d] font-mono">
                                  Created {new Date(record.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-[#0b1c30]">{record.title}</h3>
                              <p className="text-sm text-[#45464d]">{getRecordNextAction(record)}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                              <button
                                onClick={() => handleAdvanceApplicationRecord(record)}
                                disabled={record.status === "Completed"}
                                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                                  record.status === "Completed"
                                    ? "bg-[#eff4ff] text-[#76777d] cursor-not-allowed"
                                    : "bg-[#fd761a] text-white hover:bg-[#9d4300]"
                                }`}
                              >
                                {record.status === "Completed" ? "Completed" : `Move to ${getNextApplicationStatus(record.status)}`}
                              </button>
                              <button
                                onClick={() => setActiveTab(record.category === "Visa Program" || record.category === "Sponsored Job" ? "visahub" : "search")}
                                className="px-4 py-2.5 rounded-lg text-xs font-bold border border-[#dce9ff] bg-white text-[#131b2e] hover:border-[#ffb690]"
                              >
                                Open Source Area
                              </button>
                            </div>
                          </div>

                          <div className="border-t border-[#dce9ff] pt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d] flex items-center gap-1.5">
                                <FileCheck className="w-3.5 h-3.5 text-[#fd761a]" />
                                Deadline Planner
                              </p>
                              <span className="text-[10px] font-mono text-[#45464d]">
                                {applicationTasks.filter((task) => task.applicationId === record.id && task.completed).length}/{applicationTasks.filter((task) => task.applicationId === record.id).length} complete
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {applicationTasks
                                .filter((task) => task.applicationId === record.id)
                                .map((task) => (
                                  <label
                                    key={task.id}
                                    className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                                      task.completed
                                        ? "bg-[#eff4ff] border-[#dce9ff]"
                                        : "bg-white border-[#ffdbca] hover:border-[#ffb690]"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={task.completed}
                                      onChange={() => handleToggleApplicationTask(task)}
                                      className="mt-1 accent-[#fd761a]"
                                    />
                                    <span className="space-y-1">
                                      <span className={`block text-sm font-bold ${task.completed ? "text-[#76777d] line-through" : "text-[#0b1c30]"}`}>
                                        {task.title}
                                      </span>
                                      <span className="block text-xs text-[#45464d] leading-relaxed">
                                        {task.description}
                                      </span>
                                      <span className="flex flex-wrap gap-2 pt-1">
                                        <span className="text-[10px] font-mono font-bold text-[#5c2400] bg-[#ffdbca] rounded-full px-2 py-0.5">
                                          {task.priority}
                                        </span>
                                        <span className="text-[10px] font-mono text-[#76777d]">
                                          Due {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                      </span>
                                    </span>
                                  </label>
                                ))}
                            </div>
                          </div>

                          <div className="border-t border-[#dce9ff] pt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76777d] flex items-center gap-1.5">
                                <FolderOpen className="w-3.5 h-3.5 text-[#fd761a]" />
                                Document Vault
                              </p>
                              <span className="text-[10px] font-mono text-[#45464d]">
                                {applicationDocuments.filter((document) => document.applicationId === record.id && document.ready).length}/{applicationDocuments.filter((document) => document.applicationId === record.id).length} ready
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                              {applicationDocuments
                                .filter((document) => document.applicationId === record.id)
                                .map((document) => (
                                  <label
                                    key={document.id}
                                    className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                                      document.ready
                                        ? "bg-[#f4fff8] border-[#cdebd8]"
                                        : document.required
                                          ? "bg-white border-[#ffdbca] hover:border-[#ffb690]"
                                          : "bg-white border-[#dce9ff] hover:border-[#ffb690]"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={document.ready}
                                      onChange={() => handleToggleApplicationDocument(document)}
                                      className="mt-1 accent-[#15803d]"
                                    />
                                    <span className="space-y-1 min-w-0">
                                      <span className={`block text-sm font-bold ${document.ready ? "text-[#15803d]" : "text-[#0b1c30]"}`}>
                                        {document.name}
                                      </span>
                                      <span className="block text-xs text-[#45464d] leading-relaxed">
                                        {document.description}
                                      </span>
                                      <span className="flex flex-wrap gap-2 pt-1">
                                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#0b1c30] bg-[#eff4ff] rounded-full px-2 py-0.5">
                                          <FileText className="w-3 h-3" />
                                          {document.category}
                                        </span>
                                        <span className={`text-[10px] font-mono font-bold rounded-full px-2 py-0.5 ${
                                          document.required
                                            ? "text-[#5c2400] bg-[#ffdbca]"
                                            : "text-[#45464d] bg-[#f3f4f6]"
                                        }`}>
                                          {document.required ? "Required" : "Optional"}
                                        </span>
                                      </span>
                                    </span>
                                  </label>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </section>
                  )}
                </div>
              )}

              {/* TAB 5: SAVED LIST SCREEN */}
              {activeTab === "saved" && (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-bold font-headline text-slate-100">My Bookmarks</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Quick lookup of fully funded opportunities you bookmarked</p>
                  </section>

                  {opportunities.filter((opp) => savedIds.includes(opp.id)).length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/5 space-y-3">
                      <Bookmark className="w-8 h-8 text-cyan-450 mx-auto" />
                      <p className="text-sm font-bold text-slate-400">Empty Saved Stream</p>
                      <button
                        onClick={() => setActiveTab("search")}
                        className="text-xs text-[#fd761a] hover:underline"
                      >
                        Browse all opportunities
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {opportunities.filter((opp) => savedIds.includes(opp.id)).map((opp) => (
                        <OpportunityCard
                          key={opp.id}
                          opportunity={opp}
                          layout="vertical"
                          isSaved={true}
                          matchInsight={matchInsights[opp.id]}
                          onToggleSave={handleToggleSave}
                          onClick={() => {
                            setLastTab("saved");
                            setSelectedOpportunity(opp);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedOpportunity && (
          <section className="mt-8 mb-4 rounded-2xl border border-[#d7e2dd] bg-white/75 px-4 py-3 text-xs text-[#45464d] shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>
                AfriPath is an independent opportunity discovery and readiness tool by NDN Analytics.
              </p>
              <div className="flex flex-wrap items-center gap-3 font-semibold text-[#0b1c30]">
                <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer" className="hover:text-[#fd761a]">
                  Privacy Policy
                </a>
                <a href={SUPPORT_URL} target="_blank" rel="noreferrer" className="hover:text-[#fd761a]">
                  Support
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Floating Action Button (FAB) on the right */}
      {!selectedOpportunity && activeTab === "home" && (
        <button
          id="fab-add-custom-track"
          onClick={() => setShowAddTrackModal(true)}
          className="fixed right-6 bottom-24 w-14 h-14 bg-[#fd761a] text-white hover:bg-[#9d4300] rounded-2xl shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40 cursor-pointer glow-cyan"
        >
          <Plus className="w-7 h-7" />
        </button>
      )}

      {/* Persistent Bottom Tab Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 app-bottom-nav backdrop-blur-md border-t flex justify-around items-center px-4 pb-4 pt-2.5 shadow-2xl">
        {/* Home */}
        <button
          id="tab-home"
          onClick={() => {
            setSelectedOpportunity(null);
            setLastTab("home");
            setActiveTab("home");
          }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-150 relative cursor-pointer ${
            activeTab === "home" && !selectedOpportunity
              ? "bg-[#131b2e] text-white border border-[#131b2e] font-bold font-mono"
              : "text-[#45464d] hover:text-[#0b1c30]"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] tracking-wide mt-0.5">Home</span>
        </button>

        {/* Search */}
        <button
          id="tab-search"
          onClick={() => {
            setSelectedOpportunity(null);
            setLastTab("search");
            setActiveTab("search");
          }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-150 relative cursor-pointer ${
            activeTab === "search" || (selectedOpportunity && lastTab === "search")
              ? "bg-[#131b2e] text-white border border-[#131b2e] font-bold font-mono"
              : "text-[#45464d] hover:text-[#0b1c30]"
          }`}
        >
          <SearchIcon className="w-5 h-5" />
          <span className="text-[10px] tracking-wide mt-0.5">Search</span>
        </button>



        {/* Visa Hub */}
        <button
          id="tab-visahub"
          onClick={() => {
            setSelectedOpportunity(null);
            setLastTab("visahub");
            setActiveTab("visahub");
          }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-150 relative cursor-pointer ${
            activeTab === "visahub" || (selectedOpportunity && lastTab === "visahub")
              ? "bg-[#131b2e] text-white border border-[#131b2e] font-bold font-mono"
              : "text-[#45464d] hover:text-[#0b1c30]"
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] tracking-wide mt-0.5">Visa Hub</span>
        </button>

        {/* Saved */}
        <button
          id="tab-command"
          onClick={() => {
            setSelectedOpportunity(null);
            setLastTab("command");
            setActiveTab("command");
          }}
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition-all duration-150 relative cursor-pointer ${
            activeTab === "command" || (selectedOpportunity && lastTab === "command")
              ? "bg-[#131b2e] text-white border border-[#131b2e] font-bold font-mono"
              : "text-[#45464d] hover:text-[#0b1c30]"
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] tracking-wide mt-0.5">Command</span>
        </button>

        <button
          id="tab-saved"
          onClick={() => {
            setSelectedOpportunity(null);
            setLastTab("saved");
            setActiveTab("saved");
          }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-150 relative cursor-pointer ${
            activeTab === "saved" || (selectedOpportunity && lastTab === "saved")
              ? "bg-[#131b2e] text-white border border-[#131b2e] font-bold font-mono"
              : "text-[#45464d] hover:text-[#0b1c30]"
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px] tracking-wide mt-0.5">Saved</span>
        </button>
      </nav>

      {/* Floating Success Alert Toast Notifications */}
      <AnimatePresence>
        {successAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 left-6 right-6 sm:left-auto sm:right-6 bg-[#0b0c16] text-white rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-3 border border-cyan-400/40 z-50 text-xs sm:max-w-sm glow-cyan"
          >
            <CheckCircle className="w-5 h-5 text-cyan-450 flex-shrink-0" />
            <div className="flex-grow font-semibold">
              {successAlert}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal to Create custom tracks manually */}
      <AnimatePresence>
        {showAddTrackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddTrackModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-[#0b0c16] border border-white/15 rounded-3xl w-full max-w-md p-6 relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Track Custom Application</h3>
                  <p className="text-xs text-slate-400">Initialize a personalized checklist pipeline</p>
                </div>
                <button
                  onClick={() => setShowAddTrackModal(false)}
                  className="text-xs font-bold text-slate-400 hover:text-white px-2.5 py-1 bg-white/5 rounded-md"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateTrack} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Destination Company / Scholarship Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Erasmus Mundus, Mitacs Fellowship"
                    value={newTrackForm.title}
                    onChange={(e) => setNewTrackForm({ ...newTrackForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Classification Type</label>
                  <select
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-white/10 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    value={newTrackForm.type}
                    onChange={(e) => setNewTrackForm({ ...newTrackForm, type: e.target.value })}
                  >
                    <option value="Scholarship">Scholarship</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Job">Curated International Job</option>
                    <option value="Volunteer">Volunteer Placement</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Visa Sponsor">Direct Visa Sponsorship</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Checkbox Milestones (Comma separated list)</label>
                  <input
                    type="text"
                    required
                    value={newTrackForm.stepsText}
                    onChange={(e) => setNewTrackForm({ ...newTrackForm, stepsText: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan-500 text-black hover:bg-cyan-400 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 shadow-lg shadow-cyan-500/10 mt-4 glow-cyan"
                >
                  Launch Tracking Pipeline
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

