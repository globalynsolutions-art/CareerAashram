import React from 'react'
import CollegeDetail from '@/app/components/CollageDetail'

export default function Page({ params }) {
  console.log("Params in Page:", params);
  return <CollegeDetail params={params} />;
}

export async function generateMetadata({ params }) {
  const { collegeId } =  await params;

  console.log("College ID:", collegeId);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
    || "https://careeraashram-backend.onrender.com";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${API_BASE_URL}/api/colleges/detail/${collegeId}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return { title: "College Detail | Career Aashram" };
    }

    const college = await res.json();

    return {
      title: `${college.name} - Career Aashram`,
      description: (college.description || "").slice(0, 160),
      openGraph: {
        title: college.name,
        description: college.description,
        images: college.heroImage ? [{ url: college.heroImage }] : [],
      },
    };
  } catch {
    return { title: "College Detail | Career Aashram" };
  }
}
