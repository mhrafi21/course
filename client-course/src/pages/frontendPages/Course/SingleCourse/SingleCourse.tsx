import { useGetCourseBySlugQuery } from '@/redux/baseApi';
import React from 'react'
import { useParams } from 'react-router'

const SingleCourse: React.FC = () => {
    const {slug} = useParams();
    const {data:SingleCourseData, isLoading} = useGetCourseBySlugQuery(slug);
    console.log(SingleCourseData.data);
  return (
    <div>SingleCourse</div>
  )
}

export default SingleCourse