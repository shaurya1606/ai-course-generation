import React from 'react'
import { resumes } from '@/constants/constant'
import { Resume } from '@/types/types'
import ResumeCard from './ResumeCard'

const ResumeTemplatesSection = () => {
  return (
    <section className="p-10 mb-20">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white">Resume Templates</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Pick a template tailored to your target role and start customizing instantly.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-6 justify-center">
        {resumes.map((resume: Resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>

    </section>
  )
}

export default ResumeTemplatesSection