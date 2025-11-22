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

  // 📌 COURSES LIST
  const coursesData = await fetchJSON(
    "https://careeraashram-backend.onrender.com/api/courses"
  );
  const courses = coursesData.data || [];

  // 📌 EXAMS LIST  (correct route!)
  const examsData = await fetchJSON(
    "https://careeraashram-backend.onrender.com/api/exams"
  );
  const exams = examsData.data || [];

  // 📌 PREDICTOR EXAMS LIST
  const predData = await fetchJSON(
    "https://careeraashram-backend.onrender.com/api/predictor-exams"
  );
  const predictorExams = predData.data || [];

  return [
    // Static
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },

    // COURSE DETAIL PAGES
    ...courses.map((c) => ({
      url: `${BASE_URL}/CourseDetail/${c.id}`,
      lastModified: new Date(),
    })),

    // COLLEGE DETAIL PAGES (if needed)
    // ...colleges.map((c) => ({
    //   url: `${BASE_URL}/CollegeDetail/${c.id}`,
    //   lastModified: new Date(),
    // })),

    // EXAM DETAIL PAGES
    ...exams.map((e) => ({
      url: `${BASE_URL}/ExamDetail/${e.examInfo?.id}`,
      lastModified: new Date(),
    })),

    // PREDICTOR EXAM PAGES
    ...predictorExams.map((p) => ({
      url: `${BASE_URL}/PredictorExam/${p.key}`,
      lastModified: new Date(),
    })),
  ];
}
