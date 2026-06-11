import React, { useState, useEffect, useMemo, useRef } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
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
  UserPreferences,
} from "../types";
import { INITIAL_ACTIVE_TRACKS } from "../sessionData";
import { storage } from "../services/storage";
import { scoreOpportunityMatch } from "../matching";
import { afripathApi } from "../services/afripathApi";
import { backendSync } from "../services/backendSync";
import {
  AppTab,
  DEV_MODE_TAP_TARGET,
  getNextApplicationStatus,
  getNextCurationStatus,
  loadUserPreferences,
  loadUserProfile,
} from "../constants";

// Single source of truth for AfriPath's client state: every screen receives
// the object returned here via its `app` prop.
export const useAfripathApp = () => {
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

  return {
    activeTab, setActiveTab, lastTab, setLastTab, selectedOpportunity, setSelectedOpportunity, user,
    setUser, profileNameDraft, setProfileNameDraft, showProfileMenu, setShowProfileMenu, devMode,
    setDevMode, devTapCount, setDevTapCount, showPreferenceEditor, setShowPreferenceEditor,
    preferences, setPreferences, dataset, setDataset, applicationRecords, setApplicationRecords,
    applicationTasks, setApplicationTasks, applicationDocuments, setApplicationDocuments,
    applicantCredentials, setApplicantCredentials, curationLeads, setCurationLeads, dataSyncStatus,
    setDataSyncStatus, lastSyncedAt, setLastSyncedAt, backendSyncResult, setBackendSyncResult,
    opportunities, directoryEntries, visaFreePrograms, visaSponsoredPrograms,
    approvedSponsorCompanies, approvedSponsorJobs, savedIds, setSavedIds, activeTracks,
    setActiveTracks, searchText, setSearchText, selectedFields, setSelectedFields, selectedRegion,
    setSelectedRegion, sortBy, setSortBy, selectedType, setSelectedType, visaHubCategory,
    setVisaHubCategory, visaSearchText, setVisaSearchText, visaSelectedCountry,
    setVisaSelectedCountry, calcAge, setCalcAge, calcEducation, setCalcEducation, calcLanguage,
    setCalcLanguage, calcJobOffer, setCalcJobOffer, calcActiveTab, setCalcActiveTab, userPassport,
    setUserPassport, showNotifications, setShowNotifications, notifications, setNotifications,
    showAddTrackModal, setShowAddTrackModal, newTrackForm, setNewTrackForm, curationLeadForm,
    setCurationLeadForm, successAlert, setSuccessAlert, matchInsights, topMatchedOpportunities,
    applicationSummary, taskSummary, catalogSummary, curationSummary, documentSummary,
    applicantReadiness, priorityOpportunities, filteredOpportunities, sortedOpportunities,
    buildBackendSnapshot, handlePushBackendSnapshot, handleExportBackendSnapshot, handleToggleSave,
    triggerSuccessAlert, recordApplicationActivity, handleAdvanceApplicationRecord,
    handleToggleApplicationTask, handleToggleApplicationDocument, handleToggleApplicantCredential,
    handleCreateCurationLead, handleAdvanceCurationLead, handlePublishCurationLead,
    handleUpdatePhase, handleTrackOpportunity, handleCreateTrack, handleToggleField,
    handleCategoryClick, handleVersionTap, handleSaveProfileName,
  };
};

export type AfripathApp = ReturnType<typeof useAfripathApp>;
