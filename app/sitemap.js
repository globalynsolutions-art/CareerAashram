import { BASE_URL } from "@/app/lib/constants";

export default async function sitemap() {
  const fetchJSON = async (url) => {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      return await res.json();
    } catch (err) {
      console.error("Sitemap fetch error:", url, err);
      return {};
    }
  };

  // COURSES
  const coursesData = await fetchJSON(
    "https://careeraashram-backend.onrender.com/api/courses"
  );
  const courses = coursesData.data || [];

  // EXAMS
  const examsData = await fetchJSON(
    "https://careeraashram-backend.onrender.com/api/exam"
  );
  const exams = examsData.data || [];

  // PREDICTOR EXAMS
  const predData = await fetchJSON(
    "https://careeraashram-backend.onrender.com/api/predictor-exams"
  );
  const predictorExams = predData.data || [];

  return [
    // Static Pages
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },

    // Course Detail Pages
    ...courses.map((c) => ({
      url: `${BASE_URL}/CourseDetail/${c.id}`,
      lastModified: new Date(),
    })),

    // Exam Detail Pages
    ...exams.map((e) => ({
      url: `${BASE_URL}/ExamDetail/${e.examInfo?.id}`,
      lastModified: new Date(),
    })),

    // Predictor Exam Pages
    ...predictorExams.map((p) => ({
      url: `${BASE_URL}/PredictorExam/${p.key}`,
      lastModified: new Date(),
    })),
  ];
}
