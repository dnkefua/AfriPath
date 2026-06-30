import React, { Suspense } from "react";
import {
  Bell,
  Bookmark,
  CheckCircle,
  ClipboardList,
  Globe,
  Home as HomeIcon,
  Plus,
  Search as SearchIcon,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { OpportunityDetailView } from "./components/OpportunityDetailView";
import { APP_URL } from "./config";
import { AFRIPATH_LOGO_SRC, APP_VERSION, PRIVACY_POLICY_URL, SUPPORT_URL } from "./constants";
import { useAfripathApp } from "./state/useAfripathApp";

// Tab screens are lazy so each becomes its own chunk.
const HomeScreen = React.lazy(() => import("./screens/HomeScreen").then((m) => ({ default: m.HomeScreen })));
const SearchScreen = React.lazy(() => import("./screens/SearchScreen").then((m) => ({ default: m.SearchScreen })));
const VisaHubScreen = React.lazy(() => import("./screens/VisaHubScreen").then((m) => ({ default: m.VisaHubScreen })));
const CommandCenterScreen = React.lazy(() => import("./screens/CommandCenterScreen").then((m) => ({ default: m.CommandCenterScreen })));
const SavedScreen = React.lazy(() => import("./screens/SavedScreen").then((m) => ({ default: m.SavedScreen })));

const screenFallback = (
  <div className="py-20 text-center text-xs font-mono text-[#76777d]">Loading...</div>
);

export default function App() {
  const app = useAfripathApp();
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
              <Suspense fallback={screenFallback}>
                {activeTab === "home" && <HomeScreen app={app} />}
                {activeTab === "search" && <SearchScreen app={app} />}
                {activeTab === "visahub" && <VisaHubScreen app={app} />}
                {activeTab === "command" && <CommandCenterScreen app={app} />}
                {activeTab === "saved" && <SavedScreen app={app} />}
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedOpportunity && (
          <section className="mt-8 mb-4 rounded-2xl border border-[#d7e2dd] bg-white/75 px-4 py-3 text-xs text-[#45464d] shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>
                AfriPath is an independent opportunity discovery and readiness tool by NDN ANALYTICS INC.
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
