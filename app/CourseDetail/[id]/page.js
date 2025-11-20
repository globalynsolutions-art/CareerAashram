

import CourseDetailPage from '@/app/components/CourseDetail';
import { notFound } from 'next/navigation';

// This runs on the server
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    // Fetch course data from your API
    const res = await fetch(`https://careeraashram-backend.onrender.com/api/courses/detail/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) throw new Error('Course not found');

    const courseData = await res.json();

    return {
      title: `Career Aashram | ${courseData.title || 'Course Details'}`,
      description: courseData.description || `Explore ${courseData.title} — syllabus, eligibility, top colleges, admission, and career opportunities.`,
      keywords: `${courseData.title}, ${courseData.category || 'education'}, ${courseData.duration}, top colleges for ${courseData.shortName || courseData.title}, admission 2025, syllabus, career scope`,
      
      openGraph: {
        title: `Career Aashram | ${courseData.title}`,
        description: `Discover ${courseData.title} — eligibility, fees, top colleges, and career options at Career Aashram.`,
        images: [courseData.image || "https://careeraashram.com/default-course-banner.jpg"],
        url: `https://careeraashram.com/course/${slug}`,
        type: 'website',
      },
      
      twitter: {
        card: 'summary_large_image',
        title: `${courseData.title} - Syllabus, Admission & Colleges | Career Aashram`,
        description: `Check ${courseData.title} details: duration, eligibility, top colleges, and career scope.`,
        images: [courseData.image || "https://careeraashram.com/default-course-banner.jpg"],
      },
    };
  } catch (error) {
    return {
      title: 'Course Not Found | Career Aashram',
      description: 'The requested course could not be found.',
    };
  }
}

// Optional: Generate static params if you want SSG for popular courses
// export async function generateStaticParams() {
//   const res = await fetch('https://careeraashram-backend.onrender.com/api/courses/all'); // your endpoint
//   const courses = await res.json();
//   return courses.map((course: any) => ({ slug: course.id || course.slug }));
// }

const Page = async ({ params }) => {
  const { slug } = params;

  let courseData = null;
  let error = null;

  try {
    const res = await fetch(`https://careeraashram-backend.onrender.com/api/courses/detail/${slug}`, {
      cache: 'no-store', // or next: { revalidate: 3600 }
    });

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error('Failed to load course');
    }

    courseData = await res.json();
  } catch (err) {
    error = "Failed to load course details. Please try again later.";
  }

  if (error || !courseData) {
    notFound(); // or show error page
  }

  return <CourseDetailPage courseData={courseData} />;
};

