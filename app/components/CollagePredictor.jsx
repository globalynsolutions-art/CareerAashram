"use client";
// frontend/src/components/CollagePredictor.jsx (Use 'key' for activeTab/API params; fallback to _id; type detection from key with name fallback)
import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://careeraashram-backend.onrender.com';  // Full URL in dev

function CollagePredictor() {
  const [activeTab, setActiveTab] = useState(''); // Prefers 'key' slug like 'neet', fallback _id
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [fullExams, setFullExams] = useState([]); // Full exam objects from API
  const [currentExam, setCurrentExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (activeTab && fullExams.length > 0) {
      // Lookup full exam object by 'key' or fallback _id
      const exam = fullExams.find((e) => 
        e.key === activeTab || (e._id && e._id.toString()) === activeTab
      );
      setCurrentExam(exam || null);
    }
  }, [activeTab, fullExams]);

  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/predictor-exams`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const rawText = await response.text(); // Get raw text first for logging
      console.log('Raw API response text:', rawText); // DEBUG: Log raw response
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseErr) {
        throw new Error(`Failed to parse JSON: ${parseErr.message}. Raw response: ${rawText.substring(0, 200)}...`);
      }
      
      console.log('Parsed API response data:', data); // DEBUG: Log parsed data
      
      // Handle common response shapes: direct array, or wrapped like { exams: [...] } or { data: [...] }
      let examArray = [];
      if (Array.isArray(data)) {
        examArray = data;
      } else if (data && Array.isArray(data.exams)) {
        examArray = data.exams;
        console.log('Using nested "exams" array from response'); // DEBUG
      } else if (data && Array.isArray(data.data)) {
        examArray = data.data;
        console.log('Using nested "data" array from response'); // DEBUG
      } else {
        throw new Error(`Invalid response format: expected an array of exams (or {exams: [...] }). Got: ${typeof data} - ${JSON.stringify(data).substring(0, 200)}...`);
      }
      
      if (examArray.length === 0) {
        console.warn('Empty exams array received'); // DEBUG: Warn if empty
      }
      
      // Enhanced debugging: Log structure of first exam
      if (examArray.length > 0) {
        const firstExam = examArray[0];
        console.log('First exam structure:', {
          key: firstExam.key,
          name: firstExam.name,
          _id: firstExam._id
        });
      }
      
      console.log('Full exams loaded:', examArray.length); // DEBUG
      
      setFullExams(examArray);
      if (examArray.length > 0) {
        // Prefer 'key' for activeTab (slug), fallback _id.toString()
        const defaultKey = examArray[0].key || (examArray[0]._id ? examArray[0]._id.toString() : '');
        setActiveTab(defaultKey);
        console.log('Default activeTab set to:', defaultKey); // DEBUG
      }
    } catch (err) {
      console.error('Error fetching exams:', err); // For debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    console.log('Predict called with activeTab:', activeTab); // DEBUG: Log to check value
    
    // Validate activeTab before proceeding
    if (!activeTab) {
      setError('Please select a valid exam from the dropdown.');
      return;
    }
    if (!fullExams.find((exam) => 
      exam.key === activeTab || (exam._id && exam._id.toString()) === activeTab
    )) {
      setError('Invalid exam selected. Please refresh and try again.');
      return;
    }
    
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setError('Please enter a valid number.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/predictor-exams/${activeTab}/predict?value=${value}`);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Prediction failed: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid prediction response: expected an array of colleges');
      }
      setResults(data);
    } catch (err) {
      console.error('Error predicting colleges:', err); // For debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePredict();
    }
  };

  // Helper to determine exam type from key (preferred) or name fallback
  const getExamType = (exam) => {
    if (!exam) return 'rank';
    const key = exam.key || '';
    const name = (exam.name || '').toLowerCase();
    if (key === 'cat' || key === 'cuet' || name.includes('cat') || name.includes('cuet')) {
      return 'percentile';
    } else if (key === 'gate' || name.includes('gate')) {
      return 'score';
    }
    return 'rank';
  };

  const getPlaceholder = () => {
    const type = getExamType(currentExam);
    if (type === 'percentile') {
      return 'Enter your percentile (e.g., 95)';
    } else if (type === 'score') {
      return 'Enter your GATE score (e.g., 650)';
    }
    return 'Enter your rank (e.g., 500)';
  };

  const getMetricLabel = (college) => {
    const type = getExamType(currentExam);
    if (type === 'percentile') {
      return `Cutoff: ${college.cutoff}%ile and above`;
    } else if (type === 'score') {
      return `Cutoff Score: ${college.cutoff} or above`;
    }
    return `Closing Rank: ${college.maxRank || college.closingRank} or better`;
  };

  const getMetricLabelShort = (college) => {
    const type = getExamType(currentExam);
    if (type === 'percentile') {
      return `Cutoff: ${college.cutoff}%ile+`;
    } else if (type === 'score') {
      return `Score: ${college.cutoff}+`;
    }
    return `Rank: ${college.maxRank || college.closingRank} or better`;
  };

  if (loading && fullExams.length === 0) {
    return <div className="text-center py-10">Loading exams...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={fetchExams}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-6 sm:py-10 lg:py-12 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-10 lg:mb-12">
          <div className="inline-block p-2 sm:p-3 bg-white rounded-full shadow-xl mb-3 sm:mb-4">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" viewBox="0 0 64 64" fill="none">
              <path d="M32 8L44 16L32 24L20 16L32 8Z" fill="#0EA5E9"/>
              <path d="M20 20V36L32 44L44 36V20L32 28L20 20Z" fill="#F97316"/>
              <rect x="26" y="32" width="12" height="16" fill="white"/>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2 sm:mb-3 px-2">
            College Predictor 2025
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4 max-w-2xl mx-auto">
            Discover your college options based on your {currentExam?.name || 'exam'} performance
          </p>
        </div>

        {/* Exam Dropdown */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Select Entrance Exam:
            </label>
            <select
              value={activeTab}
              onChange={(e) => {
                const newTab = e.target.value;
                setActiveTab(newTab);
                setResults([]);
                setInputValue('');
                setError(null);
              }}
              disabled={loading || fullExams.length === 0}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg bg-white cursor-pointer disabled:opacity-50"
            >
              {fullExams.length === 0 ? (
                <option value="" disabled>
                  No exams available
                </option>
              ) : (
                fullExams.map((exam) => {
                  const examKey = exam.key || (exam._id ? exam._id.toString() : '');
                  const examName = exam.name || 'Unknown Exam';
                  return (
                    <option 
                      key={exam._id ? exam._id.toString() : Math.random()} // Unique key
                      value={examKey} // Prefer 'key' for activeTab and API calls
                    >
                      {examName}
                    </option>
                  );
                })
              )}
            </select>
          </div>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-2">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="number"
                placeholder={getPlaceholder()}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || fullExams.length === 0} // Enabled after exams load
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg disabled:opacity-50"
              />
              <button
                onClick={handlePredict}
                disabled={loading || !inputValue || fullExams.length === 0 || !activeTab}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Predicting...' : 'Predict Colleges'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 ? (
          <div className="max-w-5xl mx-auto px-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-orange-500">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">🎓</span>
                  <span>Eligible Colleges ({results.length})</span>
                </h2>
              </div>
              
              {/* Desktop/Tablet View */}
              <div className="hidden sm:block">
                <ul className="divide-y divide-gray-100">
                  {results.map((college, index) => (
                    <li
                      key={index}
                      className="px-4 sm:px-6 py-4 sm:py-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 font-semibold text-base sm:text-lg lg:text-xl">
                            {college.name || college.college} {/* Handle both 'name' (topColleges) and 'college' */}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                            {getMetricLabel(college)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile View - Card Layout */}
              <div className="sm:hidden">
                <div className="p-3 space-y-3">
                  {results.map((college, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 font-semibold text-base leading-tight">
                            {college.name || college.college}
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 text-xs text-gray-600 font-medium">
                        {getMetricLabelShort(college)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : inputValue && !loading && results.length === 0 ? (
          <div className="max-w-3xl mx-auto px-2">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-xl p-5 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📚</div>
              <p className="text-orange-800 font-medium text-base sm:text-lg">
                No colleges match this {getExamType(currentExam) === 'percentile' ? 'percentile' : getExamType(currentExam) === 'score' ? 'score' : 'rank'}. Try a different value!
              </p>
            </div>
          </div>
        ) : null}

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-10 lg:mt-12 px-2">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <p className="font-bold text-gray-800 mb-3 text-base sm:text-lg flex items-center gap-2">
              <span className="text-blue-600 text-xl sm:text-2xl">ℹ️</span> 
              <span>Important Note</span>
            </p>
            <p className="text-gray-700 text-sm sm:text-base mb-2">
              The cutoffs and ranks shown are based on 2024-2025 trends and previous year data. Actual cutoffs may vary based on difficulty level, number of applicants, and seat availability.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Please verify with official college websites and counseling authorities for the most accurate and up-to-date information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollagePredictor;