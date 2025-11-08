"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Md Faizan Ali",
      text: "Very helpful and trustworthy education counsellors. They guided me step by step in choosing the right course and college. Great service for students.",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Kumar Anik Barnwal",
      text: "Handle Career Consultancy provides exceptional guidance with a professional approach. Their team offers personalized career advice, clear strategies, and practical insights that help individuals make informed decisions. With strong expertise and commitment, they ensure clients feel confident in their career paths. Highly recommended for anyone seeking reliable career consultancy services",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Shubham Chaudhury",
      text: "Career Aashram is an excellent education consultant. The team is very professional, supportive, and always ready to guide with clear information. They provide genuine advice, transparent processes, and really focus on what’s best for the student. I truly appreciate their dedication and would strongly recommend them to anyone looking for reliable career guidance.",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "Drishti Agrawal",
      text: "I got Admission in Techno Main by the help of Career Aashram they guide me well and i got admission by my Rank with the better counseling by them. I always give reference toh them those wants to do counselling.",
      avatar: "/api/placeholder/80/80"
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate avatar positions for the circular layout
  const getAvatarPosition = (index) => {
    const totalAvatars = 8; // Total number of avatar positions around the circle
    const angle = (360 / totalAvatars) * index;
    const radius = 280; // Distance from center
    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
    
    return {
      transform: `translate(${x}px, ${y}px)`,
      opacity: index < testimonials.length ? 1 : 0.3
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Quote className="text-red-500 text-6xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            But Don't Take Our Word For It,
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
            Hear Form Our Students
          </h3>
        </div>

        {/* Main Slider Container */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Avatar Circle */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden lg:overflow-visible">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110"
                style={getAvatarPosition(index)}
                onClick={() => index < testimonials.length && setCurrentSlide(index)}
              >
                <img
                  src={testimonials[index % testimonials.length]?.avatar || "/api/placeholder/80/80"}
                  alt={`Student ${index + 1}`}
                  className="w-full h-full object-cover bg-gradient-to-br from-blue-400 to-purple-500"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Central Testimonial Card */}
          <div className="w-full max-w-2xl mx-auto px-8">
            <div 
              className={`bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl transition-all duration-500 transform ${
                isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
              }`}
            >
              <div className="text-lg md:text-xl leading-relaxed mb-8 font-light">
                "{testimonials[currentSlide].text}"
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20 mr-4">
                  <img
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].name}
                    className="w-full h-full object-cover bg-gradient-to-br from-blue-400 to-purple-500"
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold">
                    {testimonials[currentSlide].name}
                  </h4>
                  <p className="text-blue-200 text-sm">Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / testimonials.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;