'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const Feedback = () => {
  const resumeId = useParams().resumeId;

  return (
    <div>Feedback for Resume ID: {resumeId}</div>
  )
}

export default Feedback