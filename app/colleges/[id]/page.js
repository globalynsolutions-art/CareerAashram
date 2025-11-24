import CourseListingPage from '@/app/components/CollageList'
import React from 'react'

export default function Page({ params }) {
  console.log(params)
  return (<CourseListingPage params={params} /> );
}

export async function generateMetadata({ params }) {
  const { id } = await params;



    return {
      title: `List of Top ${id} Colleges in India  2025 - Career Aashram`,
      description: (`Explore the top ${id} colleges in India for 2025: Explore rankings, course strengths, placement records & fees.` || "").slice(0, 160),
    
    };
  
}