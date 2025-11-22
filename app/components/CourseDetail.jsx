"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Clock, TrendingUp, MapPin, Star, Share2, Heart,HelpCircle,
  ChevronRight, ChevronDown, Calendar, BookOpen, Users,
  Award, Building, Phone,
  CheckCircle,  ArrowRight, ExternalLink,
  Bookmark, BarChart3, GraduationCap, Target,
  Briefcase, MessageCircle
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const CourseDetailPage = ({ params }) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const { id } = useParams();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://careeraashram-backend.onrender.com';

  // Fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

     
        const response = await axios.get(`${API_BASE_URL}/api/courses/detail/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10-second timeout
        });

        

        // Validate response data
        if (!response.data || !response.data.title || !response.data.description) {
          throw new Error('Invalid API response: Missing required fields');
        }

        setCourseData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError(error.response?.status === 404 ? 'Course not found' : `Failed to load course data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
  },[]);

  // Log courseData when it updates
  useEffect(() => {
    if (courseData) {
      
    }
  }, [courseData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600">The requested course information could not be found.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'admission', label: 'Admission', icon: Calendar },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'colleges', label: 'Colleges', icon: Building },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const CourseHeader = () => (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-700 rounded-full -translate-y-36 translate-x-36 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-700 rounded-full translate-y-32 -translate-x-32 opacity-20"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center space-x-2 text-blue-200 text-sm mb-4">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-white cursor-pointer transition-colors">Courses</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">{courseData.shortName || 'N/A'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {courseData.category || 'N/A'}
              </span>
              <div className="flex items-center ml-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{courseData.rating || 'N/A'}</span>
                <span className="text-blue-200 ml-2">({courseData.totalReviews || 0} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {courseData.title || 'N/A'}
            </h1>
            
            <p className="text-blue-100 text-lg mb-6 leading-relaxed max-w-3xl">
              {courseData.description || 'No description available.'}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/15 transition-all duration-300">
                <Clock className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <div className="text-sm text-blue-200">Duration</div>
                <div className="font-semibold text-white">{courseData.duration || 'N/A'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/15 transition-all duration-300">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <div className="text-sm text-blue-200">Avg Fees</div>
                <div className="font-semibold text-white">{courseData.averageFees || 'N/A'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/15 transition-all duration-300">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <div className="text-sm text-blue-200">Type</div>
                <div className="font-semibold text-white">{courseData.type || 'N/A'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/15 transition-all duration-300">
                <GraduationCap className="w-6 h-6 mx-auto mb-2 text-orange-300" />
                <div className="text-sm text-blue-200">Degree</div>
                <div className="font-semibold text-white">{courseData.degree || "Bachelor's"}</div>
              </div>
            </div>

            {/* Dynamic Specialization Box with Increased Width */}
            {(courseData.curriculum?.semesters || [])
              .flatMap(semester => semester.subjects || [])
              .filter(subject => subject.includes('Elective'))
              .length > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 w-72 inline-block mr-4">
                <span className="text-sm font-medium text-orange-200">Specializations</span>
                <div className="text-xs text-blue-100 mt-2">
                  {(courseData.curriculum?.semesters || [])
                    .flatMap(semester => semester.subjects || [])
                    .filter(subject => subject.includes('Elective'))
                    .slice(0, 3) // Show up to 3 specializations
                    .map((specialization, index) => (
                      <div key={index} className="mb-1">{specialization.replace('Elective-', 'Specialization in ')}</div>
                    ))}
                  {((courseData.curriculum?.semesters || [])
                    .flatMap(semester => semester.subjects || [])
                    .filter(subject => subject.includes('Elective')).length > 3) && (
                    <div className="text-blue-300 text-xs mt-1">+{((courseData.curriculum?.semesters || [])
                      .flatMap(semester => semester.subjects || [])
                      .filter(subject => subject.includes('Elective')).length - 3)} more</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sticky top-8 border border-white/10 shadow-xl">
              <div className="space-y-4">
               <a href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill " target="_blank" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center group ">  <button className='w-full' >
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                </button> </a>
                
          <Link href={`/colleges/${id}`}>  <button className='items-center justify-center w-full bg-white/20 hover:bg-white/30 text-white py-3 mb-4 px-6 rounded-xl font-semibold transition-all duration-300 flex  group border border-white/10'>
                  <GraduationCap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Prefer Colleges
                </button></Link>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group border ${
                      isFavorite 
                        ? 'bg-red-500/20 text-red-400 border-red-400/30 hover:bg-red-500/spun30' 
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''} group-hover:scale-110 transition-transform`} />
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group border border-white/10">
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group border border-white/10">
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-semibold text-white mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-orange-300">{courseData.stats?.placementRate || 'N/A'}</div>
                    <div className="text-xs text-blue-200">Placement Rate</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-orange-300">{courseData.stats?.averagePackage || 'N/A'}</div>
                    <div className="text-xs text-blue-200">Avg Package</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-orange-300">{courseData.stats?.highestPackage || 'N/A'}</div>
                    <div className="text-xs text-blue-200">Highest Package</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-orange-300">{courseData.stats?.companies || 'N/A'}</div>
                    <div className="text-xs text-blue-200">Companies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TabNavigation = () => (
    <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-6 border-b-2 whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                    : 'border-transparent text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-orange-500" />
          Course Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(courseData.highlights || []).map((highlight, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-gray-700 font-medium">{highlight}</span>
              </div>
            </div>
          ))}
          {(!courseData.highlights || courseData.highlights.length === 0) && (
            <p className="text-gray-600">No highlights available.</p>
          )}
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Award className="w-6 h-6 mr-2 text-orange-500" />
          Eligibility Criteria
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-5 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
              Educational Qualification
            </h4>
            <p className="text-gray-600">{courseData.eligibility?.qualification || 'N/A'}</p>
          </div>
          <div className="bg-green-50 p-5 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
              Minimum Marks
            </h4>
            <p className="text-gray-600">{courseData.eligibility?.minimumMarks || 'N/A'}</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
              Required Subjects
            </h4>
            <p className="text-gray-600">{courseData.eligibility?.subjects?.join(', ') || 'N/A'}</p>
          </div>
          <div className="bg-orange-50 p-5 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-500" />
              Age Limit
            </h4>
            <p className="text-gray-600">{courseData.eligibility?.ageLimit || 'N/A'}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-orange-500" />
          Career Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(courseData.careerOpportunities || []).map((opportunity, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1">
              <h4 className="font-semibold text-gray-800 text-lg mb-2">{opportunity.role || 'N/A'}</h4>
              <p className="text-orange-600 font-semibold mb-3 text-lg">{opportunity.avgSalary || 'N/A'}</p>
              <div className="flex items-center text-sm text-gray-600">
                <Building className="w-4 h-4 mr-1" />
                <span>Top Companies: {opportunity.companies || 'N/A'}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  View Career Path
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
          {(!courseData.careerOpportunities || courseData.careerOpportunities.length === 0) && (
            <p className="text-gray-600">No career opportunities available.</p>
          )}
        </div>
      </section>
    </div>
  );

  const AdmissionTab = () => (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Admission Process</h3>
        <div className="relative">
          {(courseData.admissionProcess || []).map((step, index) => (
            <div key={index} className="flex items-start mb-8 last:mb-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-6 flex-shrink-0 shadow-lg ${
                step.status === 'active' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 animate-pulse' 
                  : 'bg-gray-400'
              }`}>
                {step.step}
              </div>
              <div className="flex-1 bg-gray-50 p-5 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{step.title || 'N/A'}</h4>
                <p className="text-gray-600">{step.description || 'No description available.'}</p>
                {step.status === 'active' && (
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Currently Active
                  </div>
                )}
              </div>
              {index < (courseData.admissionProcess?.length || 0) - 1 && (
                <div className="absolute left-6 mt-12 w-0.5 h-8 bg-gray-300"></div>
              )}
            </div>
          ))}
          {(!courseData.admissionProcess || courseData.admissionProcess.length === 0) && (
            <p className="text-gray-600">No admission process steps available.</p>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Important Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(courseData.admissionProcess?.importantDates || []).map((date, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{date.label || 'N/A'}</div>
                  <div className="text-gray-600">{date.date || 'N/A'}</div>
                </div>
              </div>
            </div>
          ))}
          {(!courseData.admissionProcess || !courseData.admissionProcess.importantDates || courseData.admissionProcess.importantDates.length === 0) && (
            <p className="text-gray-600">No important dates available.</p>
          )}
        </div>
      </section>
    </div>
  );

  const CurriculumTab = () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Curriculum Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(courseData.curriculum?.semesters || []).map((semester, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-blue-600">Semester {semester.semester || 'N/A'}</h4>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {semester.credits || 'N/A'} Credits
                </span>
              </div>
              <div className="space-y-3 mb-4">
                {(semester.subjects || []).map((subject, subIndex) => (
                  <div key={subIndex} className="flex items-center p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <BookOpen className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-gray-700 text-sm">{subject || 'N/A'}</span>
                  </div>
                ))}
                {(!semester.subjects || semester.subjects.length === 0) && (
                  <p className="text-gray-600 text-sm">No subjects available.</p>
                )}
              </div>
              <div className="border-t pt-4">
                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center">
                  View Detailed Syllabus
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
          {(!courseData.curriculum || !courseData.curriculum.semesters || courseData.curriculum.semesters.length === 0) && (
            <p className="text-gray-600">No curriculum data available.</p>
          )}
        </div>
      </section>
    </div>
  );

  const CollegesTab = () => (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Top Colleges Offering {courseData.shortName || 'N/A'}</h3>
          <div className="flex space-x-3">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                List
              </button>
            </div>
            
          </div>
        </div>
        
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}`}>
          {(courseData.topColleges || []).map((college, index) => (
            <div key={index} className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ${
              viewMode === 'grid' ? 'p-5' : 'p-6'
            }`}>
              <div className={`${viewMode === 'grid' ? 'flex flex-col' : 'flex flex-col md:flex-row md:items-start'}`}>
                {viewMode === 'grid' && (
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={college.image || 'https://via.placeholder.com/150'} 
                      alt={college.name || 'College'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className={`${viewMode === 'list' ? 'md:ml-4 md:flex-1' : ''}`}>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{college.name || 'N/A'}</h4>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{college.location || 'N/A'}</span>
                  </div>
                  
                  {viewMode === 'list' && (
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-600 mr-4">Est. {college.established || 'N/A'}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{college.type || 'N/A'}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-lg font-bold text-orange-600 mr-2">{college.rating || 'N/A'}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(college.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{college.fees || 'N/A'}</div>
                      <div className="text-xs text-gray-600">Total Fees</div>
                    </div>
                  </div>
                  
                  {viewMode === 'grid' && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Est. {college.established || 'N/A'}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{college.type || 'N/A'}</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-orange-600 font-semibold mb-4">Cutoff: {college.cutoff || 'N/A'}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <a href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill " target="_blank">   <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                  Apply Now
                </button> </a>
            <Link href={`/CollageDetail/${college.id}`}><button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                  View Details
                </button></Link>
                {viewMode === 'list' && (
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                    Compare
                  </button>
                )}
              </div>
            </div>
          ))}
          {(!courseData.topColleges || courseData.topColleges.length === 0) && (
            <p className="text-gray-600">No colleges available.</p>
          )}
        </div>
      </section>
    </div>
  );

  const CareersTab = () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Career Path & Opportunities</h3>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Career Growth Path</h4>
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              {(courseData.careerPath || []).map((role, index) => (
                <div key={index} className="flex flex-col items-center mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mb-2">
                    {index + 1}
                  </div>
                  <div className="text-sm font-medium text-gray-700 text-center">{role.title || 'N/A'}</div>
                  <div className="text-xs text-gray-500 mt-1">{role.duration || 'N/A'}</div>
                </div>
              ))}
              {(!courseData.careerPath || courseData.careerPath.length === 0) && (
                <p className="text-gray-600">No career path data available.</p>
              )}
            </div>
            {courseData.careerPath && courseData.careerPath.length > 0 && (
              <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 -z-10"></div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Salary Comparison</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h5 className="font-semibold text-gray-800 mb-3">By Experience Level</h5>
              <div className="space-y-3">
                {(courseData.salaryByExperience || []).map((level, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{level.experience || 'N/A'}</span>
                    <span className="font-semibold text-orange-600">{level.salary || 'N/A'}</span>
                  </div>
                ))}
                {(!courseData.salaryByExperience || courseData.salaryByExperience.length === 0) && (
                  <p className="text-gray-600">No salary data available.</p>
                )}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h5 className="font-semibold text-gray-800 mb-3">By Company Type</h5>
              <div className="space-y-3">
                {(courseData.salaryByCompanyType || []).map((type, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{type.companyType || 'N/A'}</span>
                    <span className="font-semibold text-orange-600">{type.salary || 'N/A'}</span>
                  </div>
                ))}
                {(!courseData.salaryByCompanyType || courseData.salaryByCompanyType.length === 0) && (
                  <p className="text-gray-600">No salary data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Skills in Demand</h4>
          <div className="flex flex-wrap gap-3">
            {(courseData.skillsInDemand || []).map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
            {(!courseData.skillsInDemand || courseData.skillsInDemand.length === 0) && (
              <p className="text-gray-600">No skills data available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );

  const FAQTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
      
      <div className="space-y-4">
        {(courseData.faqs || []).map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-semibold text-gray-800 text-lg">{faq.question || 'N/A'}</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                expandedFAQ === index ? 'rotate-180' : ''
              }`} />
            </button>
            {expandedFAQ === index && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <p className="text-gray-600 pt-4 leading-relaxed">{faq.answer || 'No answer available.'}</p>
                <button className="mt-4 text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Still have questions? Contact us
                </button>
              </div>
            )}
          </div>
        ))}
        {(!courseData.faqs || courseData.faqs.length === 0) && (
          <p className="text-gray-600">No FAQs available.</p>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mt-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Still have questions?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <textarea 
              placeholder="Your Question"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
              Submit Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RelatedCourses = () => (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Related Courses You Might Like</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore similar courses that match your interests and career goals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(courseData.relatedCourses || []).map((course, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                <img 
                  src={course.image || 'https://via.placeholder.com/150'} 
                  alt={course.name || 'Course'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                {course.name || 'N/A'}
              </h4>
              <p className="text-gray-600 mb-4">Duration: {course.duration || 'N/A'}</p>
          <Link href={`/CourseDetail/${course.id}`}>   <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5">
                Explore Course
              </button></Link> 
            </div>
          ))}
          {(!courseData.relatedCourses || courseData.relatedCourses.length === 0) && (
            <p className="text-gray-600">No related courses available.</p>
          )}
        </div>
      </div>
    </section>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'admission': return <AdmissionTab />;
      case 'curriculum': return <CurriculumTab />;
      case 'colleges': return <CollegesTab />;
      case 'careers': return <CareersTab />;
      case 'faq': return <FAQTab />;
      default: return <OverviewTab />;
    }
  };

  return (
   
    <div className="min-h-screen bg-gray-50">
      <CourseHeader />
      <TabNavigation />
      
      <main className="container mx-auto px-4 py-8">
        {renderActiveTab()}
      </main>
      
      <RelatedCourses />
      
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of students who have already started their career in business management with our comprehensive {courseData.shortName || 'N/A'} program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://docs.google.com/forms/d/1k3tEDrVKJ5z3DVbISUodAHhYntYM9oNyEByEYxS2As4/prefill " target="_blank"><button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
              Apply Now
            </button> </a>
            <button className="border border-white/20 hover:bg-white/10 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300">
              <GraduationCap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
               Prefer Colleges
            </button>
           <a href="tel:917301451776"> <button className="border border-white/20 hover:bg-white/10 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300">
              <Phone className="w-5 h-5 inline mr-2" />
              Talk to Counselor
            </button></a>
          </div>
        </div>
      </div>
    </div>
 
  );
};

export default CourseDetailPage;