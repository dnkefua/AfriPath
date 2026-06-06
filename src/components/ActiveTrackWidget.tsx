import React, { useState } from "react";
import { ActiveTrack } from "../types";
import { Check, ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ActiveTrackWidgetProps {
  track: ActiveTrack;
  onUpdatePhase: (trackId: string, nextPhase: number) => void;
}

export const ActiveTrackWidget: React.FC<ActiveTrackWidgetProps> = ({
  track,
  onUpdatePhase,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleNextPhase = () => {
    if (track.currentPhase < track.totalPhases) {
      onUpdatePhase(track.id, track.currentPhase + 1);
    }
  };

  const handlePrevPhase = () => {
    if (track.currentPhase > 1) {
      onUpdatePhase(track.id, track.currentPhase - 1);
    }
  };

  return (
    <div id={`active-track-${track.id}`} className="glass-panel p-6 rounded-3xl relative overflow-hidden hover:border-[#ffb690] transition-all">
      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9d4300]">BENCHMARK PIPELINE</h4>
            <p className="text-sm font-semibold text-[#0b1c30] mt-1 leading-tight">{track.opportunityTitle}</p>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-tight px-3 py-1 bg-[#eff4ff] border border-[#d3e4fe] text-[#45464d] rounded-full shadow-sm whitespace-nowrap">
            Phase {track.currentPhase}/{track.totalPhases}
          </span>
        </div>

        {/* Dynamic Stepper Visualizer */}
        <div className="flex items-center gap-2">
          {Array.from({ length: track.totalPhases }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < track.currentPhase;
            const isActive = stepNum === track.currentPhase;

            return (
              <div 
                key={idx} 
                className="h-2 flex-grow rounded-full transition-all duration-500 relative"
                style={{
                  backgroundColor: isCompleted 
                    ? "#131b2e" // deep navy
                    : isActive 
                    ? "#fd761a" // orange
                    : "#d3e4fe"
                }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="stepper-glow"
                    className="absolute inset-0 bg-orange-500 rounded-full opacity-40 animate-pulse" 
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Phase Action Details */}
        <div className="flex justify-between items-center bg-[#eff4ff] px-4 py-2.5 rounded-xl text-xs text-[#45464d] border border-[#d3e4fe]">
          <span className="font-mono text-[10px] text-[#76777d] font-semibold">STAGE:</span>
          <span className="font-medium text-[#131b2e]">{track.phases[track.currentPhase - 1]}</span>
        </div>

        <button 
          id={`btn-continue-${track.id}`}
          onClick={() => setShowUpdateModal(true)}
          className="w-full py-3 bg-[#131b2e] text-white hover:bg-black rounded-lg text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#131b2e]/10"
        >
          <span>Check Milestone Roadmap</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Stepper Details / Progress Update Modal Overlay */}
      <AnimatePresence>
        {showUpdateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpdateModal(false)}
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
                  <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span className="font-headline tracking-tight text-white">Application Journey</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{track.opportunityTitle}</p>
                </div>
                <button 
                  onClick={() => setShowUpdateModal(false)}
                  className="p-1 px-2.5 text-slate-400 hover:text-white rounded-full bg-white/5 transition-colors text-xs font-bold"
                >
                  Close
                </button>
              </div>

              {/* Steps Vertical List */}
              <div className="space-y-4 my-6 relative pl-3 border-l-2 border-white/10 ml-4">
                {track.phases.map((phaseName, idx) => {
                  const stepNum = idx + 1;
                  const isCompleted = stepNum < track.currentPhase;
                  const isActive = stepNum === track.currentPhase;
                  
                  return (
                    <div key={idx} className="relative pl-6">
                      {/* Bullet point */}
                      <span className={`absolute left-0 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                        isCompleted 
                          ? "bg-cyan-500 text-black shadow-sm" 
                          : isActive 
                          ? "bg-[#fd761a] text-white ring-4 ring-orange-500/10" 
                          : "bg-white/10 text-slate-400"
                      }`}>
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : stepNum}
                      </span>
                      
                      <div>
                        <h4 className={`text-sm font-semibold ${isActive ? "text-cyan-400" : isCompleted ? "text-slate-300" : "text-slate-500"}`}>
                          {phaseName}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {isCompleted 
                            ? "Verified by agency systems." 
                            : isActive 
                            ? "Current active benchmark." 
                            : "Awaiting preceding step."
                          }
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Toggle panel buttons */}
              <div className="flex gap-3 justify-end items-center">
                {track.currentPhase > 1 && (
                  <button
                    onClick={handlePrevPhase}
                    className="flex-1 py-2.5 px-3 border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
                  >
                    Previous Phase
                  </button>
                )}
                {track.currentPhase < track.totalPhases ? (
                  <button
                    onClick={handleNextPhase}
                    className="flex-grow py-2.5 px-4 bg-cyan-500 text-black text-xs font-bold rounded-xl hover:bg-cyan-400 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/10"
                  >
                    <span>Advance Phase</span>
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex-1 text-emerald-400 text-xs py-2 bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 px-3 rounded-xl text-center font-bold">
                    🚀 Program Accomplished!
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
