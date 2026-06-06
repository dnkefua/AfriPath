import React, { useState } from "react";
import { Opportunity } from "../types";
import {
  MapPin,
  Calendar,
  DollarSign,
  Plane,
  Home,
  Heart,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  CheckCircle,
  Clock,
  Sparkles,
  Award,
  Shield,
  BookOpen,
  Briefcase,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OpportunityDetailViewProps {
  opportunity: Opportunity;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onApplySuccess: (opportunity: Opportunity) => void;
  relatedOpportunities: Opportunity[];
  onSelectRelated: (opportunity: Opportunity) => void;
}

export const OpportunityDetailView: React.FC<OpportunityDetailViewProps> = ({
  opportunity,
  onBack,
  isSaved,
  onToggleSave,
  onApplySuccess,
  relatedOpportunities,
  onSelectRelated,
}) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Amara Cole",
    email: "loveline082022@gmail.com",
    phone: "+234 812 345 6789",
    coverLetter: "I am deeply passionate about global development and hope to contribute to leadership networks across West Africa upon completing my education.",
    agreeToTerms: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      onApplySuccess(opportunity);
      setShowApplyForm(false);
      setFormSubmitted(false);
    }, 1800);
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "DollarSign":
        return <DollarSign className="w-5 h-5 text-cyan-400" />;
      case "Plane":
        return <Plane className="w-5 h-5 text-cyan-400" />;
      case "Home":
        return <Home className="w-5 h-5 text-cyan-400" />;
      case "Heart":
        return <Heart className="w-5 h-5 text-cyan-400" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-cyan-400" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-cyan-400" />;
      default:
        return <Award className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* Detail Header / Nav Bar back button overlay */}
      <div className="sticky top-0 z-30 bg-[#020205]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-200 hover:text-cyan-400 font-bold text-xs font-mono uppercase tracking-widest cursor-pointer py-1.5 pr-3 rounded-lg hover:bg-white/5 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Exit Panel</span>
        </button>
        <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase hidden sm:inline">
          {opportunity.type} DIRECTORY MODULE
        </span>
        <div className="w-8 h-8 rounded-full bg-cyan-500/20 p-0.5 border border-cyan-400/30 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWaYY3_IX4OlPDThIHTapwGKIfS03q47Cwzu-3GNms1c0a3OtxJpHPY_vGoD0pPs8eQst2WeMlcBP72GsvNSsNRP00MgRe14HRBZKoVeAdZAbD7gNCIxSSj3dOTv0PH2QxwYG8Gyy9J0wt2dradPWW0VHhy7wfCKBJuGWvkiQLP8EOlZLl0rN9oL6XbN9dCNauhKj_yvLymxqibSQABhPS48qzHo08zBl9JdQ85RDawv5SyMXLTKWZ1j41pEDI-oOHB1h2vciTV1oL"
            alt="Profile Avatar"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-white/10 group">
            <img
              src={opportunity.imageUrl}
              alt={opportunity.title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-cyan-950/90 text-cyan-400 border border-cyan-400/30 font-bold text-[10px] uppercase font-mono px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                VERIFIED SIGNAL
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-mono">
              Visa Sponsored
            </span>
            <span className="bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono">
              Fully Funded
            </span>
            <span className="bg-amber-950/60 border border-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>CLOSING TRACK</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
            {opportunity.title}
          </h1>

          <p className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>{opportunity.location}</span>
          </p>
        </section>

        {/* Bento Board Details */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left / Middle: Descriptions and Criteria */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <h3 className="text-xs font-mono tracking-widest font-semibold uppercase text-slate-400 mb-3 pb-2 border-b border-white/5">
                About the Opportunity
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-light">
                {opportunity.description}
              </p>
            </div>

            {(opportunity.internationalApplicantPolicy || opportunity.curationEvidence?.length || opportunity.volunteerCommitment) && (
              <div className="glass-panel p-6 rounded-2xl border border-[#ffb690]/40 relative overflow-hidden">
                <h3 className="text-xs font-mono tracking-widest font-semibold uppercase text-[#9d4300] mb-3 pb-2 border-b border-[#dce9ff]">
                  {opportunity.type === "Job" ? "International Hiring Evidence" : "Placement Curation Notes"}
                </h3>
                <div className="space-y-3 text-sm">
                  {opportunity.internationalApplicantPolicy && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#ffdbca] px-3 py-1 text-xs font-bold text-[#5c2400]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{opportunity.internationalApplicantPolicy}</span>
                    </div>
                  )}
                  {opportunity.volunteerCommitment && (
                    <p className="text-[#45464d]">
                      Commitment: <span className="font-semibold text-[#0b1c30]">{opportunity.volunteerCommitment}</span>
                    </p>
                  )}
                  {opportunity.curationEvidence?.length && (
                    <ul className="space-y-2">
                      {opportunity.curationEvidence.map((evidence, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#45464d]">
                          <CheckCircle className="w-4 h-4 text-[#fd761a] flex-shrink-0 mt-0.5" />
                          <span>{evidence}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-xs font-mono tracking-widest font-semibold uppercase text-slate-400 mb-4 pb-2 border-b border-white/5">
                Eligibility Criteria
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-300">
                {opportunity.eligibility.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="font-light">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Benefits & Timeline */}
          <div className="space-y-6">
            <div className="bg-indigo-950/20 border border-indigo-500/20 p-6 rounded-2xl">
              <h3 className="text-xs font-mono tracking-widest font-semibold uppercase text-cyan-400 mb-4">
                Benefits Tracked
              </h3>
              <div className="space-y-4">
                {opportunity.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-cyan-400/20 flex-shrink-0">
                      {getBenefitIcon(benefit.iconName)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200 leading-tight">
                        {benefit.label}
                      </p>
                      <p className="text-xs text-slate-400 leading-normal mt-0.5">
                        {benefit.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
                Application Deadline
              </p>
              <p className="text-lg font-mono font-bold text-amber-400">
                {opportunity.deadline}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => alert(`Deadline for ${opportunity.title} added to your calendar!`)}
                  className="w-full py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Add to Calendar
                </button>
              </div>
            </div>

            {opportunity.sourceUrl && (
              <div className="glass-panel p-6 rounded-2xl border border-[#cdebd8]">
                <h3 className="text-xs font-mono tracking-widest font-semibold uppercase text-[#15803d] mb-3">
                  Official Source
                </h3>
                <p className="text-xs text-[#45464d] leading-relaxed mb-4">
                  Verified {opportunity.lastVerifiedAt || "recently"} from the program or government source.
                </p>
                <a
                  href={opportunity.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 border border-[#cdebd8] bg-[#f4fff8] hover:bg-[#ecfff3] text-[#0b1c30] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-[#15803d]" />
                  <span>Open Source</span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Related Opportunities Section */}
        {relatedOpportunities.length > 0 && (
          <section className="mt-8 space-y-4">
            <h3 className="text-xs font-mono tracking-widest font-bold uppercase text-slate-300">
              RELATED NAVIGATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedOpportunities.map((related) => (
                <div
                  id={`related-card-${related.id}`}
                  key={related.id}
                  onClick={() => onSelectRelated(related)}
                  className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all cursor-pointer group"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-white/5">
                    <img
                      src={related.imageUrl}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-slate-400 text-[10px] flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{related.location.split(",")[1] || related.location}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                      {related.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom CTA bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#020205]/95 border-t border-white/5 px-6 py-4 flex items-center gap-4 z-40 shadow-xl backdrop-blur-md">
        <button
          onClick={() => onToggleSave(opportunity.id)}
          className={`flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all ${
            isSaved ? "bg-cyan-500/10 text-cyan-400 border-cyan-400/40" : "bg-white/5 text-slate-400"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? "fill-cyan-400 text-cyan-400" : ""}`} />
        </button>
        <button
          onClick={() => setShowApplyForm(true)}
          className="flex-grow h-14 bg-cyan-500 text-black font-bold text-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 glow-cyan rounded-xl"
        >
          <span>Transmit Formal Application</span>
          <ArrowRight className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Quick Entry Form Modal */}
      <AnimatePresence>
        {showApplyForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowApplyForm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-[#0b0c16] border border-white/15 rounded-3xl w-full max-w-lg p-6 relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-headline">
                    Transceiver Form Credentials
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fast track submission via verified passport credentials
                  </p>
                </div>
                <button
                  onClick={() => setShowApplyForm(false)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 hover:bg-white/5 rounded-md transition-colors font-bold"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Contact Number (WhatsApp Enabled)</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Personal Statement Abstract</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none font-sans"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="mt-1 rounded text-cyan-500 focus:ring-cyan-400/20 bg-white/5 border-white/10"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-400 leading-relaxed font-light">
                    I authorize secure transfer of verified credentials to the scholarship committee.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full py-3.5 bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  {formSubmitted ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin text-black" />
                      <span>TRANSMITTING BUNDLE...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>SUBMIT VERIFIED PROTOCOL</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
