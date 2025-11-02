'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePuterStore } from '@/lib/puter'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Summary from '@/components/resume-analyser/feedback/Summary'
import ATS from '@/components/resume-analyser/feedback/ATS'
import Details from '@/components/resume-analyser/feedback/Details'
import ResumeDataCard from '@/components/resume-analyser/feedback/ResumeDataCard'
import { Skeleton } from '@/components/ui/skeleton'
import type { Feedback } from '@/types/types'

// Extended type for resume with optional job details
type ResumeData = {
  jobTitle?: string;
  companyName?: string;
  jobDescription?: string;
  resumePath: string;
  imagePath: string;
  feedback: Feedback;
};


const FeedbackPage = () => {
  const params = useParams()
  const resumeId = useMemo(() => (Array.isArray(params?.resumeId) ? params.resumeId[0] : params?.resumeId), [params])
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fs, kv } = usePuterStore()

  useEffect(() => {
    const loadResumeFeedback = async () => {
      setIsLoading(true);
      const resume = await kv.get(`resume-${resumeId}`)

      if (!resume) {
        console.error('Resume not found');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      const resumeData = JSON.parse(resume)
      console.log('Loaded resume data:', resumeData);
      setResumeData(resumeData);

      console.log('Company data:', resumeData.companyName);

      const resumeBlob = await fs.read(resumeData.resumePath);
      if (!resumeBlob) {
        console.error('Resume blob not found');
        setIsError(true);
        setIsLoading(false);
        return
      }
      console.log('Resume blob:', resumeBlob);

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const pdfResumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(pdfResumeUrl);
      console.log('PDF Resume URL:', pdfResumeUrl);

      const imageBlob = await fs.read(resumeData.imagePath);
      if (!imageBlob) {
        console.error('Image blob not found');
        setIsError(true);
        setIsLoading(false);
        return
      }
      console.log('Image blob:', imageBlob);

      const imageResumeUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageResumeUrl);
      console.log('Image Resume URL:', imageResumeUrl);

      setFeedback(resumeData.feedback);
      const jobTitle = resumeData?.jobTitle
      const companyName = resumeData?.companyName
      const jobDescription = resumeData?.jobDescription

      console.log('job', jobTitle, jobDescription, companyName)
      console.log('Feedback:', resumeData.feedback);
      setIsLoading(false);
    }

    loadResumeFeedback()
  }, [resumeId])




  return (
    // <>
    // Hello{resumeId} </>
    <div className='min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100'>
      {/* Navigation */}
      <nav className='sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-lg transition-all duration-300 ease-out'>
        <div className='container mx-auto px-4 py-4'>
          <Link
            href="/resume-analyser/upload"
            className='group inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-all duration-300 ease-out hover:text-neutral-100 hover:translate-x-[-4px]'
          >
            <ArrowLeft className='h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-[-2px]' />
            Back to Resume Analyzer
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Left Column - Resume Preview & Data */}
          <div className='lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2 scrollbar-thin smooth-scroll'>
            {/* Resume Preview */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-neutral-200 transition-transform duration-300 ease-out hover:translate-x-1'>Resume Preview</h3>
              {isLoading ? (
                <Skeleton className='w-full aspect-[8.5/11] rounded-xl' />
              ) : imageUrl && resumeUrl ? (
                <div className='relative group animate-in fade-in slide-in-from-left-8'
                  style={{ animationDuration: '800ms' }}
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 ease-out' />
                  <Link
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='relative block overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-all duration-500 ease-out hover:scale-[1.02] hover:border-neutral-700 hover:shadow-2xl'
                  >
                    <Image
                      src={imageUrl}
                      alt="Resume Preview"
                      width={400}
                      height={520}
                      className="w-full object-contain transition-transform duration-500 ease-out"
                      priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-center pb-4'>
                      <span className='text-sm font-medium text-white transition-transform duration-300 ease-out group-hover:translate-y-[-4px]'>Click to view full PDF</span>
                    </div>
                  </Link>
                </div>
              ) : isError ? (
                <div className='w-full aspect-[8.5/11] rounded-xl border border-neutral-800 bg-neutral-900/40 flex items-center justify-center'>
                  <p className='text-sm text-neutral-500'>Failed to load preview</p>
                </div>
              ) : null}
            </div>

            {/* Resume Data Card */}
            <div className='animate-in fade-in slide-in-from-left-8'
              style={{ animationDuration: '800ms', animationDelay: '150ms' }}
            >
              <ResumeDataCard 
                jobTitle={resumeData?.jobTitle}
                companyName={resumeData?.companyName}
                jobDescription={resumeData?.jobDescription}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Right Column - Feedback */}
          <div className='lg:col-span-8 space-y-8 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2 scrollbar-thin smooth-scroll'>
            <div className='animate-in fade-in slide-in-from-right-8'
              style={{ animationDuration: '800ms' }}
            >
              <h1 className='text-3xl font-bold text-neutral-100 mb-2 transition-transform duration-300 ease-out hover:translate-x-1'>Resume Analysis</h1>
              <p className='text-neutral-400 transition-colors duration-300 ease-out hover:text-neutral-300'>Comprehensive feedback to help you improve your resume</p>
            </div>

            {isLoading ? (
              <div className='flex flex-col items-center justify-center py-20 space-y-4'>
                <div className='relative'>
                  <Loader2 className='h-12 w-12 animate-spin text-blue-500' />
                  <div className='absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-500/30' />
                </div>
                <div className='text-center space-y-2'>
                  <p className='text-lg font-medium text-neutral-300'>Analyzing your resume...</p>
                  <p className='text-sm text-neutral-500'>This may take a few moments</p>
                </div>
              </div>
            ) : feedback ? (
              <div className='space-y-8'>
                <Summary feedback={feedback} isLoading={false} />
                <ATS score={feedback.ATS.score || 0} suggestions={feedback?.ATS?.tips || []} isLoading={false} />
                <Details feedback={feedback} />
              </div>
            ) : isError ? (
              <div className='flex flex-col items-center justify-center py-20 space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/40'>
                <div className='h-16 w-16 rounded-full bg-rose-500/20 flex items-center justify-center'>
                  <span className='text-3xl'>⚠️</span>
                </div>
                <div className='text-center space-y-2'>
                  <p className='text-lg font-medium text-neutral-300'>Failed to load resume feedback</p>
                  <p className='text-sm text-neutral-500'>Please try again or go back to upload a new resume</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage