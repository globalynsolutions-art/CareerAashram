


import CourseDetailPage from '@/app/components/CourseDetail'
import React from 'react'

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/courses/detail/${params.id}`,
      { cache: "no-store" }
    );
    const course = await res.json();

    if (course.error) {
      return { title: "Course Not Found" };
    }

    return {
      title: `${course.name} — Course Details`,
      description:
        course?.about?.description?.slice(0, 150) ||
        "Get detailed course information, eligibility, fees and more.",
      keywords:
        course?.about?.keywords?.join(", ") ||
        "course, college, admission, fees, education",

      openGraph: {
        title: `${course.name} — Course Information`,
        description:
          course?.about?.description ||
          "Explore full details about this course.",
        url: `${BASE_URL}/CourseDetail/${params.id}`,
        type: "article",
        images: course?.images?.length ? course.images : [`${BASE_URL}/og.png`],
      },

      twitter: {
        card: "summary_large_image",
        title: `${course.name} — Course Overview`,
        description:
          course?.about?.description?.slice(0, 150) ||
          "Explore this course in detail.",
        images: course?.images?.length ? course.images : [`${BASE_URL}/og.png`],
      },
    };
  } catch (err) {
    return { title: "Course Details" };
  }
}


export default function Page({ params }) {
  console.log(params)
  return <CourseDetailPage params={params} />;
}
