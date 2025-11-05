import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, Building2, FileText } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface ResumeDataCardProps {
  jobTitle?: string
  companyName?: string
  jobDescription?: string
  isLoading?: boolean
}

const ResumeDataCard = ({ jobTitle, companyName, jobDescription, isLoading }: ResumeDataCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full animate-in fade-in duration-700">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!jobTitle && !companyName && !jobDescription) {
    return (
      <Card className="w-full border-dashed border-neutral-700 bg-neutral-900/30">
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-sm text-neutral-500">No job details provided</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full transition-all duration-500 ease-out hover:shadow-xl hover:border-neutral-700 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDuration: '800ms' }}
    >
      <CardHeader>
        <CardTitle className="text-lg transition-transform duration-300 ease-out hover:translate-x-1">Job Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobTitle && (
          <div className="flex items-start gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-all duration-300 ease-out group-hover:bg-blue-500/20 group-hover:scale-110 group-hover:rotate-6">
              <Briefcase className="h-5 w-5 transition-transform duration-300" />
            </div>
            <div className="flex-1 space-y-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-400">Job Title</p>
              <p className="text-base font-semibold text-neutral-100">{jobTitle}</p>
            </div>
          </div>
        )}

        {companyName && (
          <div className="flex items-start gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 transition-all duration-300 ease-out group-hover:bg-purple-500/20 group-hover:scale-110 group-hover:rotate-6">
              <Building2 className="h-5 w-5 transition-transform duration-300" />
            </div>
            <div className="flex-1 space-y-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-400">Company Name</p>
              <p className="text-base font-semibold text-neutral-100">{companyName}</p>
            </div>
          </div>
        )}

        {jobDescription && (
          <div className="flex items-start gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 transition-all duration-300 ease-out group-hover:bg-emerald-500/20 group-hover:scale-110 group-hover:rotate-6">
              <FileText className="h-5 w-5 transition-transform duration-300" />
            </div>
            <div className="flex-1 space-y-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-400">Job Description</p>
              <p className="text-sm leading-relaxed text-neutral-300">{jobDescription}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ResumeDataCard
