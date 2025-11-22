// app/CollegeDetails/[id]/page.js

import CourseDetailPage from '@/app/components/CourseDetail';
import React from 'react';

// Move generateMetadata here directly
export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/courses/detail/${id}`,
      { 
        cache: "no-store",
        // Or use next: { revalidate: 60 } if you want ISR
      }
    );

    if (!res.ok) {
      return {
        title: "Course Not Found | Career Aashram",
        description: "The requested course could not be found.",
      };
    }

    const course = await res.json();

    return {
      title: `${course.courseName} - Career Aashram`,
      description: course.courseDescription?.slice(0, 160) || "Learn more about this course at Career Aashram",
      openGraph: {
        title: course.courseName,
        description: course.courseDescription || "Course details",
        images: course.courseImage ? [{ url: course.courseImage }] : [],
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Course Not Found | Career Aashram",
      description: "This course does not exist or is temporarily unavailable.",
    };
  }
}

export default function Page({ params }) {
  console.log(params);
  return <CourseDetailPage params={params} />;
}