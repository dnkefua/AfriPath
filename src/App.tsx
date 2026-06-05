import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Users,
  Presentation,
  Search,
  SlidersHorizontal,
  Bell,
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
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Opportunity, ActiveTrack, UserProfile, SponsoredJob } from "./types";
import {
  OPPORTUNITIES,
  DIRECTORY_ENTRIES,
  INITIAL_ACTIVE_TRACKS,
  USER_PROFILES,
  VISA_FREE_PROGRAMS,
  VISA_SPONSORED_PROGRAMS,
  APPROVED_SPONSOR_COMPANIES,
  APPROVED_SPONSOR_JOBS
} from "./data";
import { OpportunityCard } from "./components/OpportunityCard";
import { ActiveTrackWidget } from "./components/ActiveTrackWidget";
import { OpportunityDetailView } from "./components/OpportunityDetailView";
import { SponsorshipDirectory } from "./components/SponsorshipDirectory";
import { VisaProgressTracker } from "./components/VisaProgressTracker";
import { APP_URL } from "./config";

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab ] = useState<"home" | "search" | "visahub" | "saved">("home");
  const [lastTab, setLastTab] = useState<"home" | "search" | "visahub" | "saved">("home");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // User & Global Session State
  const [currentUserIdx, setCurrentUserIdx] = useState<number>(0);
  const user = USER_PROFILES[currentUserIdx];
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Persisted bookmarks & custom tracks via standard browser client key-value state
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("afripath_saved");
    return saved ? JSON.parse(saved) : ["gates-cambridge-2024", "rhodes-scholarship-2025"];
  });

  const [activeTracks, setActiveTracks] = useState<ActiveTrack[]>(() => {
    const tracks = localStorage.getItem("afripath_tracks");
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

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([
    "Your profile has been matched with 4 new fully funded opportunities today!",
    "UK Skilled Worker sponsorship quota has updated.",
    "Reminder: Gates Cambridge applications open in 2 months.",
    "DAAD progress updated to Phase 2: 'Document Review'"
  ]);

  // Contextual Modal state for manually inserting new custom tracking
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [newTrackForm, setNewTrackForm] = useState({
    title: "",
    type: "Scholarship",
    stepsCount: 4,
    stepsText: "Review Documents, Submit Form, Visa Booking, Ready"
  });

  // Success alert overlay status
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("afripath_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem("afripath_tracks", JSON.stringify(activeTracks));
  }, [activeTracks]);

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

  // Stepper milestone advancement helper
  const handleUpdatePhase = (trackId: string, nextPhase: number) => {
    setActiveTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, currentPhase: nextPhase } : t))
    );
    triggerSuccessAlert(`Application progress advanced to Phase ${nextPhase}!`);
  };

  // Submit profile/CV simulation inside detail overlay
  const handleApplySuccess = (opportunity: Opportunity) => {
    // Add to Active Track list
    const alreadyTracked = activeTracks.some((t) => t.opportunityTitle.includes(opportunity.title));
    if (!alreadyTracked) {
      const newTrack: ActiveTrack = {
        id: `track-${Date.now()}`,
        opportunityTitle: opportunity.title,
        type: opportunity.type,
        currentPhase: 1,
        totalPhases: 4,
        phases: ["Profile Verified", "Document Review", "Biometrics Dispatch", "Visa Issued"],
        lastUpdated: "Just now"
      };
      setActiveTracks((prev) => [newTrack, ...prev]);
    }
    
    // Add notification
    setNotifications((prev) => [
      `Applied successfully to: ${opportunity.title}! Active track initialized.`,
      ...prev
    ]);

    triggerSuccessAlert(`Applications submitted successfully! Checked track generated. 🚀`);
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
  const filteredOpportunities = OPPORTUNITIES.filter((opp) => {
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
    // Newest / Default sorted arbitrarily
    return 1;
  });

  // Toggle filter fields
  const handleToggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  // Dynamic tab routing triggers
  const handleCategoryClick = (categoryType: "School" | "Workshop" | "Conference" | "Seminar") => {
    setSearchText("");
    setSelectedType(categoryType);
    setSelectedRegion("All");
    setSelectedFields([]);
    setActiveTab("search");
    triggerSuccessAlert(`Filtered stream for academic ${categoryType}s! 🎓`);
  };

  return (
    <div className="min-h-screen relative font-sans bg-[#020205] text-[#e2e8f0] pb-24">
      
      {/* Top Application Bar */}
      <header className="w-full sticky top-0 z-40 bg-[#020205]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 py-3">
        <div 
          onClick={() => {
            setSelectedOpportunity(null);
            setActiveTab("home");
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 p-0.5 border border-white/20 relative">
            <img
              src={user.avatarUrl}
              alt="User profile avatar"
              className="w-full h-full object-cover rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu(!showProfileMenu);
              }}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg font-extrabold text-white leading-none tracking-wider font-mono glow-text">
              AfriPath
            </span>
            <span className="text-[10px] tracking-wider text-cyan-400/70 font-bold uppercase leading-none mt-1">
              Global Opportunity Hub
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            title="Open hosted AfriPath app"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-cyan-400/20 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-950/60 hover:text-cyan-200 transition-colors text-[10px] font-mono font-bold uppercase tracking-wider"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live</span>
          </a>

          {/* Notifications Trigger */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-300 rounded-full hover:bg-white/10 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5 text-cyan-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full glow-cyan"></span>
          </button>

          {/* Profile Switcher Menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <div className="absolute right-0 top-12 bg-[#0b0c16]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 py-3 w-52 z-50">
                <p className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-widest px-4 py-1.5">
                  Switch Active User
                </p>
                {USER_PROFILES.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentUserIdx(idx);
                      setShowProfileMenu(false);
                      triggerSuccessAlert(`Switched identity successfully to ${p.name}!`);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2.5 text-xs text-slate-200 border-b border-white/5 last:border-0"
                  >
                    <img 
                      src={p.avatarUrl} 
                      className="w-6 h-6 rounded-full object-cover bg-white/10" 
                      alt={p.name}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-slate-250">{p.name}</p>
                      <p className="text-[10px] text-slate-400 truncate w-32">{p.email}</p>
                    </div>
                  </button>
                ))}
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
                onToggleSave={(id) => handleToggleSave(id)}
                onApplySuccess={handleApplySuccess}
                relatedOpportunities={OPPORTUNITIES.filter(
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
                    <h1 className="text-2xl font-bold font-headline text-white tracking-tight">
                      Hello, {user.name}
                    </h1>
                    <p className="text-sm text-slate-400">
                      Your global journey starts here. 4 new matches for you today.
                    </p>
                  </section>

                  {/* High fidelity search banner triggers search redirect */}
                  <section className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search scholarships, visas, or countries..."
                      className="flex-grow bg-transparent text-sm text-slate-100 focus:outline-none placeholder:text-slate-500"
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
                      className="p-2.5 bg-cyan-500 text-black hover:bg-cyan-400 rounded-xl active:scale-95 transition-transform glow-cyan cursor-pointer"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                  </section>

                  {/* Bento Categories grid */}
                  <section className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => handleCategoryClick("School")}
                      className="glass-panel bg-cyan-950/25 p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group border border-white/5 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-sm">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
                          Schools
                        </span>
                        <span className="text-[10px] text-slate-500 font-light">With Scholarships</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Workshop")}
                      className="glass-panel bg-amber-950/25 p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group border border-white/5 hover:border-amber-400/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-amber-950/80 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-sm">
                        <SlidersHorizontal className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-amber-400 transition-colors uppercase tracking-wider">
                          Workshops
                        </span>
                        <span className="text-[10px] text-slate-500 font-light">Direct application</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Conference")}
                      className="glass-panel bg-rose-950/25 p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group border border-white/5 hover:border-rose-450 hover:shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-450 shadow-sm">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-[#f43f5e] transition-colors uppercase tracking-wider">
                          Conferences
                        </span>
                        <span className="text-[10px] text-slate-500 font-light">Global assemblies</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCategoryClick("Seminar")}
                      className="glass-panel bg-emerald-950/25 p-4 rounded-3xl flex flex-col justify-between h-32 active:scale-98 transition-all cursor-pointer group border border-white/5 hover:border-emerald-400/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-sm">
                        <Presentation className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                          Seminars
                        </span>
                        <span className="text-[10px] text-slate-500 font-light">Interactive panels</span>
                      </div>
                    </div>
                  </section>

                  {/* Visa Programs and Approved Organizations database Promo Banner */}
                  <section 
                    onClick={() => {
                      setActiveTab("visahub");
                      triggerSuccessAlert("Opening Visa & Sponsorship Programs Platform! 🌍");
                    }}
                    className="glass-panel relative overflow-hidden bg-gradient-to-r from-orange-400/5 via-cyan-950/40 to-cyan-500/10 hover:border-cyan-450 p-5 rounded-3xl border border-white/5 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-950/80 text-cyan-400 border border-cyan-800/30 font-bold font-mono uppercase rounded-full text-[9px] tracking-wider">
                          <ShieldCheck className="w-3 h-3 text-cyan-450" />
                          <span>Mobility Database</span>
                        </div>
                        <h3 className="text-md font-bold text-slate-100 group-hover:text-cyan-450 transition-colors">
                          Visa-Free Programs & Sponsoring Employers Directory
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-xl font-light">
                          Browse authentic government pathways, verify regional bilateral visa exemptions, and connect with licensed sponsor companies offering vetted employment.
                        </p>
                      </div>
                      
                      <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <ShieldCheck className="w-6 h-6 text-cyan-450 fill-cyan-400/10 animate-pulse" />
                      </div>
                    </div>
                  </section>

                  {/* Horizontal Opportunity slider stream */}
                  <section className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-slate-100">For You</h2>
                      <button
                        onClick={() => setActiveTab("search")}
                        className="text-xs font-bold text-[#fd761a] hover:text-orange-400 font-mono tracking-wider"
                      >
                        See all
                      </button>
                    </div>

                    {/* horizontal container */}
                    <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-3 -mx-6 px-6">
                      {OPPORTUNITIES.slice(0, 3).map((opp) => (
                        <OpportunityCard
                          key={opp.id}
                          opportunity={opp}
                          layout="horizontal"
                          isSaved={savedIds.includes(opp.id)}
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
                    <h2 className="text-lg font-bold text-slate-100">My Benchmarks</h2>
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

                  {/* Visual Biometrics Queue Tracker (Exposed Integration) */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-100">Live Consulate Biometric Queue</h2>
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
                      {["All Types", "School", "Workshop", "Conference", "Seminar"].map((typeOpt) => {
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
                            <span>{typeOpt === "All Types" ? "🌎 All Types" : typeOpt === "School" ? "🎓 Schools" : typeOpt === "Workshop" ? "🛠️ Workshops" : typeOpt === "Conference" ? "📣 Conferences" : "🎤 Seminars"}</span>
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
                      Sort: {sortBy === "newest" ? "Newest Priority" : "Alpha Title"}
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
                      const filtered = APPROVED_SPONSOR_JOBS.filter(j => {
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
                                          phases: ["Application Lodged", "Pre-selection Interview", "COS Certificate Issued", "Visa Approved & Onboard"],
                                          lastUpdated: "Just now"
                                        };
                                        setActiveTracks((prev) => [newTrack, ...prev]);
                                      }
                                      triggerSuccessAlert(`Pipeline tracker generated and added to 'My Benchmarks' on your home screen!`);
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
                      const filteredEntries = DIRECTORY_ENTRIES.filter(e => {
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
                                  phases: ["CV Received", "Initial Vetting", "Sponsorship Issued", "Visa Cleared"],
                                  lastUpdated: "Just now"
                                };
                                setActiveTracks(prev => [newTrack, ...prev]);
                              }
                              triggerSuccessAlert(`C.V. successfully dispatched! Sponsorship pipeline initiated.`);
                            }}
                          />
                        </div>
                      );
                    })()}

                    {/* SPONSORED PATHWAYS WITH POINTS SCORE CALCULATOR INTEGRATION */}
                    {visaHubCategory === "sponsored" && (() => {
                      const filtered = VISA_SPONSORED_PROGRAMS.filter(p => {
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
                                              phases: ["Pre-evaluation Score", "Formal Application", "Vetting Stage", "Visa Granted"],
                                              lastUpdated: "Just now"
                                            };
                                            setActiveTracks((prev) => [newTrack, ...prev]);
                                          }
                                          triggerSuccessAlert(`Generated custom 4-phase program roadmap under homepage Benchmarks Tracking! 🚀`);
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
                      const filtered = VISA_FREE_PROGRAMS.filter(p => {
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



              {/* TAB 4: SAVED LIST SCREEN */}
              {activeTab === "saved" && (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-bold font-headline text-slate-100">My Bookmarks</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Quick lookup of fully funded opportunities you bookmarked</p>
                  </section>

                  {OPPORTUNITIES.filter((opp) => savedIds.includes(opp.id)).length === 0 ? (
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
                      {OPPORTUNITIES.filter((opp) => savedIds.includes(opp.id)).map((opp) => (
                        <OpportunityCard
                          key={opp.id}
                          opportunity={opp}
                          layout="vertical"
                          isSaved={true}
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
      </main>

      {/* Floating Action Button (FAB) on the right */}
      {!selectedOpportunity && activeTab === "home" && (
        <button
          id="fab-add-custom-track"
          onClick={() => setShowAddTrackModal(true)}
          className="fixed right-6 bottom-24 w-14 h-14 bg-cyan-500 text-black hover:bg-cyan-400 rounded-2xl shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40 cursor-pointer glow-cyan"
        >
          <Plus className="w-7 h-7" />
        </button>
      )}

      {/* Persistent Bottom Tab Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#020205]/95 backdrop-blur-md border-t border-white/10 flex justify-around items-center px-4 pb-4 pt-2.5 shadow-2xl">
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
              ? "bg-cyan-950/80 text-cyan-400 border border-cyan-400/20 font-bold font-mono"
              : "text-slate-400 hover:text-slate-200"
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
              ? "bg-cyan-950/80 text-cyan-400 border border-cyan-400/20 font-bold font-mono"
              : "text-slate-400 hover:text-slate-200"
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
              ? "bg-cyan-950/80 text-cyan-400 border border-cyan-400/20 font-bold font-mono"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] tracking-wide mt-0.5">Visa Hub</span>
        </button>

        {/* Saved */}
        <button
          id="tab-saved"
          onClick={() => {
            setSelectedOpportunity(null);
            setLastTab("saved");
            setActiveTab("saved");
          }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-150 relative cursor-pointer ${
            activeTab === "saved" || (selectedOpportunity && lastTab === "saved")
              ? "bg-cyan-950/80 text-cyan-400 border border-cyan-400/20 font-bold font-mono"
              : "text-slate-400 hover:text-slate-200"
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
