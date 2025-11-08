"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Calendar, Clock, FileText, Users, MapPin, Book, 
  CheckCircle, AlertCircle, Download, ExternalLink,
  GraduationCap, Target, Award, HelpCircle, Star,
  ChevronDown, ChevronUp, Search, Filter
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const ExamDetailsPage = () => {
  const { id } = useParams(); // Get exam id from URL
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://careeraashram-backend.onrender.com';

  // Fetch exam data from API
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching data for examId:', id);
        const response = await axios.get(`${API_BASE_URL}/api/exams/detail/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
          withCredentials: true,
        });

        console.log('API response:', response.data);

        if (!response.data.success || !response.data.data) {
          throw new Error('Invalid API response: Missing required fields');
        }

        setExamData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exam data:', error);
        setError(error.response?.status === 404 ? 'Exam not found' : `Failed to load exam data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Exam not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Exam Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{examData.examInfo.name}</h1>
              <h2 className="text-xl mb-4 text-blue-100">{examData.examInfo.fullName}</h2>
              <p className="text-blue-100 mb-4">{examData.examInfo.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {examData.examInfo.examLevel}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {examData.examInfo.examMode}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  By {examData.examInfo.conductedBy}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'dates', label: 'Important Dates', icon: Calendar },
              { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
              { id: 'pattern', label: 'Exam Pattern', icon: Target },
              { id: 'syllabus', label: 'Syllabus', icon: Book },
              { id: 'colleges', label: 'Top Colleges', icon: Award },
              { id: 'application', label: 'How to Apply', icon: FileText },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Exam Overview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Conducted By</h3>
                    <p className="text-gray-600 mb-4">{examData.examInfo.conductedBy}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Exam Mode</h3>
                    <p className="text-gray-600 mb-4">{examData.examInfo.examMode}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Exam Level</h3>
                    <p className="text-gray-600 mb-4">{examData.examInfo.examLevel}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Last Updated</h3>
                    <p className="text-gray-600 mb-4">{examData.examInfo.lastUpdated}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-3">About the Exam</h3>
                  <p className="text-gray-600 leading-relaxed">{examData.examInfo.description}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Total Questions</span>
                    <span className="font-semibold">{examData.examPattern.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{examData.examPattern.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Application Fee</span>
                    <span className="font-semibold">{examData.fees.general}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Sections</span>
                    <span className="font-semibold">{examData.examPattern.sections.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Important Dates</h2>
            <div className="space-y-4">
              {examData.keyDates.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.event}</h3>
                      <p className="text-gray-600">{item.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Eligibility Criteria</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-6">
                  <div>
                    <h3 className="flex items-center font-semibold text-gray-700 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Educational Qualification
                    </h3>
                    <p className="text-gray-600 pl-7">{examData.eligibility.qualification}</p>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center font-semibold text-gray-700 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Age Limit
                    </h3>
                    <p className="text-gray-600 pl-7">{examData.eligibility.ageLimit}</p>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center font-semibold text-gray-700 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Number of Attempts
                    </h3>
                    <p className="text-gray-600 pl-7">{examData.eligibility.attempts}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-6">
                  <div>
                    <h3 className="flex items-center font-semibold text-gray-700 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Nationality
                    </h3>
                    <p className="text-gray-600 pl-7">{examData.eligibility.nationality}</p>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center font-semibold text-gray-700 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Work Experience
                    </h3>
                    <p className="text-gray-600 pl-7">{examData.eligibility.workExperience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pattern' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Exam Pattern Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Duration</h3>
                  <p className="text-blue-600">{examData.examPattern.duration}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Questions</h3>
                  <p className="text-orange-600">{examData.examPattern.totalQuestions}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Sections</h3>
                  <p className="text-green-600">{examData.examPattern.sections.length}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Marking Scheme</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{examData.examPattern.markingScheme}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Question Types</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{examData.examPattern.questionTypes}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Section-wise Details</h3>
              <div className="space-y-6">
                {examData.examPattern.sections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 md:mb-0">{section.name}</h4>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>{section.questions} Questions</span>
                        <span>{section.time}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">Topics Covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {section.topics.map((topic, topicIndex) => (
                          <span key={topicIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Detailed Syllabus</h2>
            <div className="space-y-8">
              {Object.entries(examData.syllabus).map(([section, topics], index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Book className="w-5 h-5 mr-2 text-blue-600" />
                    {section}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'colleges' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Colleges Accepting CAT Scores</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-700">Rank</th>
                    <th className="text-left p-4 font-semibold text-gray-700">College Name</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Fees (Total)</th>
                    <th className="text-left p-4 font-semibold text-gray-700">CAT Cutoff</th>
                  </tr>
                </thead>
                <tbody>
                  {examData.topColleges.map((college, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-orange-500 mr-2" />
                          {college.ranking}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-800">{college.name}</td>
                      <td className="p-4 text-gray-600">{college.fees}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          {college.cutoff}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'application' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">How to Apply</h2>
              <div className="space-y-4">
                {examData.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-xl">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Application Fees</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">General/EWS/OBC</h4>
                  <p className="text-2xl font-bold text-blue-600">{examData.fees.general}</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">SC/ST/PWD</h4>
                  <p className="text-2xl font-bold text-orange-600">{examData.fees.scStPwd}</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-3">Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {examData.fees.paymentModes.map((mode, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {examData.faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-800 pr-4">{faq.question}</h3>
                    {expandedFaq === index ? 
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    }
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDetailsPage;