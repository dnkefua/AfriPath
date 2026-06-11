import React from "react";
import { MatchInsight, Opportunity } from "../types";
import { MapPin, Calendar, Bookmark, ShieldCheck } from "lucide-react";
import { SmartImage } from "./SmartImage";

interface OpportunityCardProps {
  opportunity: Opportunity;
  layout: "horizontal" | "vertical";
  isSaved: boolean;
  matchInsight?: MatchInsight;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  layout,
  isSaved,
  matchInsight,
  onToggleSave,
  onClick,
}) => {
  if (layout === "horizontal") {
    // Stacked-paper card layout for Screen 1
    return (
      <div
        id={`opp-card-h-${opportunity.id}`}
        onClick={onClick}
        className="min-w-[280px] w-[280px] glass-panel rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer hover:border-[#ffb690] hover:shadow-[0_18px_38px_rgba(19,27,46,0.12)] transition-all duration-300 transform active:scale-98"
      >
        <div className="h-40 relative overflow-hidden bg-[#dce9ff]">
          <SmartImage
            src={opportunity.imageUrl}
            alt={opportunity.title}
            className="w-full h-full object-cover group-hover:scale-105 opacity-95 group-hover:opacity-100 transition-all duration-500"
          />
          <div className="absolute top-3 right-3 bg-[#ffdf9f] text-[#261a00] border border-[#f9bd22]/40 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs backdrop-blur-md">
            {opportunity.badge}
          </div>
          {matchInsight && (
            <div className="absolute bottom-3 left-3 bg-[#131b2e] text-white border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-md">
              {matchInsight.score}% Match
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-semibold text-[#0b1c30] line-clamp-1 group-hover:text-[#9d4300] transition-colors">
            {opportunity.title}
          </h3>
          {matchInsight && (
            <p className="text-[11px] text-[#9d4300] font-semibold line-clamp-1">
              {matchInsight.label}
              {matchInsight.reasons.length > 0 ? ` - ${matchInsight.reasons.join(", ")}` : ""}
            </p>
          )}
          {opportunity.internationalApplicantPolicy && (
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#131b2e] bg-[#eff4ff] border border-[#dce9ff] rounded-full px-2.5 py-1 inline-flex max-w-max">
              {opportunity.internationalApplicantPolicy}
            </p>
          )}
          {opportunity.sourceUrl && (
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#15803d] bg-[#f4fff8] border border-[#cdebd8] rounded-full px-2.5 py-1 inline-flex items-center gap-1 max-w-max">
              <ShieldCheck className="w-3 h-3" />
              Source Verified
            </p>
          )}
          <div className="flex items-center gap-1 text-[#45464d] text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#565e74]" />
            <span className="line-clamp-1">{opportunity.location}</span>
          </div>
          <div className="pt-2 flex justify-between items-center border-t border-[#dce9ff]">
            <span className="text-xs text-[#9d4300] font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#fd761a]" />
              <span>Deadline: {opportunity.deadline}</span>
            </span>
            <button
              id={`save-h-${opportunity.id}`}
              onClick={(e) => onToggleSave(opportunity.id, e)}
              className="p-2 bg-[#eff4ff] hover:bg-[#ffdbca] rounded-full text-[#565e74] hover:text-[#9d4300] transition-all active:scale-90"
            >
              {isSaved ? (
                <Bookmark className="w-4 h-4 fill-[#fd761a] text-[#fd761a]" />
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
      className="glass-panel rounded-2xl overflow-hidden group transition-all duration-300 hover:border-[#ffb690] hover:shadow-[0_18px_38px_rgba(19,27,46,0.12)]"
    >
      <div 
        className="relative h-48 cursor-pointer overflow-hidden bg-[#dce9ff]"
        onClick={onClick}
      >
        <SmartImage
          src={opportunity.imageUrl}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-102 opacity-95 group-hover:opacity-100 transition-all duration-500"
        />
        {/* Badges */}
        <span className="absolute top-3 right-3 bg-[#ffdf9f] text-[#261a00] border border-[#f9bd22]/40 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs backdrop-blur-md">
          {opportunity.badge}
        </span>
        {matchInsight && (
          <span className="absolute top-12 right-3 bg-[#131b2e] text-white border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs backdrop-blur-md">
            {matchInsight.score}% Match
          </span>
        )}
        <span className="absolute bottom-3 left-3 bg-[#131b2e] backdrop-blur-md text-white px-3 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider border border-white/10">
          {opportunity.type}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3 
          className="text-base font-semibold text-[#0b1c30] group-hover:text-[#9d4300] transition-colors cursor-pointer line-clamp-1"
          onClick={onClick}
        >
          {opportunity.title}
        </h3>

        {matchInsight && (
          <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-[#131b2e]">{matchInsight.label}</p>
            <p className="text-[11px] text-[#45464d] mt-0.5">
              {matchInsight.reasons.length > 0 ? matchInsight.reasons.join(" - ") : "Review details to confirm fit"}
            </p>
          </div>
        )}

        {opportunity.internationalApplicantPolicy && (
          <div className="bg-[#ffdbca] border border-[#ffb690] rounded-xl px-3 py-2">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5c2400]">
              International eligibility signal
            </p>
            <p className="text-xs font-semibold text-[#0b1c30] mt-0.5">
              {opportunity.internationalApplicantPolicy}
            </p>
          </div>
        )}

        {opportunity.sourceUrl && (
          <div className="bg-[#f4fff8] border border-[#cdebd8] rounded-xl px-3 py-2">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803d]">
              Source verified
            </p>
            <p className="text-[11px] text-[#45464d] mt-0.5">
              Last checked {opportunity.lastVerifiedAt || "recently"} against official program information.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-xs text-[#45464d]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#565e74]" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#565e74]" />
            <span className="font-mono text-[11px]">Deadline: {opportunity.deadline}</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-[#dce9ff]">
          <span className="text-[#9d4300] font-mono text-sm tracking-tight font-semibold">
            {opportunity.stipend}
          </span>
          <div className="flex items-center gap-2">
            <button
              id={`save-v-${opportunity.id}`}
              onClick={(e) => onToggleSave(opportunity.id, e)}
              className="p-2 border border-[#dce9ff] hover:border-[#ffb690] rounded-lg bg-[#eff4ff] hover:bg-[#ffdbca] text-[#565e74] hover:text-[#9d4300] transition-all active:scale-90"
            >
              {isSaved ? (
                <Bookmark className="w-4 h-4 fill-[#fd761a] text-[#fd761a]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              id={`details-v-${opportunity.id}`}
              onClick={onClick}
              className="bg-[#131b2e] text-white hover:bg-black px-5 py-2 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-sm shadow-[#131b2e]/20"
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
