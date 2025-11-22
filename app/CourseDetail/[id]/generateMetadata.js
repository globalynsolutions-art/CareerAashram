export async function generateMetadata({ params }) {
  const { id } = params; // id = “bca”

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/courses/detail/${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    // Check the correct key based on your API
    const course = data?.data;

    if (!course) {
      return {
        title: "Course Not Found | Career Aashram",
        description: "No course information found",
      };
    }

    return {
      title: `${course.name} - Course Details | Career Aashram`,
      description: course?.short_description || "Course information",
      openGraph: {
        title: `${course.name} - Course Details | Career Aashram`,
        description: course?.short_description || "",
        url: `https://careeraashram.com/course/${id}`,
        type: "article",
      },
    };
  } catch (error) {
    return {
      title: "Course Not Found",
      description: "Failed to load course data",
    };
  }
}
