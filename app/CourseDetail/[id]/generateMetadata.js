export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(
      `https://careeraashram-backend.onrender.com/api/courses/detail/${id}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    // If backend returns error
    if (!data || data.error) {
      console.log("Metadata ERROR:", data);
      return {
        title: "Course Not Found",
        description: "This course does not exist.",
      };
    }

    const course = data.data || data;

    return {
      title: course.name || "Course Details",
      description:
        course.about?.description?.slice(0, 150) ||
        course.description?.slice(0, 150) ||
        "Course info",
      keywords: course.about?.keywords?.join(", ") || "courses, education",
      openGraph: {
        title: course.name,
        description: course.about?.description || course.description,
        images: course.images || [],
      },
    };
  } catch (error) {
    console.log("Meta fetch failed:", error);
    return {
      title: "Course Error",
      description: "Unable to load course data.",
    };
  }
}
