
import CourseDetailPage from '@/app/components/CourseDetail'
import React from 'react'

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/courses/detail/${id}`
    );
    const data = await res.json();

    return {
      title: `${data.name} - College Details`,
      description: data?.about?.description?.slice(0, 150) || "College information",
      keywords: data?.about?.keywords?.join(", ") || "college, admission, fees",
      openGraph: {
        title: `${data.name} - College Details`,
        description: data?.about?.description,
        images: data?.images || [],
      },
    };
  } catch (error) {
    return {
      title: "College Details",
      description: "View college details",
    };
  }
}

export default function Page({ params }) {
  return <CourseDetailPage params={params} />;
}
