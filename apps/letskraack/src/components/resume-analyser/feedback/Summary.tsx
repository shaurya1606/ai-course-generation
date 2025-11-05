import React from 'react'
import type { Feedback } from '@/types/types'
import ScoreGuage from '@/components/ui/ScoreGuage'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor =
    score > 69
      ? "bg-emerald-500/20 border-emerald-400/30"
      : score > 49
      ? "bg-amber-500/20 border-amber-400/30"
      : "bg-rose-500/20 border-rose-400/30";
  const textColor =
    score > 69
      ? "text-emerald-300"
      : score > 49
      ? "text-amber-300"
      : "text-rose-300";
  const badgeText =
    score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

  return (
    <div className={cn("px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg", badgeColor, textColor)}>
      {badgeText}
    </div>
  );
};

const Category = ({ title, score, index }: { title: string; score?: number; index: number }) => {
  const textColor =
    score ? (score > 69
      ? "text-emerald-400"
      : score > 49
      ? "text-amber-400"
      : "text-rose-400") : "text-neutral-400";

  const bgGradient =
    score ? (score > 69
      ? "from-emerald-500/10 to-transparent"
      : score > 49
      ? "from-amber-500/10 to-transparent"
      : "from-rose-500/10 to-transparent") : "from-neutral-800/20 to-transparent";

  return (
    <div 
      className={cn(
        "group rounded-xl border border-neutral-800 bg-gradient-to-r p-6 transition-all duration-500 ease-out hover:shadow-xl hover:border-neutral-700 hover:translate-x-1 animate-in fade-in slide-in-from-bottom-4",
        bgGradient
      )}
      style={{ animationDelay: `${index * 80}ms`, animationDuration: '600ms' }}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-3">
          <h3 className="text-lg font-semibold text-neutral-100 transition-transform duration-300 ease-out group-hover:translate-x-1">{title}</h3>
          <ScoreBadge score={score ? score : 0} />
        </div>
        <p className="text-2xl font-bold transition-transform duration-300 ease-out group-hover:scale-110">
          <span className={textColor}>{score}</span>
          <span className="text-neutral-600">/100</span>
        </p>
      </div>
    </div>
  );
}

const SummarySkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col items-center gap-6 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40">
        <Skeleton className="h-48 w-48 rounded-full" />
        <div className="text-center space-y-2 w-full">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>
      </div>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  )
}

const Summary = ({ feedback, isLoading }: { feedback: Feedback | null; isLoading?: boolean }) => {
  if (isLoading) {
    return <SummarySkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-500 ease-out hover:border-neutral-700 hover:shadow-lg animate-in fade-in zoom-in-95"
        style={{ animationDuration: '800ms' }}
      >
        <ScoreGuage score={feedback?.overallScore || 0} />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-neutral-100 transition-transform duration-300 ease-out hover:scale-105">Your Resume Score</h2>
          <p className="text-sm text-neutral-400 max-w-md transition-colors duration-300 ease-out hover:text-neutral-300">
            This score is calculated based on various factors including content relevance, formatting, and keyword optimization.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Category title="Tone & Style" score={feedback?.toneAndStyle?.score} index={0} />
        <Category title="Content" score={feedback?.content?.score} index={1} />
        <Category title="Structure" score={feedback?.structure?.score} index={2} />
        <Category title="Skills" score={feedback?.skills?.score} index={3} />
      </div>
    </div>
  )
}

export default Summary