"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import axios from "axios";
import logo from "../assets/logo/careerAasharam.png";
import loginLogo from "../assets/logo/CAlogo.jpg";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const LoginPopup = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLoginSuccess,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Call the success callback to update parent state
      onLoginSuccess(response.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#49494cad] bg-opacity-50 flex items-center justify-center p-4 z-[200]">
      <div className="bg-white rounded-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <img className="h-10" src={loginLogo} alt="Career Aasharam" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600 cursor-pointer">
                  Remember me
                </span>
              </label>
              <Link href="/forgot-password"
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
            <div className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const RegistrationPopup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    state: "",
    college: "",
    course: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      console.log("Registration successful:", response.data);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.msg || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[200]">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-gray-50">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Register Now
              </h2>
              <p className="text-gray-600">
                Get access to college brochures,
                <br />
                favourites and dashboard
              </p>
            </div>
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">CA</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-8 w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>
              <div className="absolute bottom-8 right-4 w-16 h-12 bg-white rounded shadow-md flex items-center justify-center">
                <div className="text-xs text-gray-600">••••••</div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-16 bg-green-400 rounded-t-full"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Register Now</h2>
            </div>
            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                    <span className="text-gray-600">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  required
                >
                  <option value="">-- Please select gender--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  required
                >
                  <option value="">-- Please select state--</option>
                  <option value="west-bengal">West Bengal</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="delhi">Delhi</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="madhya-pradesh">Madhya Pradesh</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="uttar-pradesh">Uttar Pradesh</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="punjab">Punjab</option>
                  <option value="haryana">Haryana</option>
                  <option value="bihar">Bihar</option>
                  <option value="jharkhand">Jharkhand</option>
                  <option value="odisha">Odisha</option>
                  <option value="andhra-pradesh">Andhra Pradesh</option>
                  <option value="telangana">Telangana</option>
                  <option value="kerala">Kerala</option>
                </select>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  required
                >
                  <option value="">-- Please select college--</option>
                  <option value="iit-delhi">IIT Delhi</option>
                  <option value="iit-bombay">IIT Bombay</option>
                  <option value="iit-kharagpur">IIT Kharagpur</option>
                  <option value="iit-kanpur">IIT Kanpur</option>
                  <option value="iit-madras">IIT Madras</option>
                  <option value="iit-roorkee">IIT Roorkee</option>
                  <option value="iit-guwahati">IIT Guwahati</option>
                  <option value="jadavpur-university">
                    Jadavpur University
                  </option>
                  <option value="presidency-university">
                    Presidency University
                  </option>
                  <option value="calcutta-university">
                    University of Calcutta
                  </option>
                  <option value="vit-vellore">VIT Vellore</option>
                  <option value="vit-ap">VIT AP</option>
                  <option value="bits-pilani">BITS Pilani</option>
                  <option value="nit-trichy">NIT Trichy</option>
                  <option value="nit-warangal">NIT Warangal</option>
                  <option value="dtu">Delhi Technological University</option>
                  <option value="manipal">
                    Manipal Institute of Technology
                  </option>
                  <option value="srm-chennai">
                    SRM Institute of Science and Technology
                  </option>
                </select>
              </div>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                required
              >
                <option value="">-- Please select course--</option>
                <option value="btech">B.Tech</option>
                <option value="mtech">M.Tech</option>
                <option value="bsc">B.Sc</option>
                <option value="msc">M.Sc</option>
                <option value="bba">BBA</option>
                <option value="mba">MBA</option>
                <option value="bca">BCA</option>
                <option value="mca">MCA</option>
                <option value="bcom">B.Com</option>
                <option value="mcom">M.Com</option>
                <option value="ba">B.A</option>
                <option value="ma">M.A</option>
                <option value="mbbs">MBBS</option>
                <option value="bds">BDS</option>
                <option value="bpharm">B.Pharm</option>
                <option value="llb">LLB</option>
                <option value="be">B.E</option>
                <option value="barch">B.Arch</option>
              </select>
              <div className="text-sm text-gray-600">
                By submitting this form, you accept and agree to our{" "}
                <Link href="/terms" className="text-red-600 hover:underline">
                  Terms of Use
                </Link>
                .
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              <div className="text-center text-sm text-gray-600 mt-4">
                Already Registered?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-red-600 hover:underline font-medium"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://careeraashram-backend.onrender.com";
  const SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_SEARCH_ENDPOINT || "/api/search";

  const recentSearches = ["BCA", "MBA", "Btech", "JEE MAIN", "M.Tech", "MBBS"];
  const trendingSearches = [
    { name: "Btech", category: "course", slug: "btech" },
    { name: "B.A", category: "course", slug: "ba" },
    { name: "JEE MAIN", category: "exam", slug: "jee-main" },
    { name: "CAT", category: "exam", slug: "cat" },
    {
      name: "VIT Vellore - Vellore Institute of Technology",
      category: "college",
      slug: "vit-vellore",
    },
    { name: "VIT AP University", category: "college", slug: "vit-ap" },
    { name: "IIT Delhi", category: "college", slug: "iit-delhi" },
    { name: "MBA", category: "course", slug: "mba" },
  ];
  const cities = [
    { name: "Bhopal", icon: "🏛️" },
    { name: "Indore", icon: "🏢" },
    { name: "Nagpur", icon: "🏛️" },
    { name: "Kolkata", icon: "🌉" },
    { name: "Mumbai", icon: "🏛️" },
    { name: "Bangalore", icon: "🏢" },
    { name: "Chennai", icon: "🏛️" },
    { name: "Hyderabad", icon: "🏛️" },
  ];

  const mockSearchResults = [
    { name: "Bachelor of Technology", category: "course", slug: "btech" },
    {
      name: "Master of Business Administration",
      category: "course",
      slug: "mba",
    },
    { name: "IIT Delhi", category: "college", slug: "iit-delhi" },
    {
      name: "Bachelor of Computer Applications",
      category: "course",
      slug: "bca",
    },
    { name: "Master of Technology", category: "course", slug: "mtech" },
    {
      name: "Bachelor of Medicine, Bachelor of Surgery",
      category: "course",
      slug: "mbbs",
    },
    { name: "Bachelor of Arts", category: "course", slug: "ba" },
    { name: "Common Admission Test", category: "exam", slug: "cat" },
    {
      name: "Joint Entrance Examination Main",
      category: "exam",
      slug: "jee-main",
    },
    { name: "VIT Vellore", category: "college", slug: "vit-vellore" },
  ];

  const filterItems = (items, query) => {
    if (!query) return items;
    return items.filter((item) =>
      typeof item === "string"
        ? item.toLowerCase().includes(query.toLowerCase())
        : item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredRecentSearches = filterItems(recentSearches, searchQuery);
  const filteredTrendingSearches = filterItems(trendingSearches, searchQuery);
  const filteredCities = filterItems(cities, searchQuery);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(
          `Fetching search results for query: ${searchQuery} at ${API_BASE_URL}${SEARCH_ENDPOINT}`
        );
        const response = await axios.get(`${API_BASE_URL}${SEARCH_ENDPOINT}`, {
          params: { query: searchQuery },
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
          withCredentials: true, // Added for CORS
        });

        console.log("Search API response:", response.data);
        if (!response.data.success || !Array.isArray(response.data.data)) {
          throw new Error(
            "Invalid API response: Expected success and data array"
          );
        }

        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        let errorMessage =
          "Failed to fetch search results. Please try again later or contact support.";
        if (error.response?.status === 404) {
          errorMessage = "No results found.";
          setSearchResults(
            mockSearchResults.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, API_BASE_URL, SEARCH_ENDPOINT]);

  const clearAllSearches = () => {
    console.log("Clearing all searches");
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Colleges, Exams, Courses and More..."
              className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-800 placeholder-gray-500"
              autoFocus
            />
            <svg
              className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386a1 1 0 01-1.414 1.415l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="px-4 py-6 space-y-8">
        {error && (
          <div className="text-center text-red-500 py-6">
            <p>{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="text-center text-gray-500 py-6">
            <p>Loading results...</p>
          </div>
        ) : searchQuery ? (
          <>
            {searchResults.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-500">
                    Search Results
                  </h3>
                </div>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={
                        result.category === "course"
                          ? `/CourseDetail/${result.slug}`
                          : result.category === "college"
                          ? `/CollageDetail/${result.slug}`
                          : `/exams/${result.slug}`
                      }
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 hover:bg-white rounded-lg cursor-pointer transition-colors duration-200"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {result.name} ({result.category})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6">
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </>
        ) : (
          <>
            {filteredRecentSearches.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-semibold text-red-500">
                      Recent Searches
                    </h3>
                  </div>
                  <button
                    onClick={clearAllSearches}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2">
                  {filteredRecentSearches.map((search, index) => (
                    <Link
                      key={index}
                      href={
                        ["JEE MAIN"].includes(search)
                          ? `/exams/${search
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
                          : `/CourseDetail/${search.toLowerCase()}`
                      }
                      className="flex items-center gap-3 p-3 hover:bg-white rounded-lg cursor-pointer transition-colors duration-200"
                      onClick={onClose}
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {search}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {filteredTrendingSearches.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-500">
                    Trending Search
                  </h3>
                </div>
                <div className="space-y-2">
                  {filteredTrendingSearches.map((search, index) => (
                    <Link
                      key={index}
                      href={
                        search.category === "college"
                          ? `/CollageDetail/${search.slug}`
                          : search.category === "exam"
                          ? `/exams/${search.slug}`
                          : `/CourseDetail/${search.slug}`
                      }
                      className="flex items-center gap-3 p-3 hover:bg-white rounded-lg cursor-pointer transition-colors duration-200"
                      onClick={onClose}
                    >
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {search.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {filteredCities.length > 0 && (
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Popular Cities
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {filteredCities.map((city, index) => (
                    <Link
                      key={index}
                      href={`/colleges/${city.name.toLowerCase()}`}
                      className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md cursor-pointer transition-all duration-200 transform hover:-translate-y-1 group"
                      onClick={onClose}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                        <div className="text-2xl">{city.icon}</div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-500 transition-colors duration-200">
                        {city.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const userData = localStorage.getItem("user");

      if (loginStatus === "true" && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegistrationOpen(false);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const openRegistration = () => {
    setIsRegistrationOpen(true);
    setIsLoginOpen(false);
  };

  const closeRegistration = () => {
    setIsRegistrationOpen(false);
  };

  const switchToLogin = () => {
    setIsRegistrationOpen(false);
    setIsLoginOpen(true);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegistrationOpen(true);
  };

  return (
    <>
      <nav className="bg-blue-800/70 backdrop-blur-md shadow-lg p-4 sticky top-0 z-50 border-b border-blue-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-orange-400 hover:text-orange-300 transition-colors duration-200 flex-shrink-0">
            <Link href="/">
            
              <Image src={logo} className="h-12 w-fit" alt="Career Aasharam" /> 
            </Link>
          </div>
          <div className="flex-1 mx-4 max-w-md lg:max-w-lg xl:max-w-xl hidden md:block xl:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Colleges, Exams, Courses and More..."
                className="w-full p-2 pl-10 bg-blue-800/40 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-white placeholder-blue-200 cursor-pointer"
                onClick={openSearch}
                readOnly
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="hidden xl:flex space-x-3 flex-shrink-0">
            <Link
              href="/AllCourse"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              All Courses
            </Link>
            <Link
              href="/CourseDetail/btech"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              B.Tech
            </Link>
            <Link
              href="/CourseDetail/mba"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              MBA
            </Link>
            <Link
              href="/CourseDetail/mtech"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              M.Tech
            </Link>
            <Link
              href="/CourseDetail/mbbs"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              MBBS
            </Link>
            <Link
              href="/CourseDetail/bcom"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              B.Com
            </Link>
            <Link
              href="/CourseDetail/bsc"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              B.Sc
            </Link>
            <Link
              href="/CourseDetail/ba"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              BA
            </Link>
            <Link
              href="/CourseDetail/bba"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              BBA
            </Link>
            <Link
              href="/CourseDetail/bca"
              className="text-blue-100 hover:text-orange-400 hover:scale-110 transition-all duration-200 font-medium whitespace-nowrap"
            >
              BCA
            </Link>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            <button
              onClick={openSearch}
              className="md:block xl:hidden p-2 text-blue-100 hover:text-orange-400 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                ></path>
              </svg>
            </button>
            <Link
              href=""
              className="text-blue-100 hover:text-orange-400 flex items-center transition-colors duration-200 font-medium hidden lg:flex"
              onClick={() =>
                window.open(
                  "https://www.google.com/search?sca_esv=5b71cfa89013eb9f&rlz=1C1SQJL_enIN978IN978&sxsrf=AE3TifN2ls45ZBgSFitjlfdCx_jzVjBVKg:1757933827715&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E86_Nnk7hqrA9sH4pHJ3bK8vA5xPINSu6vVF2STbsA_0UsSRkG9BYEhsXdraLFnAEFTjT_9YiY9xFdmWGDt9Dnk1It-c&q=Career+Aashram+Reviews&sa=X&ved=2ahUKEwjWyNvqzdqPAxXETmwGHTi-K4YQ0bkNegQISBAE&biw=1536&bih=695&dpr=1.25&zx=1757933867135&no_sw_cr=1#lrd=0x39ed57e07b2ded57:0xa8423bf4d5eac00d,3,,,,&ebo=1",
                  "_blank"
                )
              }
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="hidden xl:inline">Write A Review</span>
              <span className="xl:hidden">Review</span>
            </Link>
            {isLoggedIn ? (
              <div className="relative group">
                <Link
                  href="/userprofile"
                  className="text-blue-100 hover:text-orange-400 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                {/* Optional: Add a dropdown menu for logout */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/userprofile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-blue-100 hover:text-orange-400 focus:outline-none transition-colors duration-200 ml-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                ></path>
              </svg>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="hidden md:block xl:hidden text-blue-100 hover:text-orange-400 focus:outline-none transition-colors duration-200 ml-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:block xl:hidden mt-4">
            <div className="flex flex-col space-y-3 bg-blue-800/60 backdrop-blur-sm p-4 rounded-lg border border-blue-700">
              <div className="relative mb-4 md:hidden">
                <input
                  type="text"
                  placeholder="Search for Colleges, Exams, Courses and More..."
                  className="w-full p-2 pl-10 bg-blue-800/40 rounded-lg border border-blue-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-white placeholder-blue-200 cursor-pointer"
                  onClick={openSearch}
                  readOnly
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                  ></path>
                </svg>
              </div>
              <Link
                href="/AllCourse"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                All Courses
              </Link>
              <Link
                href="/CourseDetail/btech"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                B.Tech
              </Link>
              <Link
                href="/CourseDetail/mba"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                MBA
              </Link>
              <Link
                href="/CourseDetail/mtech"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                M.Tech
              </Link>
              <Link
                href="/CourseDetail/mbbs"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                MBBS
              </Link>
              <Link
                href="/CourseDetail/bcom"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                B.Com
              </Link>
              <Link
                href="/CourseDetail/bsc"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                B.Sc
              </Link>
              <Link
                href="/CourseDetail/ba"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                BA
              </Link>
              <Link
                href="/CourseDetail/bba"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                BBA
              </Link>
              <Link
                href="/CourseDetail/bca"
                className="text-blue-100 hover:text-orange-400 transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
              >
                BCA
              </Link>
              <div className="border-t border-blue-700 pt-3 mt-2 md:hidden">
                <Link
                  href="/write-review"
                  className="text-blue-100 hover:text-orange-400 flex items-center transition-colors duration-200 py-2 px-2 rounded hover:bg-blue-700/30"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Write A Review
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onSwitchToRegister={switchToRegister}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegistrationPopup
        isOpen={isRegistrationOpen}
        onClose={closeRegistration}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}

export default Navbar;
