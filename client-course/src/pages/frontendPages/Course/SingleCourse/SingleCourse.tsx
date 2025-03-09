import { useGetCourseBySlugQuery } from '@/redux/baseApi';
import React from 'react'
import { useParams } from 'react-router'
import SingleCourseCard from './SignleCourseCard';

const SingleCourse: React.FC = () => {
    const {slug} = useParams();
    const {data:SingleCourseData, isLoading} = useGetCourseBySlugQuery(slug);
  
  return (
    <div>
      <SingleCourseCard isLoading={isLoading} course={SingleCourseData?.data} />
    </div>
  )
}

export default SingleCourse