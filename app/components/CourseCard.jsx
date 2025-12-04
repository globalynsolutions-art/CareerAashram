"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUserDoctor,faGraduationCap, faBriefcase, faUserTie, faChartPie } from "@fortawesome/free-solid-svg-icons";
import {
  BookOpen,
  GraduationCap,
  Stethoscope,
  Code,
  Palette,
  Briefcase,
  Star,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
} from "lucide-react";

const CourseCard = ({
  icon: Icon,
  title,
  subtitle,
  id,
  exams,
  buttonColor = "bg-orange-500",
  popularity,
  rating,
  students,
}) => {
  const [isHovered, setIsHovered] = useState(false);

 

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-orange-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

      {/* Popularity badge */}
      {popularity && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {popularity}
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
         <div
            className={`bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl mr-4 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300 ${
              isHovered ? "scale-110" : ""
            }`}
          >
            {typeof Icon === "function" ? (
              <Icon className="w-8 h-8 text-blue-600" />
            ) : (
              <FontAwesomeIcon icon={Icon} className="!w-8 !h-8 text-blue-600" />
            )}
          </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-1">
                {title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          {rating && (
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-yellow-700">{rating}</span>
            </div>
          )}
          {students && (
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="font-medium">{students}</span>
            </div>
          )}
        </div>

        {/* Exams */}
        <div className="flex flex-wrap gap-2 mb-6 min-h-[60px] md:min-h-[80px]">
          {exams.map((exam, index) => (
            <Link  key={exam} href={`/examDetail/${exam.toLowerCase().replace(/\s+/g, '-')}`}>
                <span
             
              className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl text-xs md:text-sm border border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
            >
              {exam}
            </span>
            </Link>
            
          ))}
        </div>

        {/* Button */}
        <Link href={`/CourseDetail/${id}`}>
          {" "}
          <button
            className={`w-full ${buttonColor} hover:scale-105 text-white py-3 md:py-4 px-6 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer`}
          >
            More Info
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </div>
  );
};

const CourseFinder = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Engineering",
    "Medical",
    "Commerce",
    "Arts",
    "Management",
  ];

  // Course data
  const courses = [
    {
      icon: faUserDoctor,
      title: "MBBS",
      subtitle: "Bachelor of Medicine and Bachelor of Surgery",
      id: "mbbs",
      exams: ["KEAM", "OJEE", "NEET UG"],
      category: "Medical",
      popularity: "Trending",
      rating: "4.9",
      students: "30K+ Students",
    },
    {
      icon: faGraduationCap,
      title: "B.Tech",
      subtitle: "Bachelor of Technology",
      id: "btech",
      exams: [
        "JEE MAIN",
        "JEE Advanced",
        "BITSAT",
        "WBJEE",
        "COMEDK UGET",
        "VITEEE",
      ],
      category: "Engineering",
      popularity: "Hot",
      rating: "4.7",
      students: "100K+ Students",
    },

    {
      icon: faBriefcase,
      title: "MBA",
      id: "mba",
      subtitle: "Master of Business Administration",
      exams: [
        "CAT",
        "MAT",
        "GMAT",
        "Karnataka PGCET",
        "KMAT",
        "XAT",
        "CMAT",
        "ATMA",
        "NMAT",
      ],
      category: "Management",
      popularity: "Popular",
      rating: "4.8",
      students: "60K+ Students",
    },
    {
      icon: faChartPie , 
      title: "BBA",
      id: "bba",
      subtitle: "Bachelor of Business Administration",
      exams: ["CAT", "MAT"],
      category: "Management",
      rating: "4.4",
      students: "40K+ Students",
    },
    {
      icon: faUserGraduate,
      title: "BCA",
      id: "bca",
      subtitle: "Bachelor of Computer Applications",
      exams: ["OJEE", "TANCET", "TRIPURA JEE", "MAH MCA CET"],
      category: "Engineering",
      popularity: "Hot",
      rating: "4.8",
      students: "50K+ Students",
    },
    {
      icon: faUserTie,
      title: "Hotel Management",
      id: "bhm",
      subtitle: "Bachelor of Hotel Management",
      exams: ["NCHMCT JEE", "IHM Entrance Exam"],
      category: "Hospitality",
      popularity: "Popular",
      rating: "4.5",
      students: "20K+ Students",
    },
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        {/* Background pattern start*/}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-orange-900/90"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        ></div>
        {/* Background pattern end*/}

        {/* perfect Banner Start*/}
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Find The Perfect{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Courses
              </span>
              <br className="hidden md:block" />
              For You
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover top-rated courses from leading institutions. Start your
              journey towards academic excellence with expert guidance and
              comprehensive preparation.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/AllCourse">
                {" "}
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Explore Courses
                </button>
              </Link>
              <Link href="/contact">
                {" "}
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                  Get Counseling
                </button>
              </Link>
            </div>

            {/* Stats  Perfect Banner Start*/}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                  100+
                </div>
                <div className="text-blue-100">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                  1000K+
                </div>
                <div className="text-blue-100">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                  95%
                </div>
                <div className="text-blue-100">Success Rate</div>
              </div>
            </div>
            {/* Stats  Perfect Banner end*/}
          </div>
        </div>

        {/* perfect Banner end*/}
      </div>

      {/* Course Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        {/* Category Filter/  Browse by Catagory Start*/}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {/* Category Filter/  Browse by Catagory End*/}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filteredCourses.map((course, index) => (
        
           
        
            <CourseCard
              key={course.id}
              icon={course.icon}
              title={course.title}
              subtitle={course.subtitle}
              id={course.id} // Pass the id prop here
              exams={course.exams}
              popularity={course.popularity}
              rating={course.rating}
              students={course.students}
              buttonColor={
                index % 2 === 0
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }
            />
        
          ))}
        </div>

        {/* CTA Section start*/}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-orange-900/95"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] opacity-50"></div>

            <div className="relative z-10 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful students who achieved their dreams
                with our expert guidance. Get personalized counseling and find
                the perfect course for your career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact">
                  {" "}
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-10 rounded-full font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Get Started Today
                  </button>
                </Link>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 px-10 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CTA Section end*/}
      </div>
    </div>
  );
};

export default CourseFinder;
