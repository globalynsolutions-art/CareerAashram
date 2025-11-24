import CourseListingPage from '@/app/components/CollageList'
import React from 'react'




export default function Page({ params }) {
  console.log(params)
  return (<CourseListingPage params={params} /> );
}

export async function generateMetadata({ params }) {
  const { id } = await params;



    return {
      title: `List of Colleges in ${id} 2025  - Career Aashram`,
      description: (`“List of best colleges in ${id} for 2025 based on national rankings. Get details on top engineering, arts, commerce & medical institutions.`|| "").slice(0, 160)
    };
  
}