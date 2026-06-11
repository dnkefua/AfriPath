import React from "react";
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
  UploadCloud,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  ActiveTrack,
  ApplicantCredential,
  ApplicationDocument,
  ApplicationRecord,
  ApplicationTask,
  Opportunity,
  OpportunityCurationLead,
  SponsoredJob,
  UserPreferences,
} from "../types";
import { OpportunityCard } from "../components/OpportunityCard";
import { ActiveTrackWidget } from "../components/ActiveTrackWidget";
import { SponsorshipDirectory } from "../components/SponsorshipDirectory";
import { VisaProgressTracker } from "../components/VisaProgressTracker";
import { APP_URL } from "../config";
import {
  AFRIPATH_LOGO_SRC,
  CURATION_TYPE_OPTIONS,
  DESTINATION_REGIONS,
  OPPORTUNITY_GOALS,
  PASSPORT_COUNTRIES,
  STUDY_FIELDS,
  URGENCY_OPTIONS,
  getNextApplicationStatus,
  getNextCurationStatus,
  getRecordNextAction,
} from "../constants";
import type { AfripathApp } from "../state/useAfripathApp";

export const HomeScreen: React.FC<{ app: AfripathApp }> = ({ app }) => {
  const {
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
  } = app;

  return (
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
                    <h2 className="text-lg font-bold text-[#0b1c30]">Visa Journey Planner</h2>
                    <VisaProgressTracker />
                  </section>
                </div>
  );
};
