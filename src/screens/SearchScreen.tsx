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

export const SearchScreen: React.FC<{ app: AfripathApp }> = ({ app }) => {
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
                  {/* Header Search input */}
                  <section className="space-y-2">
                    <h2 className="text-xl font-bold font-headline text-[#0b1c30]">Opportunities Directory</h2>
                    <p className="text-[#45464d] text-xs mt-0.5">Filter matching records across fields and locations</p>
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
  );
};
