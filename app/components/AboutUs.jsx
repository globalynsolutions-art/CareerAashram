"use client";
import React, { useState } from 'react';
import { Star, BookOpen, Users, Award, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import Footer from './footer';
import Link from 'next/link';

export default function AboutUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "What courses does Career Aashram offer?",
      answer: "We offer comprehensive courses in various fields including technology, business, healthcare, and creative arts. Our curriculum is designed to meet industry standards and prepare students for successful careers."
    },
    {
      question: "Are the courses certified?",
      answer: "Yes, all our courses come with industry-recognized certifications. We partner with leading organizations to ensure our certifications hold value in the job market."
    },
    {
      question: "What is the duration of courses?",
      answer: "Course duration varies from 3 months to 2 years depending on the program. We offer both intensive bootcamps and comprehensive degree programs."
    },
    {
      question: "Do you provide job placement assistance?",
      answer: "Absolutely! We have a dedicated placement cell with partnerships across 500+ companies. Our job placement rate is over 90% for all programs."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
    
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-blue-700 mb-6 leading-tight">
                Shape Your Future with 
                <span className="text-orange-500 block">Career Aashram</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empower yourself with industry-leading courses and expert guidance. 
                Join thousands of successful professionals who started their journey with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
               <Link href={"/contact"}> <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button></Link>
               <Link href={"/AllCourse"}> <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all">
                  View Courses
                </button></Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-orange-400 fill-current" />
                  <Star className="w-6 h-6 text-orange-400 fill-current" />
                  <Star className="w-6 h-6 text-orange-400 fill-current" />
                  <Star className="w-6 h-6 text-orange-400 fill-current" />
                  <Star className="w-6 h-6 text-orange-400 fill-current" />
                </div>
                <h3 className="text-2xl font-bold mb-2">95% Success Rate</h3>
                <p className="text-blue-100">Our students achieve their career goals with our comprehensive training programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">Why Choose Career Aashram?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive career development solutions tailored to your professional growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:shadow-xl">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Expert-Led Courses</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with years of real-world experience in their respective fields.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:shadow-xl">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Community Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a vibrant community of learners and professionals who support each other's growth.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:shadow-xl">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Certified Programs</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn industry-recognized certifications that boost your credibility and career prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="group hover:transform hover:scale-110 transition-all">
              <div className="text-4xl font-bold text-orange-400 mb-2">10,000+</div>
              <div className="text-blue-100">Students Trained</div>
            </div>
            <div className="group hover:transform hover:scale-110 transition-all">
              <div className="text-4xl font-bold text-orange-400 mb-2">95%</div>
              <div className="text-blue-100">Job Placement Rate</div>
            </div>
            <div className="group hover:transform hover:scale-110 transition-all">
              <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-blue-100">Expert Instructors</div>
            </div>
            <div className="group hover:transform hover:scale-110 transition-all">
              <div className="text-4xl font-bold text-orange-400 mb-2">500+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about our programs</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-between items-center"
                >
                  <span className="text-lg font-semibold text-blue-700">{faq.question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-orange-500 transition-transform ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {activeAccordion === index && (
                  <div className="bg-white px-6 pb-6 rounded-b-lg shadow-md">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful professionals who chose Career Aashram for their career advancement
          </p>
          <button className="bg-white text-orange-600 px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </section>
    </div>
  );
}