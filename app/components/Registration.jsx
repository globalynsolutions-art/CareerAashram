"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

const RegistrationPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    state: "",
    college: "",
    course: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      setIsOpen(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Registration failed!");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   // Handle form submission logic here
  //   alert('Registration submitted successfully!');
  // };

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Show Registration Form
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#49494cad] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 cursor-pinter"
        >
          <X size={24} />
        </button>

        <div className="flex">
          {/* Left side - Illustration */}
          <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-gray-50">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Register Now
              </h2>
              <p className="text-gray-600">
                Get access to college brochures,
                <br />
                favourites and dashboard
              </p>
            </div>

            {/* Illustration area */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Simple illustration placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">SR</span>
                  </div>
                </div>
              </div>

              {/* Security icons */}
              <div className="absolute top-4 left-8 w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>

              <div className="absolute bottom-8 right-4 w-16 h-12 bg-white rounded shadow-md flex items-center justify-center">
                <div className="text-xs text-gray-600">••••••</div>
              </div>

              {/* Plant decoration */}
              <div className="absolute bottom-0 right-0 w-8 h-16 bg-green-400 rounded-t-full"></div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-1/2 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Register Now</h2>
            </div>

            <div className="space-y-4">
              {/* Name and Email row */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* Mobile and Gender row */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* State and College row */}
              <div className="grid grid-cols-2 gap-4">
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
                </select>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                  required
                >
                  <option value="">-- Please select college--</option>
                  <option value="jadavpur-university">
                    Jadavpur University
                  </option>
                  <option value="iit-kharagpur">IIT Kharagpur</option>
                  <option value="presidency-university">
                    Presidency University
                  </option>
                  <option value="calcutta-university">
                    Calcutta University
                  </option>
                </select>
              </div>

              {/* Course selection */}
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
              </select>

              {/* Terms and conditions */}
              <div className="text-sm text-gray-600">
                By submitting this form, you accept and agree to our{" "}
                <a href="#" className="text-red-600 hover:underline">
                  Terms of Use
                </a>
                .
              </div>

              {/* Submit button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 cursor-pointer"
              >
                Submit
              </button>

              {/* Login link */}
              <div className="text-center text-sm text-gray-600 mt-4">
                Already Registered?{" "}
                <a
                  href="#"
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopup;
