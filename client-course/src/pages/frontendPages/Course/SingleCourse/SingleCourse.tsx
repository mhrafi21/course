import { useGetCourseBySlugQuery } from '@/redux/baseApi';
import React from 'react'
import { useParams } from 'react-router'
import SingleCourseCard from './SignleCourseCard';

const SingleCourse: React.FC = () => {
    const {slug} = useParams();
    const {data:SingleCourseData, isLoading} = useGetCourseBySlugQuery(slug);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
  return (
    <div>
      <SingleCourseCard course={SingleCourseData?.data} />
    </div>
  )
}

export default SingleCourse