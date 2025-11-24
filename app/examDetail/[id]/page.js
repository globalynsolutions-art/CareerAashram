import ExamDetailsPage from '@/app/components/ExamDetail'
import React from 'react'

export async function generateMetadata({ params }) {

  const {id} = params

    return {
      title: ` ${id} Exam 2025: Dates, Pattern, Syllabus & Free PYQ PDFs`,
      description:`Preparing for ${id} 2025? Get official dates, pattern, cut-offs, mock tests & free previous year papers - everything updated for you. `,
      keywords: [id, "exam", "entrance"].join(", "),


    };
}

const page = () => {
  return (
    <ExamDetailsPage />
  )
}

export default page