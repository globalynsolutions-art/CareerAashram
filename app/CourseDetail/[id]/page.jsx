


import CourseDetailPage from '@/app/components/CourseDetail'
import React from 'react'

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/courses/detail/${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    console.log("API RESPONSE:", data);

    // most APIs wrap data inside data.data
    const course = data?.data || data;

    return {
      title: course?.name || "Course Details",
      description:
        course?.about?.description?.slice(0, 150) ||
        course?.description?.slice(0, 150) ||
        "Course information",
      keywords:
        course?.about?.keywords?.join(", ") || "courses, education, career",
      openGraph: {
        title: course?.name || "Course Details",
        description:
          course?.about?.description || course?.description,
        images: course?.images || [],
      },
    };
  } catch (error) {
    return {
      title: "Course Details",
      description: "View course details",
    };
  }
}

export default function Page({ params }) {
  return <CourseDetailPage params={params} />;
}
