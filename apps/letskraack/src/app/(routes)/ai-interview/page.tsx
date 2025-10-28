import React from 'react'
import History from '@/components/ai-interview/History'
import { Button } from '@/components/ui/button'

import UserInputDialog from '../../../components/ai-interview/UserInputDialog'

const coachingOptions = 'ai-interview';

const AiMock = () => {
  return (
    <div className='flex flex-col items-center w-full p-8 mt-4'>
      <UserInputDialog coachingOptions={coachingOptions}>
          <Button className='text-white font-semibold'>Start New Mock Interview</Button>
       </UserInputDialog>
        <History />
    </div>
  )
}

export default AiMock