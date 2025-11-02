'use client'
import React, { FormEvent, useState } from 'react'
import Navbar from '@/components/resume-analyser/Navbar'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import FileUploader from '@/components/resume-analyser/FileUploader'
import { usePuterStore } from '@/lib/puter'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { pdfToImage } from '@/lib/pdfToImage'
import { prepareInstructions } from '@/constants/constant'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUserDetails } from '@/hooks/use-user-details'
import { ResumeData } from '@/types/types'


const Upload = () => {

  const { fs, isLoading, ai, kv, puterReady, init } = usePuterStore();
  const route = useRouter();
  const { userDetail } = useUserDetails();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("Processing your resume, please wait...");
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  React.useEffect(() => {
    init();
  }, [init]);


  const handleAnalyse = async ({ companyName, jobTitle, jobDescription, file, uploadedAt }: { companyName: string; jobTitle: string; jobDescription: string, file: File, uploadedAt: Date }) => {
    try {
      setIsProcessing(true);

      // Check if Puter is ready
      if (!window.puter) {
        setStatusText('Error: Puter.js is not loaded. Please refresh the page.');
        setIsProcessing(false);
        return;
      }

      setStatusText("Uploading your resume...");

      const uploadedResume = await fs.upload([file])

      console.log('Upload result:', uploadedResume);

      if (!uploadedResume || !uploadedResume.path) {
        setStatusText('Error: Failed to upload resume. Please try again.');
        setIsProcessing(false);
        return;
      }

      setStatusText("Converting to image...");

      const { file: imageFile, base64 } = await pdfToImage(file);

      if (!imageFile) {
        setStatusText('Error: Failed to convert PDF to image.');
        setIsProcessing(false);
        return;
      }

      setStatusText("Uploading resume image...");

      setPreviewImage(base64);

      const uploadedImage = await fs.upload([imageFile]);

      console.log('Image upload result:', uploadedImage);

      if (!uploadedImage || !uploadedImage.path) {
        setStatusText('Error: Failed to upload resume image. Please try again.');
        setIsProcessing(false);
        return;
      }

      setStatusText("Preparing Data...");

      const resumeId: string = uuidv4();

      const resumeData: ResumeData = {
        resumeId,
        jobTitle,
        jobDescription,
        companyName,
        feedback: '',
        userEmail: userDetail?.email ?? null,
      }

      const jsonResumeData = JSON.stringify(resumeData);

      await kv.set(`resume-${resumeId}`, jsonResumeData);

      setStatusText("Analysing Resume...");

      const feedback = await ai.feedback(
        uploadedResume.path,
        prepareInstructions({ jobTitle, jobDescription })
      )

      const feedbackGeneratedAt = new Date();

      if (!feedback) {
        setStatusText('Error: Failed to analyse resume.');
        setIsProcessing(false);
        return;
      }

      const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

      resumeData.feedback = JSON.parse(feedbackText);

      await kv.set(`resume-${resumeId}`, JSON.stringify(resumeData));

      setStatusText("Analysis Complete! Redirecting...");

      console.log('Resume Data with Feedback:', resumeData);

      route.push(`/resume-analyser/feedback/${resumeId}`);
    } catch (error) {
      console.error('Error in handleAnalyse:', error);
      setStatusText(`Error: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`);
      setIsProcessing(false);
    }
  }

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!puterReady) {
      setStatusText('Error: System not ready. Please wait a moment and try again.');
      return;
    }

    const form = e.currentTarget.closest('form');
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const description = formData.get('job-description') as string;

    const uploadedAt = new Date();


    console.log({ companyName, jobTitle, description, file });

    if (!file) {
      setStatusText('Please upload a resume file.');
      return;
    }

    handleAnalyse({ companyName, jobTitle, jobDescription: description, file, uploadedAt });
  }



  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <section className='flex items-center justify-center py-12 px-6'>
        <div className='p-8 rounded-lg shadow-lg bg-neutral-900 w-full max-w-2xl text-center'>
          <h2 className='text-3xl font-bold mb-4 text-center text-white'>Smart Feedback For Your Dream Job</h2>
          {isProcessing ? (
            <>
              <h2 className="text-neutral-300">{statusText}</h2>
              <Image src='/images/resume-scan.gif' alt='Processing' width={200} height={100} className='mx-auto mt-4' />
            </>
          ) : (
            <p className="text-neutral-400">Drop your resume for an ATS score and improvement suggestions</p>
          )}
          {
            !isProcessing && (
              <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Label htmlFor="company-name" className="text-left block font-semibold text-neutral-300 mb-2">Company Name</Label>
                    <Input type="text" id="company-name" name='company-name' placeholder='e.g. Google' className='bg-neutral-800 border-neutral-700 rounded-lg p-3 w-full text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-500' />
                  </div>
                  <div>
                    <Label htmlFor="job-title" className="text-left block font-semibold text-neutral-300 mb-2">Job Title</Label>
                    <Input type="text" id="job-title" name='job-title' placeholder='e.g. Software Engineer' className='bg-neutral-800 border-neutral-700 rounded-lg p-3 w-full text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-500' />
                  </div>
                </div>
                <div>
                  <Label htmlFor="job-description" className="text-left block font-semibold text-neutral-300 mb-2">Job Description</Label>
                  <Textarea rows={6} id="job-description" name='job-description' placeholder='Paste the job description here...' className='bg-neutral-800 border-neutral-700 rounded-lg p-3 w-full text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-500' />
                </div>
                <div>
                  <FileUploader onFileSelect={handleFileSelect} file={file} />
                </div>
                <Button type='submit' className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105'>Analyse Resume</Button>
                {previewImage && (
                  <div className="mt-6 flex justify-center">
                    <Dialog open={showPreview} onOpenChange={setShowPreview}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          className="bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                        >
                          View Resume Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-neutral-900 border-neutral-800">
                        <DialogHeader>
                          <DialogTitle className="text-white">Resume Preview</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-center items-center">
                          <img
                            src={previewImage}
                            alt="PDF Preview"
                            className="rounded-lg shadow-lg max-h-[80vh] object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

              </form>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default Upload