import React from 'react'
import CollegeDetail from '@/app/components/CollageDetail'

export default function Page({ params }) {
  console.log("Page Params:", params);
  return <CollegeDetail params={params} />;
}

export async function generateMetadata({ params }) {
  const { id } = await params; // <-- remove await
  console.log("Generate Metadata ID:", id);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://careeraashram-backend.onrender.com";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${API_BASE_URL}/api/colleges/detail/${id}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        title: "College Detail | Career Aashram",
        description: "View college details, courses and more.",
      };
    }

    const college = await res.json();

    return {
      title: `${college.name} - Career Aashram`,
      description: college.description?.slice(0, 160) || "",
      openGraph: {
        title: college.name,
        description: college.description || "",
        images: college.heroImage ? [{ url: college.heroImage }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Loading College... | Career Aashram",
      description: "Fetching college data...",
    };
  }
}
