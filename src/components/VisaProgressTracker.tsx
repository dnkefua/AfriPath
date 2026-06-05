import React, { useState } from "react";
import { Check, ClipboardList, Send, Milestone, Sparkles } from "lucide-react";

interface Step {
  title: string;
  desc: string;
  status: "completed" | "active" | "pending";
}

export const VisaProgressTracker: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1); // Index 0: verified, 1: review, 2: sent, 3: issued

  const steps: Step[] = [
    {
      title: "Profile Verified",
      desc: "Valid passport & transcripts linked.",
      status: activeStep > 0 ? "completed" : activeStep === 0 ? "active" : "pending"
    },
    {
      title: "Document Review",
      desc: "Sponsorship declaration review.",
      status: activeStep > 1 ? "completed" : activeStep === 1 ? "active" : "pending"
    },
    {
      title: "Application Sent",
      desc: "Dispatched to consulate queues.",
      status: activeStep > 2 ? "completed" : activeStep === 2 ? "active" : "pending"
    },
    {
      title: "Visa Issued",
      desc: "Official sticker generated.",
      status: activeStep > 3 ? "completed" : activeStep === 3 ? "active" : "pending"
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

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
          <h3 className="text-lg font-bold text-slate-100">My Visa Progress</h3>
          <p className="text-xs text-slate-400 mt-0.5">Track real-time biometric and consulate queue statuses</p>
        </div>
        <div className="bg-cyan-950/85 text-cyan-400 border border-cyan-400/20 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Active Hub: Tier 2 Priority</span>
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
              onClick={() => handleStepClick(idx)}
              className="flex items-center md:flex-col gap-4 md:gap-2 relative z-10 bg-transparent group cursor-pointer flex-1 text-left md:text-center transition-all duration-300"
            >
              {/* Bubble ring */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : isActive
                    ? "bg-[#fd761a] text-white animate-pulse ring-4 ring-orange-500/10"
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
      <div className="mt-8 bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
            Queue Action Required
          </span>
          <p className="text-sm font-bold text-slate-200 mt-1">
            {steps[activeStep].title} Details
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {activeStep === 0 && "Your profiles match ECOWAS & UK consulate rules. Complete."}
            {activeStep === 1 && "Pending: Submit proof of sponsor finances before June 15."}
            {activeStep === 2 && "Awaiting biometrics verification confirmation."}
            {activeStep === 3 && "Verified. Please coordinate delivery of passport."}
          </p>
        </div>
        {activeStep === 1 && (
          <button
            onClick={() => alert("Upload dialog spawned. Attach financial declaration PDF.")}
            className="px-4 py-2 bg-cyan-500 text-black hover:bg-cyan-400 text-xs font-bold rounded-xl cursor-pointer max-w-max transition-all shadow-md shadow-cyan-500/20"
          >
            Upload Document PDF
          </button>
        )}
      </div>
    </div>
  );
};

