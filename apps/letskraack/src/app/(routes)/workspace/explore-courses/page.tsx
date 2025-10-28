import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const ExploreCourses = () => {
  return (
    <div>
        <h2 className='font-extrabold text-3xl'>Explore Courses</h2>
        <div className='flex items-center gap-4 m-10'> 
        <Input placeholder='Search for courses...' className='max-w-md' />
        <Button className='text-white'> <Search /> Search </Button>
        </div>
    </div>
  )
}

export default ExploreCourses