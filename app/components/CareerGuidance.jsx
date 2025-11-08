"use client";
import React from 'react';
import { Phone, Mail, MapPin, Clock, Home, User } from 'lucide-react';

const CareerGuidance = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1 flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Talk to Our Experts
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Get Personalized Guidance From Industry Experts To Help You
                <br />
                Choose The Right Course And Career Path.
              </p>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col space-y-4">
              {/* New Student */}
              <div className="flex items-center space-x-4 bg-white p-4 rounded-full shadow-sm border border-gray-200">
                <div className="bg-blue-900 p-2 rounded-full">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Counsellor: +91-74883 66702 / +91-73014 51776</span>
              </div>

        

        
              {/* Email */}
              <div className="flex items-center space-x-4 bg-white p-4 rounded-full shadow-sm border border-gray-200">
                <div className="bg-blue-900 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Email : infocareeraashram@gmail.com</span>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-4 bg-white p-4 rounded-full shadow-sm border border-gray-200">
                <div className="bg-blue-900 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Address : Xplore Imperia, Dn-21, Salt Lake, 702, DN Block, Sector V, Salt Lake, Kolkata, West Bengal 700091</span>
              </div>

              {/* Visit Hours */}
              <div className="flex items-center space-x-4 bg-white p-4 rounded-full shadow-sm border border-gray-200">
                <div className="bg-blue-900 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Visit Us : (10 AM To 7 PM)</span>
              </div>

              {/* Home Visit */}
              {/* <div className="flex items-center space-x-4 bg-white p-4 rounded-full shadow-sm border border-gray-200">
                <div className="bg-blue-900 p-2 rounded-full">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Book : Home Visit</span>
              </div> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl p-8 shadow-lg w-full max-w-md">
              <div className="flex justify-center mb-6">
                <div className="w-64 h-64 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center">
                  <User className="w-24 h-24 text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-gray-900">Professional Expert</h3>
                <p className="text-gray-600 mt-2">Ready to guide your educational journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGuidance;