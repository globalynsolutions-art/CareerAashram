
import CourseDetailPage from '@/app/components/CourseDetail'
import React from 'react'

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/colleges/detail/${id}`,
      {
        cache: "no-store",
        next: { revalidate: 0 }
      }
    );

    const data = await res.json();

    return {
      title: data?.name || "College Details",
      description:
        data?.about?.description?.slice(0, 150) ||
        "Detailed information about the college.",
      openGraph: {
        title: data?.name || "College Details",
        description:
          data?.about?.description ||
          "Detailed information about the college.",
        images: data?.images?.length ? data.images : []
      },
    };
  } catch (e) {
    return {
      title: "College Details",
      description: "Detailed information about the college."
    };
  }
}

import CollegeDetail from "./CollegeDetail";

export default function Page({ params }) {
  return <CourseDetailPage params={params} />;
}
