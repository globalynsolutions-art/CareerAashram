"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import srm from "../assets/img/srm.jpeg"
import techno from "../assets/img/techno.jpg";
import iem from "../assets/img/IEM.png";
import haretage from "../assets/img/heritage.jpg";
import kiit from "../assets/img/KIIT.jpg";
import msit from "../assets/img/MSIT.jpg";
import niot from "../assets/img/gnoit.jpg";
import vit from "../assets/img/VIT.jpeg";
import iilm from "../assets/img/iilm.webp";
import snu from "../assets/img/snu.jpg";
import woxsen from "../assets/img/woxsen.jpg";
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
     
    {
      image: srm,
      text: 'Explore Over 8+ in India',
      alt: 'SRM'
    },
    {
      image: techno,
      text: 'Discover Top Universities',
      alt: 'techno'
    },
    {
      image: iem,
      text: 'Explore Over 8+ in India',
      alt: 'IEM'
    },
    {
      image: haretage,
      text: 'Discover Top Universities',
      alt: 'Hereage'
    },
      {
      image: kiit,
      text: 'Discover Top Universities',
      alt: 'KIIT'
    },
    
    {
      image: msit,
      text: 'Explore Over 8+ in India',
      alt: 'msit'
    },
     {
      image: niot,
      text: 'Explore Over 8+ in India',
      alt: 'SRM'
    },
    
     {
      image: vit,
      text: 'Discover Top Universities',
      alt: 'SNU Campus 2'
    },

     {
      image: iilm,
      text: 'Discover Top Universities',
      alt: 'SNU Campus 2'
    },

    {
      image: snu,
      text: 'Discover Top Universities',
      alt: 'SNU Campus 2'
    },
    {
      image: woxsen,
      text: 'Discover Top Universities',
      alt: 'SNU Campus 2'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
          <div className="relative w-full h-96">
            <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-fill"
              />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
          </div>
            
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
             
              <p className="text-xl font-bold bg-black bg-opacity-50 p-2 rounded">{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;