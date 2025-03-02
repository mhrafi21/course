import { useGetCourseBySlugQuery } from '@/redux/baseApi';
import React from 'react'
import { useParams } from 'react-router'
import CourseDetails from './SignleCourseCard';

const SingleCourse: React.FC = () => {
    const {slug} = useParams();
    const {data:SingleCourseData, isLoading} = useGetCourseBySlugQuery(slug);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(SingleCourseData.data);
  return (
    <div>
      <CourseDetails ></CourseDetails>
    </div>
  )
}

export default SingleCourse