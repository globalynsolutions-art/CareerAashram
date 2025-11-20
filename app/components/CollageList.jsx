"use client"
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { useParams, usePathname } from "next/navigation";
import {
  ChevronDown,
  Search,
  Filter,
  MapPin,
  Star,
  BookOpen,
} from "lucide-react";
import Link from "next/link";



const CourseListingPage = () => {
  const { id, courseId } = useParams(); // Handle both id (city) and courseId from URL
  const location = usePathname();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cityIds = [
    "indore",
    "nagpur",
    "kolkata",
    "mumbai",
    "bangalore",
    "chennai",
    "hyderabad",
    "delhi",
    "pune",
    "bhopal",
  ];

  // Debug URL and params
  useEffect(() => {
    console.log("Current URL:", location.pathname);
    console.log("useParams result:", { id, courseId });
  }, [id, courseId, location]);

  // Fetch colleges
  useEffect(() => {
    const fetchColleges = async () => {
      // Determine filterType synchronously to avoid premature fetches
      let filterType = null;
      if (id && cityIds.includes(id.toLowerCase())) {
        filterType = "city";
      } else if (courseId) {
        filterType = "course";
      }

      // Skip fetch if no valid filterType or id/courseId
      if (!filterType || (!id && !courseId)) {
        console.log("No valid filterType, id, or courseId, skipping fetch", {
          id,
          courseId,
          filterType,
        });
        setIsLoading(false);
        setColleges([]);
        setFilteredColleges([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://careeraashram-backend.onrender.com";
        const endpoint =
          filterType === "city"
            ? `${baseUrl}/api/colleges/by-city/${id}`
            : `${baseUrl}/api/courses/by-course/${courseId}`;
        console.log("Fetching from:", endpoint);
        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
          withCredentials: true,
        });
        console.log("Fetched colleges data:", response.data);
        if (!response.data.success || !response.data.data?.colleges) {
          throw new Error("Invalid API response: Missing required fields");
        }
        const collegesData = response.data.data.colleges || [];
        setColleges(collegesData);
        setFilteredColleges(collegesData);
      } catch (error) {
        console.error(
          `Error fetching colleges for ${filterType} with id ${
            id || courseId
          }:`,
          error
        );
        setError(
          error.response?.status === 404
            ? "No colleges found"
            : `Failed to load colleges: ${error.message}`
        );
        setColleges([]);
        setFilteredColleges([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColleges();
  }, [id, courseId]);

  // Filter colleges based on search term and selected state
  useEffect(() => {
    let filtered = colleges;
    if (searchTerm) {
      filtered = filtered.filter(
        (college) =>
          college.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (college.course &&
            college.course.toLowerCase().includes(searchTerm.toLowerCase())) ||
          college.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedState) {
      filtered = filtered.filter((college) =>
        college.location?.includes(selectedState)
      );
    }
    setFilteredColleges(filtered);
  }, [searchTerm, selectedState, colleges]);

  // Extract unique states for filter dropdown
  const states = [
    ...new Set(
      colleges.map(
        (college) => college.location?.split(", ")[1] || college.location
      )
    ),
  ].filter((state) => state);

  // Display error message for invalid URL (no id or courseId)
  if (!id && !courseId) {
    console.log("ID and courseId are undefined, rendering error message");
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error: Invalid URL
          </h2>
          <p className="text-gray-600">
            No city or course ID provided in the URL. Please select a city or
            course from the homepage.
            <br />
            Current URL: {location.pathname}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Compute filterType for display purposes
  const filterType =
    id && cityIds.includes(id.toLowerCase()) ? "city" : "course";
  const displayId = id || courseId;
  const formattedDisplayId = displayId
    ? displayId.charAt(0).toUpperCase() + displayId.slice(1)
    : filterType === "city"
    ? "City"
    : "Course";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredColleges.length} colleges found
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-blue-700 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-2">
              Top Colleges{" "}
              {filterType === "city"
                ? `in ${formattedDisplayId}`
                : `for ${formattedDisplayId.toUpperCase()}`}
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search colleges or courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">All States</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">More Filters</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {filteredColleges.length} Colleges Found
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>Relevance</option>
                <option>Rating</option>
                <option>Fees</option>
                <option>Established</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredColleges.length > 0 ? (
              filteredColleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-2xl">
                              <img
                                src={college.logo || "🏛️"}
                                alt={college.name || "College"}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => (e.target.src = "🏛️")}
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xl font-semibold text-gray-900 mb-1">
                              {college.name || "Unknown College"}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">
                                  {college.location || "Unknown Location"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">
                                  {college.rating || "N/A"}
                                </span>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  college.type === "Government"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {college.type || "Private"}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                              {college.course && college.course !== "N/A" && (
                                <div>
                                  <span className="font-medium">Course:</span>
                                  <p className="text-gray-900">
                                    {college.course}
                                  </p>
                                </div>
                              )}
                              <div>
                                <span className="font-medium">Duration:</span>
                                <p className="text-gray-900">
                                  {college.duration || "N/A"}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">Students:</span>
                                <p className="text-gray-900">
                                  {college.students || "N/A"}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">
                                  Established:
                                </span>
                                <p className="text-gray-900">
                                  {college.established || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-2">
                            ₹{(college.fees || 0).toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Total Fees
                          </p>
                          <div className="space-y-2">
                            <a
                              href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Apply Now
                              </button>
                            </a>
                            <Link href={`/colleges/detail/${college.id}`}>
                              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                View Details
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No colleges found for this{" "}
                {filterType === "city" ? "city" : "course"}.
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-lg ${
                    page === 1
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default CourseListingPage;
