"use client";
import React, { useState, useRef  } from 'react';
import { Search, Edit3, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Star, Send, Users, Building, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  
  const [newsletterData, setNewsletterData] = useState({
    email: '',
    mobile: '',
    course: ''
  });

  const [activeTab, setActiveTab] = useState('student');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNewsletterChange = (e) => {
    setNewsletterData({
      ...newsletterData,
      [e.target.name]: e.target.value
    });
  };

   const sendEmail = (e) => {
    e.preventDefault();


    emailjs
      .sendForm('service_cnvsgtb', 'template_lzsi8gt', form.current, {
        publicKey: 'eDvA1odo4wkmqxalZ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
           if (!formData.name || !formData.email || !formData.mobile) {
      alert('Please fill in all required fields');
      return;
    }
  
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: ''
    });
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: ''
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterData.email || !newsletterData.mobile) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Newsletter submitted:', newsletterData);
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterData({
      email: '',
      mobile: '',
      course: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Let's Have a Cup of Tea <span className="text-orange-400">Together</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Have a question? Need some help? Or just want to say hello?
            </p>
            <div className="flex justify-center space-x-8 text-white">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-orange-400" />
                <span className="font-semibold">Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-orange-400" />
                <span className="font-semibold">Proven Results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="h-6 w-6 text-orange-400" />
                <span className="font-semibold">Prime Location</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-2 rounded-xl shadow-inner">
                <button 
                  onClick={() => setActiveTab('student')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'student' 
                      ? 'bg-white text-blue-800 shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-blue-800'
                  }`}
                >
                  <Users className="h-5 w-5 inline-block mr-2" />
                  Student
                </button>
                <button 
                  onClick={() => setActiveTab('consultancy')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'consultancy' 
                      ? 'bg-white text-blue-800 shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-blue-800'
                  }`}
                >
                  <Building className="h-5 w-5 inline-block mr-2" />
                  Consultancy
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-10 border-t-4 border-orange-400">
              <div className="text-center mb-8">
                <Send className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Send Your Inquiry
                </h2>
                <p className="text-gray-600">
                  {activeTab === 'consultancy' ? 'Business Consultancy Services' : 'Student Support & Guidance'}
                </p>
              </div>
              
              <form className="space-y-6" ref={form}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 resize-vertical"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={sendEmail}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Our Campus</h2>
            <p className="text-xl text-gray-600">Come and experience our world-class facilities</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Enhanced Map */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-2 border-t-4 border-blue-600">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1178.7162172950063!2d88.43251003840861!3d22.57559846409922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57e07b2ded57%3A0xa8423bf4d5eac00d!2sCareer%20Aashram!5e1!3m2!1sen!2sin!4v1756192898840!5m2!1sen!2sin" 
                  width="100%" 
                  height="400" 
                  style={{border:0, borderRadius: '12px'}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
                
                {/* Map Overlay Info */}
                <div className="absolute top-6 left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    <span className="font-bold text-gray-800">Career Aashram</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-700 mr-2">5.0</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">(29 reviews)</span>
                  </div>
                  <p className="text-blue-600 text-sm font-medium hover:text-blue-800 cursor-pointer">
                    View larger map →
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-orange-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="h-7 w-7 text-orange-500 mr-3" />
                  Our Location
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Xplore Imperia, Dn-21, Salt Lake, 702, DN Block, Sector V, Salt Lake, Kolkata, West Bengal 700091
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">Email Us</h4>
                  </div>
                  <a 
                    href="mailto:infocareeraashram@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    infocareeraashram@gmail.com
                  </a>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">Call Us</h4>
                  </div>
                  <a 
                    href="tel:+917301451776" 
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  >
                    +91-73014 51776
                  </a> <br />
                  <a 
                    href="tel:+917488366702" 
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  >
                     +91-74883 66702
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-full mr-3">
                    <span className="text-white text-xs">🌐</span>
                  </div>
                  Connect With Us
                </h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/careeraashram/" target='_blank' 
                    className="group bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-all duration-300 hover:scale-110"
                  >
                    <Facebook className="h-7 w-7 text-blue-600 group-hover:text-blue-800 transition-colors" />
                  </a>
                  <a 
                    href="https://www.instagram.com/careeraashram_/?hl=en" 
                    className="group bg-pink-50 p-4 rounded-xl hover:bg-pink-100 transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="h-7 w-7 text-pink-600 group-hover:text-pink-800 transition-colors" />
                  </a>
                  <a 
                    href="#" 
                    className="group bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="h-7 w-7 text-blue-400 group-hover:text-blue-600 transition-colors" />
                  </a>
                  <a 
                    href="https://www.youtube.com/channel/UCOJJhjrAtZKKL_Uxk_Yw1Sw" 
                    className="group bg-red-50 p-4 rounded-xl hover:bg-red-100 transition-all duration-300 hover:scale-110"
                  >
                    <Youtube className="h-7 w-7 text-red-600 group-hover:text-red-800 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}

    </div>
  );
}