import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, TriangleAlert, Sparkles } from 'lucide-react'

interface ATSSuggestion {
    type: "good" | "improve";
    tip: string;
}

const ATSSkeleton = () => {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 space-y-4 animate-pulse">
      <div className="flex flex-row gap-4 items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

const ATS = ({ score, suggestions, isLoading }: { score: number; suggestions: ATSSuggestion[]; isLoading?: boolean }) => {
  if (isLoading) {
    return <ATSSkeleton />
  }

  const scoreColor = score > 69
    ? "from-emerald-500/20 via-emerald-500/10"
    : score > 49
    ? "from-amber-500/20 via-amber-500/10"
    : "from-rose-500/20 via-rose-500/10";

  const iconBgColor = score > 69
    ? "bg-emerald-500/20 text-emerald-400"
    : score > 49
    ? "bg-amber-500/20 text-amber-400"
    : "bg-rose-500/20 text-rose-400";

  const textColor = score > 69
    ? "text-emerald-400"
    : score > 49
    ? "text-amber-400"
    : "text-rose-400";

  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-800 bg-gradient-to-br to-neutral-900/40 p-8 flex flex-col gap-6 shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:border-neutral-700 animate-in fade-in slide-in-from-bottom-4",
        scoreColor
      )}
      style={{ animationDuration: '800ms' }}
    >
      <div className="flex flex-row gap-4 items-center">
        <div className={cn("p-2.5 rounded-full transition-all duration-300 ease-out hover:scale-110 hover:rotate-12", iconBgColor)}>
          <Sparkles className="w-6 h-6 transition-transform duration-300" />
        </div>
        <div>
          <p className="text-2xl font-bold text-neutral-100 transition-transform duration-300 ease-out hover:scale-105">
            ATS Score - <span className={textColor}>{score}</span>/100
          </p>
          <p className="text-xs text-neutral-500 uppercase tracking-wider transition-colors duration-300 ease-out hover:text-neutral-400">Applicant Tracking System</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p className="font-semibold text-lg text-neutral-200">
            How well does your resume pass through Applicant Tracking Systems?
          </p>
          <p className="text-sm text-neutral-400">
            Your resume was scanned like an employer would. Here's how it performed:
          </p>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className={cn(
                "group flex flex-row gap-3 items-start p-3 rounded-lg transition-all duration-500 ease-out hover:translate-x-1 animate-in fade-in slide-in-from-left-4",
                suggestion.type === "good" 
                  ? "bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/30" 
                  : "bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/30"
              )}
              style={{ animationDelay: `${index * 80}ms`, animationDuration: '600ms' }}
            >
              <div className={cn(
                "p-1 rounded-full shrink-0 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-12",
                suggestion.type === "good" ? "bg-emerald-500/20" : "bg-amber-500/20"
              )}>
                {suggestion.type === "good" ? (
                  <Check className="w-4 h-4 text-emerald-400 transition-transform duration-300" />
                ) : (
                  <TriangleAlert className="w-4 h-4 text-amber-400 transition-transform duration-300" />
                )}
              </div>
              <p className={cn(
                "text-sm leading-relaxed transition-opacity duration-300 ease-out group-hover:opacity-100",
                suggestion.type === "good" ? "text-emerald-200" : "text-amber-200"
              )}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2 p-4 rounded-lg bg-neutral-800/40 border border-neutral-700 transition-all duration-500 ease-out hover:bg-neutral-800/60 hover:border-neutral-600 hover:shadow-lg">
          <p className="text-sm text-neutral-300 transition-colors duration-300 ease-out hover:text-neutral-200">
            💡 <span className="font-medium">Pro Tip:</span> Want a better score? Improve your resume by applying the suggestions listed in the detailed feedback below.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ATS