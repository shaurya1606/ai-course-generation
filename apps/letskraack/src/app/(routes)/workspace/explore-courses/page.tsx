'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EnrollCourseCard from '@/components/workspace/EnrollCourseCard'

interface Course {
  id: number
  cid: string
  title: string
  description: string
  category?: string
  difficultyLevel: string
  duration: string
  noOfChapters: number
  bannerImageUrl?: string
  userEmail: string
  courseJson?: any
}

const ExploreCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses)
    } else {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredCourses(filtered)
    }
  }, [searchQuery, courses])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/courses?explore=true')
      setCourses(response.data)
      setFilteredCourses(response.data)
    } catch (err) {
      setError('Failed to load courses')
      console.error('Error fetching courses:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    // Search is handled in useEffect
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-neutral-950 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4'></div>
          <p className='text-neutral-400'>Loading courses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-neutral-950 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-400 mb-4'>{error}</p>
          <Button onClick={fetchCourses} variant='outline'>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-neutral-950 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Explore Courses</h1>
          <p className='text-neutral-400 text-lg mb-6'>
            Discover and enroll in courses created by our community
          </p>

          <div className='flex items-center gap-4 max-w-md'>
            <Input
              placeholder='Search courses...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-neutral-900 border-neutral-700 text-white'
            />
            <Button onClick={handleSearch} className='bg-blue-600 hover:bg-blue-700'>
              <Search className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>📚</div>
            <h3 className='text-xl font-semibold text-neutral-400 mb-2'>No courses found</h3>
            <p className='text-neutral-500'>
              {searchQuery ? 'Try adjusting your search terms' : 'No courses available at the moment'}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredCourses.map((course) => {
              // Transform course data to match EnrollCourseCard expectations
              const transformedCourse = {
                ...course,
                courseJson: {
                  course: {
                    name: course.title,
                    description: course.description,
                    noOfChapters: course.noOfChapters,
                    totalDuration: course.duration,
                    level: course.difficultyLevel
                  }
                }
              };

              return (
                <EnrollCourseCard
                  key={course.cid}
                  course={transformedCourse}
                  enrollCourses={null}
                  customRoute={`/course/${course.cid}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExploreCourses