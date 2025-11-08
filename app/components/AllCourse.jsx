"use client";
import React, { useState, useRef } from "react";
import {
  Search,
  User,
  Edit3,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building,
  Calculator,
  Stethoscope,
  Palette,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useParams } from "react-router-dom";
import Link from "next/link";

const StudyRiserrPlatform = () => {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("Kolkata");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCourses, setVisibleCourses] = useState(12);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
    country: "India",
    state: "Kolkata",
    course: "",
  });
  const [newsletterData, setNewsletterData] = useState({
    email: "",
    mobile: "",
    course: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://careeraashram-backend.onrender.com";

  const applicationForm = useRef();
  const newsletterForm = useRef();

  // List of Indian cities
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ];

  // Course data
  const allCourses = [
    {
      id: "btech",
      name: "B.Tech",
      subtitle: "Bachelor of Technology",
      colleges: 183,
      icon: <GraduationCap className="w-8 h-8 text-cyan-600" />,
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      id: "mtech",
      name: "M.Tech",
      subtitle: "Master of Technology",
      colleges: 120,
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "mca",
      name: "MCA",
      subtitle: "Master of Computer Applications",
      colleges: 79,
      icon: <GraduationCap className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "mha",
      name: "MHA",
      subtitle: "Master of Hospital Administration",
      colleges: 9,
      icon: <Stethoscope className="w-8 h-8 text-cyan-700" />,
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      id: "mba",
      name: "MBA",
      subtitle: "Master of Business Administration",
      colleges: 181,
      icon: <Building className="w-8 h-8 text-blue-700" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "bcom",
      name: "B.Com",
      subtitle: "Bachelor of Commerce",
      colleges: 58,
      icon: <Calculator className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "bba",
      name: "BBA",
      subtitle: "Bachelor of Business Administration",
      colleges: 117,
      icon: <Building className="w-8 h-8 text-cyan-600" />,
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      id: "ba",
      name: "B.A",
      subtitle: "Bachelor of Arts",
      colleges: 66,
      icon: <Palette className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "msc_agri",
      name: "M.Sc Agriculture",
      subtitle: "School of Agriculture Sciences",
      colleges: 0,
      icon: <GraduationCap className="w-8 h-8 text-orange-700" />,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "cfa",
      name: "CFA",
      subtitle: "Chartered Financial Analyst",
      colleges: 0,
      icon: <Calculator className="w-8 h-8 text-cyan-700" />,
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      id: "boptom",
      name: "B.Optom",
      subtitle: "Bachelor of Optometry",
      colleges: 9,
      icon: <Stethoscope className="w-8 h-8 text-blue-700" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "ms",
      name: "MS",
      subtitle: "Master of Science",
      colleges: 15,
      icon: <GraduationCap className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "bsc",
      name: "B.Sc",
      subtitle: "Bachelor of Science",
      colleges: 95,
      icon: <GraduationCap className="w-8 h-8 text-cyan-600" />,
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      id: "bca",
      name: "BCA",
      subtitle: "Bachelor of Computer Applications",
      colleges: 76,
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "mcom",
      name: "M.Com",
      subtitle: "Master of Commerce",
      colleges: 42,
      icon: <Calculator className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "bed",
      name: "B.Ed",
      subtitle: "Bachelor of Education",
      colleges: 38,
      icon: <GraduationCap className="w-8 h-8 text-cyan-700" />,
      color: "bg-cyan-50 border-cyan-200",
    },
  ];

  const courseCategories = [
    "All Courses",
    "B.Tech",
    "MBA",
    "M.Tech",
    "MBBS",
    "B.Com",
    "B.Sc",
    "BA",
    "BBA",
    "BCA",
  ];

  const topCourses = ["MBA", "B.Tech/BE", "MCA", "BCA", "M.Tech", "MA", "BA"];
  const topExams = ["CAT", "GATE", "Jee-Main", "NEET", "XAT", "CLAT", "MAT"];
  const topColleges = ["MBA", "B.Tech/BE", "MCA", "BCA", "M.Tech", "MA", "BA"];
  const otherLinks = [
    "About",
    "Contact Us",
    "Terms & Conditions",
    "Privacy Policy",
  ];

  const displayedCourses = allCourses.slice(0, visibleCourses);
  const hasMoreCourses = visibleCourses < allCourses.length;

  const handleLoadMore = () => {
    setVisibleCourses((prev) => Math.min(prev + 8, allCourses.length));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formValues = new FormData(applicationForm.current);
    console.log("Application Form Data:", Object.fromEntries(formValues));

    try {
      const result = await emailjs.sendForm(
        "service_cnvsgtb",
        "template_2y3e1ke",
        applicationForm.current,
        "eDvA1odo4wkmqxalZ"
      );
      console.log("Application email sent successfully:", result.text);
      setSuccess("Thank you for your inquiry! We will get back to you soon.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        gender: "Male",
        country: "India",
        state: "Kolkata",
        course: "",
      });
    } catch (error) {
      console.error("Error sending application email:", error.text);
      setError("Failed to send your inquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendNewsletter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formValues = new FormData(newsletterForm.current);
    console.log("Newsletter Form Data:", Object.fromEntries(formValues));

    try {
      const result = await emailjs.sendForm(
        "service_cnvsgtb",
        "template_2y3e1ke",
        newsletterForm.current,
        "eDvA1odo4wkmqxalZ"
      );
      console.log("Newsletter email sent successfully:", result.text);
      setSuccess("Thank you for subscribing to our newsletter!");
      setNewsletterData({
        email: "",
        mobile: "",
        course: "",
      });
    } catch (error) {
      console.error("Error sending newsletter email:", error.text);
      setError("Failed to subscribe to newsletter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Application Form */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 text-white py-4 lg:py-8">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold mb-4">
                BE/B.Tech Colleges, Courses And Exams In India
              </h1>
            </div>

            {/* Application Form */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-cyan-400/30">
              <div className="bg-orange-500/80 px-4 py-2 rounded-t-lg">
                <h3 className="text-lg font-semibold">Apply Now</h3>
                <p className="text-sm text-white/90">
                  For Dual BE/B.Tech Colleges, Courses and Exams in India
                </p>
              </div>

              <form className="space-y-2 p-4" ref={applicationForm} onSubmit={sendEmail}>
                {error && <p className="text-red-300 mb-2">{error}</p>}
                {success && <p className="text-green-300 mb-2">{success}</p>}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Your Name"
                      className="w-full px-3 py-2 bg-white/20 border border-cyan-400/50 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="mr-2 accent-orange-500"
                          required
                        />
                        Male
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="mr-2 accent-orange-500"
                        />
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full px-3 py-2 bg-white/20 border border-cyan-400/50 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone No."
                      className="w-full px-3 py-2 bg-white/20 border border-cyan-400/50 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select
                      name="country"
                      className="w-full px-3 py-2 bg-white/20 border border-cyan-400/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      required
                    >
                      <option value="India" className="text-black">
                        India
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <select
                      name="state"
                      className="w-full px-3 py-2 bg-white/20 border border-cyan-400/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      required
                    >
                      <option value="" className="text-black">
                        -- Select City --
                      </option>
                      {cities.map((city) => (
                        <option key={city} value={city} className="text-black">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Course Interested</label>
                  <select
                    name="course"
                    className="w-full px-3 py-2 bg-white/20 border border-cyan-400/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    required
                  >
                    <option value="" className="text-black">
                      -- Select Course --
                    </option>
                    <option value="btech" className="text-black">
                      B.Tech
                    </option>
                    <option value="mtech" className="text-black">
                      M.Tech
                    </option>
                    <option value="mba" className="text-black">
                      MBA
                    </option>
                    <option value="bca" className="text-black">
                      BCA
                    </option>
                    <option value="mbbs" className="text-black">
                      MBBS
                    </option>
                    <option value="hotelmanagement" className="text-black">
                      Hotel Management
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-orange-500 text-white font-semibold py-3 rounded transition-colors shadow-lg ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
                  }`}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* After 12th Section */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="container mx-auto lg:px-16 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900">
              After 12th
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search for Colleges, Exams, Courses and More..."
                  className="w-full px-4 py-2 pr-10 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap shadow-md">
                Need Counselling
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedCourses.map((course) => (
              <Link href={`/CourseDetail/${course.id}`} key={course.id}>
                <div
                  className={`${course.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-orange-300 hover:scale-105`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-900 mb-1">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600">{course.subtitle}</p>
                    </div>
                    <div className="ml-4">{course.icon}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {course.colleges} College{course.colleges !== 1 ? "s" : ""}
                    </span>
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      More Info →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMoreCourses && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg transition-colors shadow-md"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">
            Subscribe To Our <span className="text-orange-500">News Letter</span>
          </h3>
          <p className="text-gray-700 mb-8">
            Get College Notifications, Exam Notifications and News Updates
          </p>

          <form className="max-w-4xl mx-auto" ref={newsletterForm} onSubmit={sendNewsletter}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email id*"
                className="px-4 py-3 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                value={newsletterData.email}
                onChange={(e) =>
                  setNewsletterData({ ...newsletterData, email: e.target.value })
                }
                required
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile no*"
                className="px-4 py-3 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                value={newsletterData.mobile}
                onChange={(e) =>
                  setNewsletterData({ ...newsletterData, mobile: e.target.value })
                }
                required
              />
              <select
                name="course"
                className="px-4 py-3 border-2 border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                value={newsletterData.course}
                onChange={(e) =>
                  setNewsletterData({ ...newsletterData, course: e.target.value })
                }
                required
              >
                <option value="">Choose your course</option>
                {topCourses.map((course, index) => (
                  <option key={index} value={course.toLowerCase()}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-orange-500 text-white px-12 py-3 rounded-lg font-semibold transition-colors shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
              }`}
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default StudyRiserrPlatform;
