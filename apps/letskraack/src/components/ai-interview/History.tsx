import React from 'react'

const History = () => {
  return (
    <div className='flex justify-center w-full p-10 gap-20'>
      <div>
        <h2 className='font-bold text-xl'>
            Your Previous Lectures
        </h2>
        <p className='text-neutral-400'>You don't have any previous lectures</p>
        </div>
        <div>
        <h2 className='font-bold text-xl'>
            Feedback
        </h2>
        <p className='text-neutral-400'>You don't have any previous interview feedback</p>
        </div>
    </div>
  )
}

export default History