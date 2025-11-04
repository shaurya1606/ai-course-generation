'use client'

import React from 'react'
import History from '@/components/ai-interview/History'
import { Button } from '@/components/ui/button'
import UserInputDialog from '@/components/ai-interview/UserInputDialog'
import { useUserEmail } from '@/hooks/use-user-email'

const coachingOptions = 'ai-interview'

const AiMock = () => {
  const userEmail = useUserEmail()

  return (
    <div className='mt-4 flex w-full flex-col items-center p-8'>
      <UserInputDialog coachingOptions={coachingOptions}>
        <Button className='font-semibold text-white'>Start New Mock Interview</Button>
      </UserInputDialog>
      <History userEmail={userEmail ?? undefined} />
    </div>
  )
}

export default AiMock