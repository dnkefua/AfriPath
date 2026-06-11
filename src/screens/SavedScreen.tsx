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

export const SavedScreen: React.FC<{ app: AfripathApp }> = ({ app }) => {
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
                  <section>
                    <h2 className="text-xl font-bold font-headline text-[#0b1c30]">My Bookmarks</h2>
                    <p className="text-[#45464d] text-xs mt-0.5">Quick lookup of fully funded opportunities you bookmarked</p>
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
  );
};
