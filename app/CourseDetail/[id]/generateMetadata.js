export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/courses/detail/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: "Course Not Found",
        description: "This course does not exist",
      };
    }

    const course = await res.json(); // DIRECT RESPONSE, not data.data

    return {
      title: `${course.courseName} - Career Aashram`,
      description: course.courseDescription || "Course details page",
    };

  } catch (error) {
    return {
      title: "Course Not Found",
      description: "This course does not exist",
    };
  }
}
