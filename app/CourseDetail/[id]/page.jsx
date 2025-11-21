
import CourseDetailPage from '@/app/components/CourseDetail'
import React from 'react'

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/colleges/detail/${id}`,
      { cache: "no-store" }  // important
    );

    const data = await res.json();

    // If API doesn't return name or description, provide fallback
    return {
      title: data?.name ? `${data.name} | College Details` : "College Details",
      description:
        data?.about?.description?.slice(0, 150) ||
        "Read detailed information about the college.",
      keywords:
        data?.about?.keywords?.join(", ") || "college, admission, fees",
      openGraph: {
        title: data?.name || "College Details",
        description:
          data?.about?.description ||
          "Detailed college information and admissions.",
        images: data?.images?.length ? data.images : [],
      },
    };
  } catch (error) {
    return {
      title: "College Details",
      description: "Read detailed information about the college.",
    };
  }
}

export default function Page({ params }) {
  return <CourseDetailPage params={params} />;
}
