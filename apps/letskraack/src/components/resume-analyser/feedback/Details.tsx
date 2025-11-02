import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Feedback } from '@/types/types'
import { Check, Inbox, TriangleAlert } from 'lucide-react'

const getScorePalette = (score: number) => {
  if (score >= 85) {
    return {
      pill: 'bg-emerald-500/15 border border-emerald-400/30 text-emerald-200',
      accent: 'text-emerald-200',
      icon: <Check className='size-4 text-emerald-300' />,
    }
  }

  if (score >= 70) {
    return {
      pill: 'bg-blue-500/15 border border-blue-400/30 text-blue-100',
      accent: 'text-blue-200',
      icon: <Check className='size-4 text-blue-200' />,
    }
  }

  if (score >= 55) {
    return {
      pill: 'bg-amber-500/20 border border-amber-400/40 text-amber-100',
      accent: 'text-amber-200',
      icon: <TriangleAlert className='size-4 text-amber-200' />,
    }
  }

  return {
    pill: 'bg-rose-500/20 border border-rose-400/40 text-rose-100',
    accent: 'text-rose-200',
    icon: <TriangleAlert className='size-4 text-rose-200' />,
  }
}

const ScoreBadge = ({ score }: { score: number }) => {
  const palette = getScorePalette(score)

  return (
    <span className={cn(
      'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl',
      palette.pill
    )}>
      <span className='animate-in zoom-in duration-300 ease-out'>
        {palette.icon}
      </span>
      <span className='font-mono'>{score}/100</span>
    </span>
  )
}

