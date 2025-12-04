"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Import your images
import indor from "../assets/cityCarousel/pune.svg";
import nagpur from "../assets/cityCarousel/Nagpur.svg";
import kolkata from "../assets/cityCarousel/kolkata.svg";
import mumbai from "../assets/cityCarousel/mumbai.svg";
import bangalore from "../assets/cityCarousel/bangalore.svg";
import chennai from "../assets/cityCarousel/chennai.svg";
import hyderabad from "../assets/cityCarousel/hyderabad.svg";
import delhi from "../assets/cityCarousel/delhi.svg";

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

export default function CityCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1); // Start safe
  const [isClient, setIsClient] = useState(false);

  const cities = [...baseCities, ...baseCities]; // for seamless loop

  // Only run on client
  useEffect(() => {
    setIsClient(true);

    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleCards(6);
      else if (width >= 1024) setVisibleCards(5);
      else if (width >= 768) setVisibleCards(3);
      else if (width >= 640) setVisibleCards(2);
      else setVisibleCards(1);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % baseCities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cardWidth = isClient ? 100 / visibleCards : 100; // 100% on server

  return (
    <div className="relative w-full py-8 bg-gray-100">
      <h2 className="text-center text-red-600 text-lg font-semibold mb-6">Top Study Cities</h2>

      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * cardWidth}%)`,
          }}
        >
          {cities.map((city, index) => (
            <div
              key={`${city.id}-${index}`}
              className="flex-shrink-0 px-2"
              style={{ width: `${cardWidth}%` }}
            >
              <Link href={`/colleges/city/${city.id}`} className="block">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center border border-gray-200 h-full flex flex-col justify-center">
                <Image
                  src={city.image}
                  alt={city.name}
                  width={80}
                  height={80}
                  className="mx-auto mb-3 object-contain"
                />
                <p className="text-blue-700 font-semibold text-lg">{city.name}</p>
              </div>
            </Link>
          </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {baseCities.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSlide ? 'bg-red-600 w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}