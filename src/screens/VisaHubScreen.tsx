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

export const VisaHubScreen: React.FC<{ app: AfripathApp }> = ({ app }) => {
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
                <div className="space-y-8">
                  {/* Title Headers */}
                  <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold font-headline text-[#0b1c30] flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-cyan-600" />
                        Visa & Mobility Hub
                      </h1>
                      <p className="text-[#45464d] text-xs mt-1 leading-relaxed max-w-2xl font-light">
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
  );
};