const CategoryPanel = ({
  title,
  score,
  tips,
}: {
  title: string
  score?: number
  tips: { type: 'good' | 'improve'; tip: string; explanation: string }[]
}) => {
  const safeScore = typeof score === 'number' ? Math.max(Math.min(score, 100), 0) : 0
  const palette = getScorePalette(safeScore)

  return (
    <div className='space-y-6 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 p-6 shadow-xl backdrop-blur-sm'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='space-y-1.5'>
          <h3 className='text-xl font-bold text-neutral-50 tracking-tight'>{title}</h3>
          <p className='text-sm text-neutral-400 leading-relaxed'>Key observations and targeted guidance for this dimension.</p>
        </div>
        <div className='animate-in fade-in zoom-in-95 duration-500'>
          <ScoreBadge score={safeScore} />
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        {tips.map((tip, index) => {
          const isPositive = tip.type === 'good'
          return (
            <div
              key={`${title}-${index}`}
              className={cn(
                'group relative flex items-center gap-4 rounded-xl border px-5 py-4 text-sm leading-relaxed shadow-md transition-all duration-500 ease-out hover:shadow-xl hover:translate-x-2 animate-in fade-in slide-in-from-left-4',
                isPositive
                  ? 'border-emerald-400/30 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-50 hover:border-emerald-400/50 hover:from-emerald-500/20 hover:to-emerald-500/10'
                  : 'border-amber-400/30 bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-50 hover:border-amber-400/50 hover:from-amber-500/20 hover:to-amber-500/10',
              )}
              style={{ animationDelay: `${index * 80}ms`, animationDuration: '600ms' }}
            >
              {/* Hover glow effect */}
              <div className={cn(
                'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out blur-xl -z-10',
                isPositive ? 'bg-emerald-500/20' : 'bg-amber-500/20'
              )} />
              
              {/* Icon */}
              <div className={cn(
                'shrink-0 rounded-full p-2 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-12',
                isPositive ? 'bg-emerald-500/20' : 'bg-amber-500/20'
              )}>
                {isPositive ? <Check className='size-5 transition-transform duration-300' /> : <TriangleAlert className='size-5 transition-transform duration-300' />}
              </div>
              
              {/* Content */}
              <div className='flex-1 space-y-1.5 min-w-0 transition-all duration-300 ease-out'>
                <p className='font-semibold text-base'>{tip.tip}</p>
                {tip.explanation && (
                  <p className='text-xs opacity-90 leading-relaxed transition-opacity duration-300 group-hover:opacity-100'>{tip.explanation}</p>
                )}
              </div>
              
              {/* Badge */}
              <div className='shrink-0'>
                <span className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ease-out whitespace-nowrap',
                  isPositive 
                    ? 'bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/30'
                )}>
                  <span className={cn(
                    'w-1.5 h-1.5 rounded-full animate-pulse',
                    isPositive ? 'bg-emerald-400' : 'bg-amber-400'
                  )} />
                  {isPositive ? 'Strength' : 'Opportunity'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Details = ({ feedback }: { feedback: Feedback | null }) => {
  if (!feedback) {
    return null
  }

  return (
    <section className='relative rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-950/90 to-neutral-900/80 p-6 shadow-2xl backdrop-blur-sm md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-hidden'>
      {/* Decorative gradient overlay */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent blur-3xl pointer-events-none' />
      
      <div className='relative z-10'>
        <div className='mb-8 flex flex-col gap-3'>
          <div className='flex items-center gap-3'>
            <Inbox className='size-8 text-blue-400' />
            <h2 className='text-2xl font-bold text-neutral-50 md:text-3xl tracking-tight'>Detailed Insights</h2>
          </div>
          <p className='text-sm text-neutral-400 leading-relaxed max-w-2xl'>
            Review section-by-section guidance to refine your resume with confidence. Each category provides actionable feedback tailored to your experience.
          </p>
        </div>

        <Accordion type='multiple' className='space-y-4'>
          <AccordionItem 
            value='tone-style' 
            className='group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-500 ease-out hover:border-neutral-700 hover:shadow-lg hover:shadow-emerald-500/10 hover:bg-neutral-900/60 animate-in fade-in slide-in-from-bottom-4'
            style={{ animationDelay: '100ms', animationDuration: '600ms' }}
          >
            <AccordionTrigger className='px-6 py-5 text-left text-lg font-semibold text-neutral-100 hover:no-underline transition-all duration-300 ease-out group-hover:text-white'>
              <div className='flex items-center gap-3'>
                <div className='w-1 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 group-hover:from-emerald-400 group-hover:to-emerald-500 transition-all duration-300 ease-out group-hover:h-10' />
                <span className='transition-transform duration-300 ease-out group-hover:translate-x-1'>Tone &amp; Style</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-6 pt-2'>
              <CategoryPanel
                title='Tone & Style'
                score={feedback.toneAndStyle?.score}
                tips={feedback.toneAndStyle?.tips ?? []}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value='content' 
            className='group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-500 ease-out hover:border-neutral-700 hover:shadow-lg hover:shadow-blue-500/10 hover:bg-neutral-900/60 animate-in fade-in slide-in-from-bottom-4'
            style={{ animationDelay: '200ms', animationDuration: '600ms' }}
          >
            <AccordionTrigger className='px-6 py-5 text-left text-lg font-semibold text-neutral-100 hover:no-underline transition-all duration-300 ease-out group-hover:text-white'>
              <div className='flex items-center gap-3'>
                <div className='w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300 ease-out group-hover:h-10' />
                <span className='transition-transform duration-300 ease-out group-hover:translate-x-1'>Content Depth</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-6 pt-2'>
              <CategoryPanel
                title='Content Depth'
                score={feedback.content?.score}
                tips={feedback.content?.tips ?? []}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value='structure' 
            className='group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-500 ease-out hover:border-neutral-700 hover:shadow-lg hover:shadow-purple-500/10 hover:bg-neutral-900/60 animate-in fade-in slide-in-from-bottom-4'
            style={{ animationDelay: '300ms', animationDuration: '600ms' }}
          >
            <AccordionTrigger className='px-6 py-5 text-left text-lg font-semibold text-neutral-100 hover:no-underline transition-all duration-300 ease-out group-hover:text-white'>
              <div className='flex items-center gap-3'>
                <div className='w-1 h-8 rounded-full bg-gradient-to-b from-purple-500 to-purple-600 group-hover:from-purple-400 group-hover:to-purple-500 transition-all duration-300 ease-out group-hover:h-10' />
                <span className='transition-transform duration-300 ease-out group-hover:translate-x-1'>Structure &amp; Layout</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-6 pt-2'>
              <CategoryPanel
                title='Structure & Layout'
                score={feedback.structure?.score}
                tips={feedback.structure?.tips ?? []}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value='skills' 
            className='group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-500 ease-out hover:border-neutral-700 hover:shadow-lg hover:shadow-amber-500/10 hover:bg-neutral-900/60 animate-in fade-in slide-in-from-bottom-4'
            style={{ animationDelay: '400ms', animationDuration: '600ms' }}
          >
            <AccordionTrigger className='px-6 py-5 text-left text-lg font-semibold text-neutral-100 hover:no-underline transition-all duration-300 ease-out group-hover:text-white'>
              <div className='flex items-center gap-3'>
                <div className='w-1 h-8 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 transition-all duration-300 ease-out group-hover:h-10' />
                <span className='transition-transform duration-300 ease-out group-hover:translate-x-1'>Skills Alignment</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-6 pt-2'>
              <CategoryPanel
                title='Skills Alignment'
                score={feedback.skills?.score}
                tips={feedback.skills?.tips ?? []}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

export default Details