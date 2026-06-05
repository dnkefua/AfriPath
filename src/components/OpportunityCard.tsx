import React from "react";
import { Opportunity } from "../types";
import { MapPin, Calendar, Bookmark } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  layout: "horizontal" | "vertical";
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  layout,
  isSaved,
  onToggleSave,
  onClick,
}) => {
  if (layout === "horizontal") {
    // Transparent glass-panel slider layout for Screen 1
    return (
      <div
        id={`opp-card-h-${opportunity.id}`}
        onClick={onClick}
        className="min-w-[280px] w-[280px] glass-panel rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 transform active:scale-98"
      >
        <div className="h-40 relative overflow-hidden bg-slate-950/80">
          <img
            src={opportunity.imageUrl}
            alt={opportunity.title}
            className="w-full h-full object-cover group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-cyan-950/80 text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs backdrop-blur-md">
            {opportunity.badge}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {opportunity.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <MapPin className="w-3.5 h-3.5 text-cyan-500/70" />
            <span className="line-clamp-1">{opportunity.location}</span>
          </div>
          <div className="pt-2 flex justify-between items-center border-t border-white/5">
            <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400/80" />
              <span>Deadline: {opportunity.deadline}</span>
            </span>
            <button
              id={`save-h-${opportunity.id}`}
              onClick={(e) => onToggleSave(opportunity.id, e)}
              className="p-2 bg-white/5 hover:bg-cyan-500/15 rounded-full text-slate-400 hover:text-cyan-300 transition-all active:scale-90"
            >
              {isSaved ? (
                <Bookmark className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Large vertical list card layout for Screen 2
  return (
    <div
      id={`opp-card-v-${opportunity.id}`}
      className="glass-panel rounded-2xl overflow-hidden group transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
    >
      <div 
        className="relative h-48 cursor-pointer overflow-hidden bg-slate-950/80"
        onClick={onClick}
      >
        <img
          src={opportunity.imageUrl}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-102 opacity-85 group-hover:opacity-100 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        {/* Badges */}
        <span className="absolute top-3 right-3 bg-cyan-950/80 text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs backdrop-blur-md">
          {opportunity.badge}
        </span>
        <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-slate-200 px-3 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider border border-white/10">
          {opportunity.type}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3 
          className="text-base font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
          onClick={onClick}
        >
          {opportunity.title}
        </h3>

        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-500/70" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-500/70" />
            <span className="font-mono text-[11px]">Deadline: {opportunity.deadline}</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-white/5">
          <span className="text-cyan-400 font-mono text-sm tracking-tight font-semibold">
            {opportunity.stipend}
          </span>
          <div className="flex items-center gap-2">
            <button
              id={`save-v-${opportunity.id}`}
              onClick={(e) => onToggleSave(opportunity.id, e)}
              className="p-2 border border-white/10 hover:border-cyan-400/50 rounded-lg bg-white/5 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transition-all active:scale-90"
            >
              {isSaved ? (
                <Bookmark className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              id={`details-v-${opportunity.id}`}
              onClick={onClick}
              className="bg-cyan-500 text-black hover:bg-cyan-400 px-5 py-2 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-sm shadow-cyan-500/20 glow-cyan"
            >
              {opportunity.type === "Workshop" && opportunity.stipend === "Free Registration"
                ? "Apply Now"
                : opportunity.type === "Fellowship"
                ? "Learn More"
                : "View Details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

