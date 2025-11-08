"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    state: "",
    college: "",
    course: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://careeraashram-backend.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        setFormData(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(
          error.response?.data?.msg ||
            error.response?.data?.details ||
            error.message ||
            "Failed to fetch profile"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "https://careeraashram-backend.onrender.com/api/auth/me",
        formData,
        { withCredentials: true }
      );
      setFormData(response.data.user);
      setIsEditing(false);
      setError("");
      console.log("Updated Data:", response.data.user);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.msg ||
          error.response?.data?.details ||
          error.message ||
          "Failed to update profile"
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!isEditing ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Mobile:</strong> {formData.mobile}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>College:</strong> {formData.college}</p>
            <p><strong>Course:</strong> {formData.course}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Mobile"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            >
              <option value="">-- Please select gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            >
              <option value="">-- Please select state --</option>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            >
              <option value="">-- Please select college --</option>
              <option value="jadavpur-university">Jadavpur University</option>
              <option value="iit-kharagpur">IIT Kharagpur</option>
              <option value="presidency-university">Presidency University</option>
              <option value="calcutta-university">Calcutta University</option>
            </select>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
              required
            >
              <option value="">-- Please select course --</option>
              <option value="btech">B.Tech</option>
              <option value="mtech">M.Tech</option>
              <option value="bsc">B.Sc</option>
              <option value="msc">M.Sc</option>
              <option value="bba">BBA</option>
              <option value="mba">MBA</option>
            </select>
          </form>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;