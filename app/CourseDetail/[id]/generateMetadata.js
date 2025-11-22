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

    const data = await res.json();
    const course = data.data;

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
