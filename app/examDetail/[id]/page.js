import ExamDetailsPage from '@/app/components/ExamDetail'
import React from 'react'

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/exam/detail/${params.id}`,
      { cache: "no-store" }
    );

    const exam = (await res.json())?.data;
    if (!exam) return { title: "Exam Not Found" };

    return {
      title: `${exam.examInfo?.name} — Exam Details`,
      description: exam?.overview?.slice(0, 150) || "Complete exam information",
      keywords: [exam.examInfo?.name, "exam", "entrance"].join(", "),

      openGraph: {
        title: `${exam.examInfo?.name} — Exam Details`,
        description: exam?.overview,
        url: `${BASE_URL}/ExamDetail/${params.id}`,
        type: "article",
      },
    };
  } catch (err) {
    return { title: "Exam Details" };
  }
}

const page = () => {
  return (
    <ExamDetailsPage />
  )
}

export default page