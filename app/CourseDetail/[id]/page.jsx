


import CourseDetailPage from '@/app/components/CourseDetail'
import React from 'react'


export default function Page({ params }) {
  console.log(params)
  return <CourseDetailPage params={params} />;
}
