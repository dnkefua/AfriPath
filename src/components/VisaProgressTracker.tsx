import React, { useState } from "react";
import { Check, ClipboardList, Send, Milestone } from "lucide-react";
import { storage } from "../services/storage";

interface Step {
  title: string;
  desc: string;
  status: "completed" | "active" | "pending";
}

const STEP_KEY = "afripath_visa_planner_step";

// Self-reported visa journey planner. The user marks their own progress;
// AfriPath has no connection to consulates or application systems.
export const VisaProgressTracker: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(() => {
    const saved = Number(storage.get(STEP_KEY));
    return Number.isInteger(saved) && saved >= 0 && saved <= 3 ? saved : 0;
  });

  const updateStep = (index: number) => {
    setActiveStep(index);
    storage.set(STEP_KEY, String(index));
  };

  const steps: Step[] = [
    {
      title: "Documents Ready",
      desc: "Passport, transcripts, and finances gathered.",
      status: activeStep > 0 ? "completed" : activeStep === 0 ? "active" : "pending"
    },
    {
      title: "Application Prepared",
      desc: "Forms and sponsorship evidence drafted.",
      status: activeStep > 1 ? "completed" : activeStep === 1 ? "active" : "pending"
    },
    {
      title: "Submitted",
      desc: "Lodged through the official channel.",
      status: activeStep > 2 ? "completed" : activeStep === 2 ? "active" : "pending"
    },
    {
      title: "Decision Received",
      desc: "Outcome recorded for your records.",
      status: activeStep > 3 ? "completed" : activeStep === 3 ? "active" : "pending"
    }
  ];

  const getStepIcon = (index: number, status: string) => {
    switch (index) {
      case 0:
        return <Check className={`w-5 h-5 ${status === "completed" ? "text-black stroke-[3px]" : ""}`} />;
      case 1:
        return <ClipboardList className={`w-5 h-5 ${status === "active" ? "text-white" : ""}`} />;
      case 2:
        return <Send className={`w-5 h-5 ${status === "active" ? "text-white" : ""}`} />;
      case 3:
        return <Milestone className={`w-5 h-5 ${status === "active" ? "text-white" : ""}`} />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-100">My Visa Journey</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mark your own milestones as you move through the official process
          </p>
        </div>
        <div className="bg-cyan-950/85 text-cyan-400 border border-cyan-400/20 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 font-mono">
          <span>Self-reported</span>
        </div>
      </div>

      {/* Steps Board */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative md:justify-between">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-[24px] left-[5%] right-[5%] h-[2px] bg-white/10 z-0"></div>

        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";

          return (
            <div
              key={idx}
              onClick={() => updateStep(idx)}
              className="flex items-center md:flex-col gap-4 md:gap-2 relative z-10 bg-transparent group cursor-pointer flex-1 text-left md:text-center transition-all duration-300"
            >
              {/* Bubble ring */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : isActive
                    ? "bg-[#fd761a] text-white ring-4 ring-orange-500/10"
                    : "bg-white/5 text-slate-400 border border-white/10"
                }`}
              >
                {getStepIcon(idx, step.status)}
              </div>

              {/* Text */}
              <div className="space-y-0.5 md:mt-2">
                <span
                  className={`text-xs font-bold leading-none block transition-colors ${
                    isCompleted ? "text-cyan-400" : isActive ? "text-[#fd761a]" : "text-slate-500"
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[11px] text-slate-400 block max-w-[150px] leading-tight md:mx-auto">
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info card relative to step */}
      <div className="mt-8 bg-white/5 border border-white/5 rounded-2xl p-4">
        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
          Current Stage
        </span>
        <p className="text-sm font-bold text-slate-200 mt-1">
          {steps[activeStep].title}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          {activeStep === 0 && "Use the Command Center's Profile Vault to confirm each core document."}
          {activeStep === 1 && "Double-check eligibility and fees on the official government site before submitting."}
          {activeStep === 2 && "Decisions come from the consulate or program directly - keep an eye on their channels."}
          {activeStep === 3 && "Congratulations on reaching a decision. Record the outcome in your tracker."}
        </p>
        <p className="text-[10px] text-slate-500 mt-3 pt-3 border-t border-white/5">
          This planner is a personal checklist stored on your device. It is not connected to any
          government or consulate system.
        </p>
      </div>
    </div>
  );
};
