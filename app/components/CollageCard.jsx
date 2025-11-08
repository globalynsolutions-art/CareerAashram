"use client";
import React, { useState } from "react";
import { Download, Star, MapPin, Award, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import iim from "../assets/logo/iim-kolkata.jpg";
import vit from "../assets/logo/vit-vellore.jpg";
import srm from "../assets/logo/srm.png";
import thapar from "../assets/logo/thapar.jpeg";
import amity from "../assets/logo/amity.png";
import aiims from "../assets/logo/aiims.jpg"
import lpu from "../assets/logo/Lovely_Professional_University_logo.png";

const CollegeCard = ({ college }) => {
  // const collageId =  useParams().id;
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        <div className="relative flex items-start gap-4">
          <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-lg flex-shrink-0 flex items-center justify-center shadow-md">
           <Image 
           src={college.logo}
              alt={college.name}
              className="w-9 h-9 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
           />
            
            <div className="hidden w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white text-sm font-bold flex items-center justify-center">
              {college.name.charAt(0)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/CollageDetail/${college.id}`}>
              {" "}
              <h3 className="font-bold text-lg leading-tight text-white group-hover:text-blue-100 transition-colors">
                {college.name}
              </h3>
            </Link>
            <p className="text-blue-100 text-sm flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {college.location}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Tags Section */}
      <div className="p-5 bg-gradient-to-b from-gray-50 to-white">
        {/* Certifications */}
        <div className="flex flex-wrap gap-2 mb-4">
          {college.certifications.map((cert, index) => (
            <span
              key={index}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200 hover:scale-105 ${
                cert === "--NIL--" || cert === "--" || cert === "-----"
                  ? "bg-gray-100 text-gray-500 border-gray-200"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
            >
              <Award className="w-3 h-3 inline mr-1" />
              {cert}
            </span>
          ))}
        </div>

        {/* Institution Tags */}
        {college.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {college.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-200 flex items-center gap-1 hover:bg-orange-100 transition-colors duration-200"
              >
                <Building2 className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Links with Enhanced Styling */}
      <div className="px-5 py-4 flex gap-6 text-sm border-b border-gray-100">
        <button className="text-orange-600 font-semibold flex items-center gap-2 hover:text-orange-700 transition-colors duration-200 group/link">
          <Download className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          Brochure
        </button>
        <button className="text-orange-600 font-semibold flex items-center gap-2 hover:text-orange-700 transition-colors duration-200 group/link">
          <Star className="w-4 h-4 fill-current group-hover/link:scale-110 transition-transform" />
          Review
        </button>
      </div>

      {/* Enhanced Bottom Action Buttons */}
      <div className="p-5 bg-white">
        <div className="flex gap-3">
          <Link href={`/CollageDetail/${college.id}`} className="flex-1 bg-gradient-to-r from-blue-800 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-900 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer flex justify-center items-center"><button >
            Courses & Fees
          </button></Link>
          <a
            href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill"
            target="_blank"
          >
            {" "}
            <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
              Apply Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const CollegeSection = () => {
  const [selectedDegree, setSelectedDegree] = useState("All");

  const degrees = ["All", "B.Tech", "BCA", "MBBS", "MBA", "B.Com"];

  const colleges = [
    {
      name: "Indian Institute of Management-Lucknow",
      location: "Noida, India",
      logo: iim,
      certifications: ["--NIL--", "--", "Private University", "Private"],
      tags: [],
      id: "iiml",
      degree: "MBA",
    },
    {
      name: "All India Institute of Medical Sciences (AIIMS)",
      location: "New Delhi, India",
      logo: aiims, 
      certifications: ["MCI", "UGC"],
      tags: ["Institute of National Importance", "Government"],
      id: "aiims",
      degree: "MBBS",
    },
    {
      name: "VIT Vellore - Vellore Institute of Technology",
      location: "Vellore, Chennai",
      logo: vit,
      certifications: ["AICTE", "MHRD", "UGC", "--"],
      tags: ["Deemed To Be University", "Private"],
      id: "vitv",
      degree: "B.Tech",
    },
    {
      name: "SRM Institute of Science & Technology",
      location: "Kattankulathur, Chennai",
      logo: srm,
      certifications: ["ABET", "UGC", "-----"],
      tags: ["Deemed To Be University", "Private"],
      id: "srmist",
      degree: "B.Tech",
    },
    {
      name: "Thapar University",
      location: "Punjab",
      logo: thapar,
      certifications: ["AICTE", "MHRD", "UGC", "--"],
      tags: ["Deemed To Be University", "Private"],
      id: "thapar",
      degree: "B.Tech",
    },
    {
      name: "Amity University Noida",
      location: "Noida",
      logo: amity,
      certifications: ["--NIL--", "--", "Private University", "Private"],
      tags: [],
      id: "amitynoida",
      degree: "BCA",
    },
    {
      name: "Lovely Professional University",
      location: "Punjab ",
      logo: lpu,
      certifications: ["UGC", "--", "Private University", "Private"],
      tags: [],
      id: "lpu",
      degree: "B.Com",
    },
  ];

  const filteredColleges =
    selectedDegree === "All"
      ? colleges
      : colleges.filter((college) => college.degree === selectedDegree);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 mb-6 px-4">
            Explore Top{" "}
            <span className="text-orange-600">Colleges/Universities</span>
          </h1>

          {/* Enhanced Degree Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 p-2 bg-white rounded-xl shadow-md border border-gray-200 max-w-fit mx-auto">
            {degrees.map((degree) => (
              <button
                key={degree}
                onClick={() => setSelectedDegree(degree)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer ${
                  selectedDegree === degree
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm border border-gray-200"
                }`}
              >
                {degree}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced College Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredColleges.map((college) => (
            <div key={college.id} className="w-full">
              <CollegeCard college={college} />
            </div>
          ))}
        </div>
      </div>

      {/* CSS for Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CollegeSection;
