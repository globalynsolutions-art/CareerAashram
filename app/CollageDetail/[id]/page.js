import React from 'react'
import CollegeDetail from '@/app/components/CollageDetail'

export default function Page({ params }) {
  console.log(params)
  return (<CollegeDetail params={params} /> );
}

export async function generateMetadata({ params }) {
  const { collegeId } = await params;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://careeraashram-backend.onrender.com';
console.log(collegeId)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${API_BASE_URL}/api/colleges/detail/${collegeId}`, {
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!res.ok) return { title: "College Detail | Career Aashram" };

    const course = await res.json();

    return {
      title: `${course.title || course.courseName} - Career Aashram`,
      description: (course.description || course.courseDescription || "").slice(0, 160),
      openGraph: {
        title: course.title || course.courseName,
        description: course.description || "",
        images: course.image ? [{ url: course.image }] : [],
      },
    };
  } catch {
    return { title: "Loading Course... | Career Aashram" };
  }
}