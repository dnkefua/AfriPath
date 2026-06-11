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

export const CommandCenterScreen: React.FC<{ app: AfripathApp }> = ({ app }) => {
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
  );
};
