"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react';
import CourseInfo from '@/components/workspace/CourseInfo';
import ChapterTopicList from '@/components/workspace/ChapterTopicList';
import CourseInfoSkeleton from '@/components/workspace/workspaceSkeleton/CourseInfoSkeleton';
import ChapterTopicListSkeleton from '@/components/workspace/workspaceSkeleton/ChapterTopicListSkeleton';

const EditCourse = ({viewCourse=false}: {viewCourse?: boolean}) => {
  const { courseId } = useParams()
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseId) {
      GetCourseInfo();
    }
  }, [courseId]);

  const GetCourseInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/courses?courseId=' + courseId);
      console.log('Course Info:', response.data);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div>
        <CourseInfoSkeleton />
        <ChapterTopicListSkeleton />
      </div>
    );
  }

  return (
    <div>
      <CourseInfo course={course} viewCourse={viewCourse} />
      <ChapterTopicList course={course} />
    </div>
  )
}

export default EditCourse
