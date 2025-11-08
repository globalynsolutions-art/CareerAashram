"use client";
import React, { useState, useEffect, useRef } from 'react';
import indor from "../assets/cityCarousel/pune.svg";
import nagpur from "../assets/cityCarousel/Nagpur.svg";
import kolkata from "../assets/cityCarousel/kolkata.svg";
import mumbai from "../assets/cityCarousel/mumbai.svg";
import bangalore from "../assets/cityCarousel/bangalore.svg";
import chennai from "../assets/cityCarousel/chennai.svg";
import hyderabad from "../assets/cityCarousel/hyderabad.svg";
import delhi from "../assets/cityCarousel/delhi.svg";
import Link from 'next/link';
import Image from 'next/image';


function CityCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const baseCities = [
    { name: 'Indore', image: indor, id: 'indore' },
    { name: 'Nagpur', image: nagpur, id: 'nagpur' },
    { name: 'Kolkata', image: kolkata, id: 'kolkata' },
    { name: 'Mumbai', image: mumbai, id: 'mumbai' },
    { name: 'Bangalore', image: bangalore, id: 'bangalore' },
    { name: 'Chennai', image: chennai, id: 'chennai' },
    { name: 'Hyderabad', image: hyderabad, id: 'hyderabad' },
    { name: 'Delhi NCR', image: delhi, id: 'delhi' },
  ];

  // Duplicate cities for seamless looping
  const cities = [...baseCities, ...baseCities];
  const totalSlides = baseCities.length; // Number of unique slides (8)
  const carouselRef = useRef(null);

  // Get visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 6; // xl screens
      if (window.innerWidth >= 1024) return 5; // lg screens
      if (window.innerWidth >= 768) return 3; // md screens
      if (window.innerWidth >= 640) return 2; // sm screens
      return 1; // mobile
    }
    return 6; // default for SSR
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
      setCurrentSlide(0); // Reset to start on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev + 1 >= totalSlides) {
          return 0; // Loop back to first slide
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Handle transition end for infinite loop
  const handleTransitionEnd = () => {
    if (currentSlide >= totalSlides) {
      setIsTransitioning(false);
      setCurrentSlide(0); // Reset to first slide
    } else if (currentSlide < 0) {
      setIsTransitioning(false);
      setCurrentSlide(totalSlides - 1); // Reset to last slide
    } else {
      setIsTransitioning(true);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // Small delay for smooth reset
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev + 1 >= totalSlides) {
        return 0; // Loop to first slide
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev - 1 < 0) {
        return totalSlides - 1; // Loop to last slide
      }
      return prev - 1;
    });
  };

  // Calculate card width based on visible cards
  const cardWidth = 100 / visibleCards;

  return (
    <div className="relative w-full py-4 bg-gray-100">
      <h2 className="text-center text-red-600 text-lg font-semibold mb-4">Top Study Cities</h2>
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex w-full"
          style={{
            transform: `translateX(-${currentSlide * cardWidth}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {cities.map((city, index) => (
            <Link href={`/colleges/city/${city.id}`} key={index} className="flex-shrink-0" style={{ width: `${cardWidth}%` }}>
              <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200 h-full flex flex-col justify-between mx-1">
                <div className="flex justify-center items-center mb-3">
                  <Image 
                  src={city.image}
                    alt={city.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded"
                  />
                </div>
                <p className="text-blue-600 font-medium text-sm sm:text-base mt-auto">{city.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-colors z-10 cursor-pointer"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-colors z-10 cursor-pointer"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === i ? 'bg-red-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CityCarousel;