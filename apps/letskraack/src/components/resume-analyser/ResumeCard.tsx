import type { Resume } from '@/types/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ScoreCircle from '../ui/ScoreCircle'
import Image from 'next/image'
import { usePuterStore } from '@/lib/puter'

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const [resumeUrl, setResumeUrl] = useState<string | null>('');
    // const { isLoading, fs, kv } = usePuterStore();


    // useEffect(() => {
    //     const loadResumeData = async () => {
    //         const imageBlob = await fs.read(resume.imagePath)
    //         if (!imageBlob) return;
    //         let imageUrl = URL.createObjectURL(imageBlob)

    //         setResumeUrl(imageUrl);
    //     }

    //     loadResumeData();
    // }, [resume.imagePath]);
    return (
        <Link
            href={`/resume/${resume.id}`}
            className='w-80 h-150 bg-white border border-neutral-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300'
        >
            <div className='flex flex-row justify-between items-center'>
                <div className='p-4 flex flex-col gap-2'>
                    {resume.companyName && (<h1 className='font-bold text-md text-black break-words'>{resume.companyName}</h1>)}
                    {resume.jobTitle && (<h2 className='text-sm text-neutral-600 break-words'>{resume.jobTitle}</h2>)}

                    {!resume.companyName && !resume.jobTitle && (<p className='text-sm text-neutral-500 font-bold'>Resume</p>
                    )}
                </div>
                <div>
                    <ScoreCircle score={resume.feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (<div className='animate-in fade-in duration-1000'>
                <div className='w-full h-full'>
                    <Image src={resume.imagePath} alt='' width={400} height={50} />
                </div>
            </div>)}

        </Link>
    )
}

export default ResumeCard