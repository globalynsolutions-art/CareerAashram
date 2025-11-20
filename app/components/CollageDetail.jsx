"use client";
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Calendar, Users, BookOpen, Award, ChevronRight, Star, Globe, Facebook, Twitter, Instagram, Youtube, Linkedin, IndianRupee, ExternalLink, CheckCircle, GraduationCap, Building, Trophy, Camera } from 'lucide-react';
import { useParams } from 'next/navigation';



const CollegeDetail = ({  }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [collegeData, setCollegeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const collegeId = useParams().id;
  // Fetch college data from API
  useEffect(() => {
    const fetchCollegeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://careeraashram-backend.onrender.com/api/colleges/detail/${collegeId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setCollegeData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load college data');
        setLoading(false);
      }
    };
console.log(collegeId)
    if (collegeId) {
      fetchCollegeData();
    } else {
      setError('College ID is missing');
      setLoading(false);
    }
  }, [collegeId]);

  const getIcon = (iconName) => {
    const icons = { Award, Users, Globe };
    const IconComponent = icons[iconName];
    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found, using default Award icon`);
      return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    }
    return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'fees', label: 'Fees', icon: IndianRupee },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'placements', label: 'Placements', icon: Trophy },
    { id: 'campus', label: 'Campus', icon: Building },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 lg:space-y-12">
            <section className="py-6 lg:py-12">
              <div className="text-center mb-6 lg:mb-12">
                <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  About {collegeData?.name || 'College'}
                </h2>
                <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto px-4 leading-relaxed">
                  {collegeData?.about?.description || 'No description available.'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 px-4">
                {collegeData?.about?.highlights?.map((highlight, index) => {
                  const gradients = [
                    'from-blue-600 via-blue-500 to-cyan-400',
                    'from-orange-600 via-orange-500 to-yellow-400',
                    'from-green-600 via-green-500 to-teal-400',
                  ];
                  return (
                    <div key={index} className="group bg-white rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 lg:p-8 transform hover:-translate-y-1 border border-gray-100">
                      <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-105 transition-transform duration-300`}>
                        {getIcon(highlight.icon)}
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">{highlight.title}</h3>
                      <p className="text-gray-600 text-xs lg:text-base leading-relaxed">{highlight.description}</p>
                    </div>
                  );
                }) || <p className="col-span-3 text-center text-gray-600">No highlights available.</p>}
              </div>
            </section>

            <section className="py-6 lg:py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 -mx-4 lg:-mx-6 px-4 lg:px-6">
              <div className="text-center mb-6 lg:mb-12">
                <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  Academic Excellence
                </h2>
                <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">
                  Comprehensive range of programs designed for future leaders
                </p>
              </div>
              <div className="space-y-6 lg:space-y-10">
                {collegeData?.faculties?.map((faculty, index) => (
                  <div key={index} className="bg-white rounded-xl lg:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white p-4 lg:p-8">
                      <h3 className="text-lg lg:text-2xl font-bold">{faculty.name}</h3>
                    </div>
                    <div className="p-4 lg:p-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                        {faculty.departments.map((dept, deptIndex) => (
                          <div key={deptIndex} className="flex items-center p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 group cursor-pointer border border-blue-100">
                            <ChevronRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="text-gray-800 text-xs lg:text-base font-medium">{dept}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )) || <p className="text-center text-gray-600">No faculty information available.</p>}
              </div>
            </section>
          </div>
         
        );

      case 'fees':
        return (
          <div className="space-y-6 lg:space-y-10">
            <div className="text-center mb-6 lg:mb-10">
              <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Fee Structure 2026
              </h2>
              <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">
                Transparent and competitive fee structure
              </p>
            </div>

            <div className="mb-10 lg:mb-12">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <GraduationCap className="mr-3 w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                Undergraduate Programs
              </h3>
              <div className="space-y-5 lg:space-y-6">
                {collegeData?.fees?.undergraduate?.map((program, index) => (
                  <div key={index} className="bg-white rounded-xl lg:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white p-4 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                        <div>
                          <h4 className="text-lg lg:text-xl font-bold mb-2">{program.program}</h4>
                          <p className="text-blue-100 text-sm lg:text-base">Duration: {program.duration}</p>
                        </div>
                        <div className="mt-3 lg:mt-0 text-right">
                          <div className="text-2xl lg:text-3xl font-extrabold text-orange-300">{program.totalFees}</div>
                          <div className="text-blue-100 text-sm lg:text-base">Total Program Fees</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 lg:p-8">
                      <div className="mb-4 lg:mb-6">
                        <span className="text-lg lg:text-xl font-bold text-orange-600">Annual Fees: {program.yearlyFees}</span>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6">
                        {program.components.map((component, compIndex) => (
                          <div key={compIndex} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-3 lg:p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="text-xs lg:text-sm text-gray-600 mb-2">{component.name}</div>
                            <div className="font-bold text-blue-900 text-base lg:text-lg">{component.amount}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill" target="_blank" rel="noopener noreferrer">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-colors flex items-center justify-center text-sm lg:text-base font-medium shadow-md hover:shadow-lg" aria-label={`Apply for ${program.program}`}>
                            <ExternalLink className="mr-2 w-4 h-4" />
                            Apply Now
                          </button>
                        </a>
                        <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm lg:text-base font-medium" aria-label="Schedule a campus visit">
                          <Calendar className="mr-2 w-4 h-4" />
                          Schedule Visit
                        </button>
                      </div>
                    </div>
                  </div>
                )) || <p className="text-center text-gray-600">No undergraduate programs available.</p>}
              </div>
            </div>

            <div className="mb-10 lg:mb-12">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="mr-3 w-6 h-6 lg:w-7 lg:h-7 text-green-600" />
                Postgraduate Programs
              </h3>
              <div className="space-y-5 lg:space-y-6">
                {collegeData?.fees?.postgraduate?.map((program, index) => (
                  <div key={index} className="bg-white rounded-xl lg:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-r from-green-700 via-green-600 to-teal-600 text-white p-4 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <h4 className="text-lg lg:text-xl font-bold mb-2">{program.program}</h4>
                          <p className="text-green-100 text-sm lg:text-base">Duration: {program.duration}</p>
                        </div>
                        <div className="mt-3 lg:mt-0 text-right">
                          <div className="text-2xl lg:text-3xl font-extrabold text-orange-300">{program.totalFees}</div>
                          <div className="text-green-100 text-sm lg:text-base">Total Program Fees</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 lg:p-8">
                      <div className="mb-4 lg:mb-6">
                        <span className="text-lg lg:text-xl font-bold text-orange-600">Annual Fees: {program.yearlyFees}</span>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6">
                        {program.components.map((component, compIndex) => (
                          <div key={compIndex} className="bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-3 lg:p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="text-xs lg:text-sm text-gray-600 mb-2">{component.name}</div>
                            <div className="font-bold text-green-900 text-base lg:text-lg">{component.amount}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill" target="_blank" rel="noopener noreferrer">
                          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-colors flex items-center justify-center text-sm lg:text-base font-medium shadow-md hover:shadow-lg" aria-label={`Apply for ${program.program}`}>
                            <ExternalLink className="mr-2 w-4 h-4" />
                            Apply Now
                          </button>
                        </a>
                        <button className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm lg:text-base font-medium" aria-label="Schedule a campus visit">
                          <Calendar className="mr-2 w-4 h-4" />
                          Schedule Visit
                        </button>
                      </div>
                    </div>
                  </div>
                )) || <p className="text-center text-gray-600">No postgraduate programs available.</p>}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-xl lg:rounded-2xl p-6 lg:p-10 border border-orange-200">
              <h3 className="text-xl lg:text-2xl font-bold text-orange-900 mb-6 flex items-center">
                <Star className="mr-3 w-6 h-6 lg:w-7 lg:h-7" />
                Scholarships & Financial Aid
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {collegeData?.fees?.scholarships?.map((scholarship, index) => (
                  <div key={index} className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-2 text-base lg:text-lg">{scholarship.name}</h4>
                    <p className="text-gray-600 text-xs lg:text-sm mb-3 leading-relaxed">{scholarship.criteria}</p>
                    <div className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 px-3 py-2 rounded-full text-xs lg:text-sm font-semibold inline-block border border-orange-200">
                      {scholarship.benefit}
                    </div>
                  </div>
                )) || <p className="col-span-3 text-center text-gray-600">No scholarships available.</p>}
              </div>
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1" aria-label="Learn more about scholarships">
                  Learn More About Scholarships
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 rounded-xl lg:rounded-2xl p-6 lg:p-10 border border-blue-200">
              <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">Payment Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div>
                  <h4 className="font-bold text-blue-900 mb-4 text-base lg:text-lg">Payment Methods</h4>
                  <ul className="space-y-2 text-xs lg:text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Online Payment (Credit/Debit Cards)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Net Banking & UPI
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Demand Draft
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Education Loan Assistance
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-4 text-base lg:text-lg">Important Notes</h4>
                  <ul className="space-y-2 text-xs lg:text-sm text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      Fees may be paid semester-wise or annually
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      Late payment penalty: ₹500 per day
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      Fees are subject to periodic revision
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      Hostel fees are separate and optional
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'admissions':
        return (
          <div className="space-y-6 lg:space-y-10">
            <div className="text-center mb-6 lg:mb-10">
              <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Admission Process 2026
              </h2>
              <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">
                Simple and transparent admission process
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md p-6 lg:p-10 border border-gray-100">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">Admission Steps</h3>
                <div className="space-y-5">
                  {collegeData?.admissionProcess?.steps?.map((step, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-xs lg:text-sm font-bold mr-3 lg:mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 text-xs lg:text-base font-medium leading-relaxed">{step}</span>
                      </div>
                    </div>
                  )) || <p className="text-gray-600">No admission steps available.</p>}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white rounded-xl lg:rounded-2xl p-6 lg:p-10 shadow-md">
                <h3 className="text-xl lg:text-2xl font-bold mb-6">Important Dates</h3>
                <div className="space-y-5">
                  {collegeData?.admissionProcess?.importantDates?.map((item, index) => (
                    <div key={index} className="border-l-4 border-orange-400 pl-4 hover:border-orange-300 transition-colors duration-300">
                      <div className="font-bold text-base lg:text-lg mb-1">{item.label}</div>
                      <div className="text-blue-100 text-sm lg:text-base">{item.date}</div>
                    </div>
                  )) || <p className="text-blue-100">No important dates available.</p>}
                </div>
                <a href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill" target="_blank" rel="noopener noreferrer">
                  <button className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300 w-full text-sm lg:text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1" aria-label="Apply for admission">
                    Apply Now - Start Your Journey
                  </button>
                </a>
              </div>
            </div>
          </div>
        );

      case 'placements':
        return (
          <div className="space-y-6 lg:space-y-10">
            <div className="text-center mb-6 lg:mb-10">
              <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Placement Excellence
              </h2>
              <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">
                Top career opportunities with leading companies
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-10">
                  <div className="text-center bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {collegeData?.placements?.stats?.placementRate || 0}%
                    </div>
                    <div className="text-gray-600 text-xs lg:text-base mt-2 font-medium">Placement Rate</div>
                  </div>
                  <div className="text-center bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {collegeData?.placements?.stats?.totalCompanies || 0}+
                    </div>
                    <div className="text-gray-600 text-xs lg:text-base mt-2 font-medium">Companies</div>
                  </div>
                  <div className="text-center bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {collegeData?.placements?.stats?.highestPackage || 'N/A'}
                    </div>
                    <div className="text-gray-600 text-xs lg:text-base mt-2 font-medium">Highest Package</div>
                  </div>
                  <div className="text-center bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {collegeData?.placements?.stats?.averagePackage || 'N/A'}
                    </div>
                    <div className="text-gray-600 text-xs lg:text-base mt-2 font-medium">Average Package</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-blue-200">
                  <p className="text-gray-700 mb-4 lg:mb-6 text-sm lg:text-base leading-relaxed">
                    Our placement cell ensures the best career opportunities.
                  </p>
                  <button className="bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-800 hover:to-cyan-800 text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1" aria-label="View detailed placement report">
                    View Detailed Placement Report
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md p-6 lg:p-10 border border-gray-100">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">Recent Placements</h3>
                <div className="space-y-3 lg:space-y-5">
                  {collegeData?.placements?.recentPlacements?.map((placement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-100">
                      <div>
                        <div className="font-bold text-gray-800 text-sm lg:text-lg">{placement.company}</div>
                        <div className="text-xs lg:text-sm text-gray-600 mt-1">{placement.role}</div>
                      </div>
                      <div className="text-orange-600 font-bold text-base lg:text-lg">{placement.package}</div>
                    </div>
                  )) || <p className="text-gray-600">No recent placements available.</p>}
                </div>
                <div className="mt-6 text-center">
                  <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium" aria-label="View all placement records">
                    View All Placement Records
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'campus':
        return (
          <div className="space-y-6 lg:space-y-10">
            <div className="text-center mb-6 lg:mb-10">
              <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Campus Life
              </h2>
              <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">
                Vibrant campus life with state-of-the-art facilities
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {collegeData?.campusGallery?.map((campus, index) => (
                <div key={index} className="group bg-white rounded-xl lg:rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  <div className="h-36 lg:h-48 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center relative overflow-hidden">
                    <Camera className="w-10 h-10 lg:w-12 lg:h-12 text-white opacity-60 group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 lg:p-6">
                    <h3 className="text-base lg:text-lg font-bold text-blue-900 mb-2">{campus.title}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">Modern facilities for learning and growth.</p>
                  </div>
                </div>
              )) || <p className="col-span-4 text-center text-gray-600">No campus gallery available.</p>}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10 mt-12">
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md p-6 lg:p-10 border border-gray-100">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6 flex items-center">
                  <Calendar className="mr-3 w-6 h-6 lg:w-7 lg:h-7" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {collegeData?.upcomingEvents?.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-100">
                      <div>
                        <div className="font-bold text-gray-800 text-sm lg:text-base">{event.event}</div>
                        <div className="text-xs lg:text-sm text-gray-600 mt-1">{event.date}</div>
                      </div>
                      <span className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 px-2 lg:px-3 py-1.5 rounded-full text-xs font-bold border border-orange-200">
                        {event.category}
                      </span>
                    </div>
                  )) || <p className="text-gray-600">No upcoming events available.</p>}
                </div>
              </div>
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md p-6 lg:p-10 border border-gray-100">
                <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">Latest News</h3>
                <div className="space-y-4">
                  {collegeData?.news?.map((news, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-gray-700 text-xs lg:text-base leading-relaxed">{news}</p>
                    </div>
                  )) || <p className="text-gray-600">No news available.</p>}
                </div>
                <button className="mt-6 text-blue-800 hover:text-blue-900 font-semibold flex items-center text-sm lg:text-base group" aria-label="View all news">
                  View All News
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6 lg:space-y-10">
            <div className="text-center mb-6 lg:mb-10">
              <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-sm lg:text-lg max-w-3xl mx-auto">
                Connect with us for admissions and queries
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center bg-white rounded-xl lg:rounded-2xl shadow-md p-6 lg:p-10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-blue-900">Address</h3>
                <p className="text-gray-600 text-xs lg:text-base leading-relaxed">{collegeData?.contact?.address || 'No address available'}</p>
              </div>
              <div className="text-center bg-white rounded-xl lg:rounded-2xl shadow-md p-6 lg:p-10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <Phone className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-blue-900">Phone</h3>
                <div className="text-gray-600 text-xs lg:text-base space-y-2">
                 
                    <a href={`tel:+91 73014 51776`} className="block hover:text-blue-600 transition-colors">
                      +91 74883 66702 <br /> +91 73014 51776
                    </a>
                </div>
              </div>
              <div className="text-center bg-white rounded-xl lg:rounded-2xl shadow-md p-6 lg:p-10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-blue-900">Email</h3>
                <div className="text-gray-600 text-xs lg:text-base space-y-2">
                 
                    <a href={`mailto: infocareeraashram@gmail.com`} className="block hover:text-blue-600 transition-colors">
                      infocareeraashram@gmail.com
                    </a>
                 
                </div>
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-3 lg:gap-4 mt-10 lg:mt-12">
              {collegeData?.socialMedia &&
                Object.entries(collegeData.socialMedia).map(([platform, url]) => {
                  const icons = { facebook: Facebook, twitter: Twitter, instagram: Instagram, youtube: Youtube, linkedin: Linkedin };
                  const IconComponent = icons[platform];
                  if (!IconComponent) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 ${
                        platform === 'facebook'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : platform === 'twitter'
                          ? 'bg-blue-400 hover:bg-blue-500'
                          : platform === 'instagram'
                          ? 'bg-pink-500 hover:bg-pink-600'
                          : platform === 'youtube'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-blue-700 hover:bg-blue-800'
                      }`}
                      aria-label={`Visit our ${platform} page`}
                    >
                      <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </a>
                  );
                })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 lg:h-24 lg:w-24 border-4 border-blue-200 border-t-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm lg:text-base">Loading college information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-500 text-4xl lg:text-6xl mb-4">⚠️</div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">Error Loading Data</h2>
          <p className="text-gray-600 mb-4 text-sm lg:text-base max-w-md mx-auto">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors text-sm lg:text-base font-medium shadow-md hover:shadow-lg"
            aria-label="Try again"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!collegeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">College Not Found</h2>
          <p className="text-gray-600 text-sm lg:text-base">The requested college information could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 text-white py-12 lg:py-20 lg:mt-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-2xl lg:text-4xl xl:text-5xl font-extrabold mb-4 lg:mb-6 leading-tight">
                Welcome to <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">{collegeData.name}</span>
              </h1>
              <p className="text-base lg:text-xl mb-6 lg:mb-8 text-blue-100 leading-relaxed max-w-2xl">{collegeData.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <a href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill" target="_blank" rel="noopener noreferrer">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg transition-all duration-300 flex items-center justify-center text-sm lg:text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1" aria-label="Apply for admission">
                    Apply for Admission <ChevronRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </a>
                <button className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-blue-900 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg transition-all duration-300 text-sm lg:text-lg font-medium backdrop-blur-sm" aria-label="Download Brochure">
                  Download Brochure
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl p-6 lg:p-10 shadow-xl border border-white/20">
                <h3 className="text-lg lg:text-2xl font-bold mb-4 lg:mb-6">Quick Facts</h3>
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  <div className="text-center group">
                    <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                      {collegeData.stats?.yearsOfExcellence || 0}+
                    </div>
                    <div className="text-xs lg:text-sm mt-2 text-blue-100">Years of Excellence</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                      {collegeData.stats?.totalStudents ? collegeData.stats.totalStudents.toLocaleString() : 'N/A'}
                    </div>
                    <div className="text-xs lg:text-sm mt-2 text-blue-100">Students</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                      {collegeData.stats?.facultyMembers || 0}+
                    </div>
                    <div className="text-xs lg:text-sm mt-2 text-blue-100">Faculty Members</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                      {collegeData.stats?.placementRate || 0}%
                    </div>
                    <div className="text-xs lg:text-sm mt-2 text-blue-100">Placement Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation (Desktop and Mobile) */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg shadow-md z-40 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-2 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 border-b-2 whitespace-nowrap relative ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  aria-label={`Switch to ${tab.label} tab`}
                >
                  <IconComponent className="w-4 h-4 mr-1.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6 lg:py-10 max-w-6xl">{renderTabContent()}</div>
    </div>
  );
};

export default CollegeDetail;