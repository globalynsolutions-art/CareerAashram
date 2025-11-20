import CourseDetailPage from '@/app/components/CourseDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ 
  params 
}: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const res = await fetch(`https://careeraashram-backend.onrender.com/api/courses/detail/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error('Course not found');

    const courseData = await res.json();

    return {
      title: `Career Aashram | ${courseData.title || 'Course Details'}`,
      description: courseData.description || `Explore ${courseData.title} at Career Aashram — syllabus, eligibility, top colleges, admission process, and career opportunities.`,
      keywords: `${courseData.title}, ${courseData.category || 'education'}, ${courseData.duration}, best colleges for ${courseData.shortName || courseData.title}, admission 2025, syllabus, career after ${courseData.title}`,

      openGraph: {
        title: `Career Aashram | ${courseData.title}`,
        description: `Discover ${courseData.title} — eligibility, fees, top colleges, and career scope.`,
        images: [courseData.image || "https://careeraashram.com/default-course-banner.jpg"],
        url: `https://careeraashram.com/course/${slug}`,
        type: 'website',
      },

      twitter: {
        card: 'summary_large_image',
        title: `${courseData.title} - Career Aashram`,
        description: `Complete details about ${courseData.title}: syllabus, colleges, fees, and career options.`,
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

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  let courseData = null;

  try {
    const res = await fetch(`https://careeraashram-backend.onrender.com/api/courses/detail/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error('Failed to load');
    }

    courseData = await res.json();
  } catch (err) {
    notFound();
  }

  return <CourseDetailPage courseData={courseData} />;
};

export default Page;