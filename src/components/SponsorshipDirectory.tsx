import React, { useState } from "react";
import { DirectoryEntry } from "../types";
import { MapPin, ShieldCheck, Briefcase, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SponsorshipDirectoryProps {
  entries: DirectoryEntry[];
  onApplyRole: (companyName: string, roleTitle: string) => void;
}

interface JobRole {
  title: string;
  salary: string;
  type: string;
  skills: string[];
}

const COMPANY_ROLES: { [key: string]: JobRole[] } = {
  "Innovate UK Tech": [
    {
      title: "Senior Full-Stack Engineer (AI Team)",
      salary: "£75,000 - £88,000 / year",
      type: "Full-time • Hybrid (London)",
      skills: ["React", "TypeScript", "Node.js", "Generative AI"],
    },
    {
      title: "Cloud Infrastructure Architect",
      salary: "£82,000 - £95,000 / year",
      type: "Full-time • Remote (UK)",
      skills: ["AWS", "Terraform", "Kubernetes", "DevOps"],
    }
  ],
  "MedLink Canada": [
    {
      title: "Bioinformatics Research Lead",
      salary: "$110,000 - $125,000 CAD / year",
      type: "Full-time • On-site (Toronto)",
      skills: ["Python", "Genomics", "Machine Learning", "R"],
    },
    {
      title: "Clinical Trials Data Analyst",
      salary: "$85,000 - $98,000 CAD / year",
      type: "Full-time • Hybrid (Toronto)",
      skills: ["SQL", "SAS", "Data Science", "Biostatistics"],
    }
  ],
  "Berlin Eng. Group": [
    {
      title: "Robotics Controls Engineer",
      salary: "€68,000 - €78,000 / year",
      type: "Full-time • On-site (Berlin)",
      skills: ["C++", "ROS", "Python", "Control Systems"],
    },
    {
      title: "Senior Product Manager (IoT)",
      salary: "€72,000 - €85,000 / year",
      type: "Full-time • Hybrid (Berlin)",
      skills: ["Scrum", "IoT Hardware", "Agile Roadmap", "APIs"],
    }
  ],
};

export const SponsorshipDirectory: React.FC<SponsorshipDirectoryProps> = ({
  entries,
  onApplyRole,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<DirectoryEntry | null>(null);
  const [appliedRoleIndex, setAppliedRoleIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenRoles = (entry: DirectoryEntry) => {
    setSelectedEntry(entry);
    setAppliedRoleIndex(null);
  };

  const handleClose = () => {
    setSelectedEntry(null);
    setAppliedRoleIndex(null);
  };

  const handleApply = (role: JobRole, index: number) => {
    if (!selectedEntry) return;
    setIsSubmitting(true);
    setAppliedRoleIndex(index);
    
    // Simulate API delay
    setTimeout(() => {
      onApplyRole(selectedEntry.title, role.title);
      setIsSubmitting(false);
      setSelectedEntry(null);
      setAppliedRoleIndex(null);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <div
          id={`dir-entry-${entry.id}`}
          key={entry.id}
          className="glass-panel rounded-[24px] overflow-hidden border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 flex flex-col justify-between"
        >
          <div className="h-48 relative overflow-hidden bg-slate-950/80">
            <img
              src={entry.imageUrl}
              alt={entry.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            {entry.isGovernmentApproved && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-950/95 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>GOVERNMENT APPROVED</span>
              </div>
            )}
          </div>

          <div className="p-6 flex-grow flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-4 gap-2">
                <div>
                  <h4 className="text-base font-bold text-slate-100 leading-tight">{entry.title}</h4>
                  <div className="flex items-center gap-1 text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs">{entry.location}</span>
                  </div>
                </div>
                {entry.logoUrl && (
                  <img
                    src={entry.logoUrl}
                    alt={`${entry.title} Logo`}
                    className="w-10 h-10 rounded-lg object-contain bg-white/10 p-1 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag, idx) => {
                  const isSponsor = tag === "VISA SPONSORED";
                  const isUrgent = tag === "CLOSING SOON";
                  return (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${
                        isSponsor
                          ? "bg-cyan-950/80 text-cyan-400 border border-cyan-400/20"
                          : isUrgent
                          ? "bg-amber-950/80 text-amber-400 border border-amber-400/20"
                          : "bg-white/5 text-slate-300 border border-white/5"
                      }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              id={`btn-roles-${entry.id}`}
              onClick={() => handleOpenRoles(entry)}
              className="w-full py-3 bg-[#020205] border border-white/15 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 font-bold text-xs font-mono uppercase tracking-widest rounded-xl transition-all cursor-pointer text-center"
            >
              View Roles
            </button>
          </div>
        </div>
      ))}

      {/* Roles Modal Overlay */}
      <AnimatePresence>
        {selectedEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-[#0b0c16] border border-white/15 rounded-3xl w-full max-w-lg p-6 relative z-10 overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <img
                  src={selectedEntry.logoUrl}
                  alt={selectedEntry.title}
                  className="w-12 h-12 rounded-xl object-contain bg-white/10 p-1.5"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow">
                  <span className="text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-400/20 px-2.5 py-0.5 rounded-full font-bold">
                    Official Sponsor
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedEntry.title}</h3>
                  <p className="text-xs text-slate-400">{selectedEntry.location}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-xs font-bold text-slate-400 hover:text-white px-2.5 py-1 bg-white/5 rounded-md"
                >
                  Close
                </button>
              </div>

              {/* Roles listing */}
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {COMPANY_ROLES[selectedEntry.title]?.map((role, idx) => {
                  const isApplyingThis = idx === appliedRoleIndex;
                  return (
                    <div
                      key={idx}
                      className="border border-white/5 bg-white/5 rounded-xl p-4 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition-all space-y-3"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-100">{role.title}</h4>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{role.type}</span>
                          </p>
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/10">
                          {role.salary.split(" / ")[0]}
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-white/10 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Apply button inside roles */}
                      <div className="pt-2 flex justify-end">
                        <button
                          disabled={isSubmitting}
                          onClick={() => handleApply(role, idx)}
                          className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-transform active:scale-95 ${
                            isApplyingThis
                              ? "bg-slate-700 text-slate-200 animate-pulse"
                              : "bg-cyan-500 text-black hover:bg-cyan-400 glow-cyan"
                          }`}
                        >
                          {isApplyingThis ? (
                            <>
                              <Sparkles className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending CV...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Apply & Sponsor</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-slate-500 mt-4 text-center">
                🛡️ Transmissions authenticated via secure Secure-Link credential systems.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

