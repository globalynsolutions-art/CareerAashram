"use client";
import React, { useState } from 'react';
import { 
  Facebook, Instagram, Twitter, Youtube, ChevronRight, Mail, Phone, MapPin, 
  Award, Users, BookOpen, TrendingUp, Star, Send, ArrowRight, Shield,
  Clock, Globe, HeadphonesIcon
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [hoveredSection, setHoveredSection] = useState(null);

  const footerSections = [
    {
      title: "Top Courses",
      icon: BookOpen,
      links: [
        { name: "MBA", to: "/CourseDetail/mba", popular: true, students: "25K+" },
        { name: "B.Tech/B.E", to: "/CourseDetail/btech", popular: true, students: "50K+" },
        { name: "MCA", to: "/CourseDetail/mca", students: "15K+" },
        { name: "BCA", to: "/CourseDetail/bca", students: "20K+" },
        { name: "M.Tech", to: "/CourseDetail/mtech", students: "12K+" },
        { name: "MA", to: "/CourseDetail/ma", students: "18K+" },
        { name: "BA", to: "/CourseDetail/ba", students: "30K+" }
      ]
    },
    {
      title: "Top Exams",
      icon: Award,
      links: [
        { name: "CAT", to: "/examDetail/cat", popular: true, difficulty: "High" },
        { name: "GATE", to: "/examDetail/gate", popular: true, difficulty: "High" },
        { name: "JEE-Main", to: "/examDetail/jee-main", popular: true, difficulty: "High" },
        { name: "NEET", to: "/examDetail/neet-ug", popular: true, difficulty: "High" },
        { name: "XAT", to: "/examDetail/xat", difficulty: "Medium" },
        { name: "CLAT", to: "/examDetail/clat", difficulty: "Medium" },
        { name: "MAT", to: "/examDetail/mat", difficulty: "Medium" }
      ]
    },
    {
      title: "Top Colleges",
      icon: TrendingUp,
      links: [
        { name: "MBA/BBA Colleges", to: "/colleges/mba", rating: "4.8", count: "500+" }, // Updated to /colleges/mba
        { name: "B.Tech/M.Tech Colleges", to: "/colleges/btech", rating: "4.7", count: "800+" }, // Updated to /colleges/btech
        { name: "BCA/MCA Colleges", to: "/colleges/bca", rating: "4.5", count: "400+" }, // Updated to /colleges/bca
        { name: "MBBS/BDS Colleges", to: "/colleges/mbbs", rating: "4.6", count: "300+" }, // Updated to /colleges/mca
        { name: "Hotel Management Colleges", to: "/colleges/hotelmanagement", rating: "4.7", count: "250+" }, // Updated to /colleges/mtech
        { name: "Para Medical Colleges", to: "/colleges/paramedical", rating: "4.4", count: "350+" }, // Updated to /colleges/ma
        { name: "Design Colleges", to: "/colleges/design", rating: "4.3", count: "600+" } // Updated to /colleges/ba
      ]
    },
    {
      title: "Quick Links",
      icon: Globe,
      links: [
        { name: "About Us", to: "/aboutus", icon: Users },
        { name: "Contact Us", to: "/contact", icon: HeadphonesIcon },
        { name: "Terms & Conditions", to: "/termConditions", icon: Shield },
        { name: "Privacy Policy", to: "/privacy", icon: Shield },
        { name: "Career Guidance", to: "/career-guidance", icon: BookOpen },
        { name: "Success Stories", to: "/success-story", icon: Star },
        { name: "Blog", to: "/blog", icon: BookOpen }
      ]
    }
  ];

  const socialIcons = [
    { icon: Facebook, to: "https://www.facebook.com/careeraashram/", label: "Facebook", followers: "50K", color: "hover:bg-blue-600" },
    { icon: Instagram, to: "https://www.instagram.com/careeraashram_/?hl=en", label: "Instagram", followers: "30K", color: "hover:bg-pink-600" },
    { icon: Twitter, to: "#", label: "Twitter", followers: "25K", color: "hover:bg-sky-500" },
    { icon: Youtube, to: "https://www.youtube.com/channel/UCOJJhjrAtZKKL_Uxk_Yw1Sw", label: "YouTube", followers: "40K", color: "hover:bg-red-600" }
  ];

  const stats = [
    { icon: Users, value: "100K+", label: "Students Enrolled", color: "text-orange-400" },
    { icon: Award, value: "500+", label: "Courses Available", color: "text-blue-400" },
    { icon: Star, value: "4.9", label: "Average Rating", color: "text-yellow-400" },
    { icon: Globe, value: "50+", label: "Partner Institutes", color: "text-green-400" }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-orange-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
          `
        }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-orange-300 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-70 animate-ping"></div>
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <div className="border-b border-blue-800/50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-800/50 to-blue-700/50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-600/30">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {footerSections.map((section, index) => (
              <div 
                key={index} 
                className="space-y-6 group"
                onMouseEnter={() => setHoveredSection(index)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30 group-hover:border-orange-400/50 transition-colors duration-300">
                    <section.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white relative">
                    {section.title}
                    <div className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500 ${
                      hoveredSection === index ? 'w-full' : 'w-8'
                    }`}></div>
                  </h3>
                </div>

                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.to}
                        className="group/link flex items-center justify-between text-blue-200 hover:text-orange-400 transition-all duration-300 p-2 rounded-lg hover:bg-blue-800/30"
                      >
                        <div className="flex items-center gap-3">
                          {link.icon && <link.icon className="w-4 h-4 text-blue-400 group-hover/link:text-orange-400 transition-colors duration-300" />}
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300 text-orange-400" />
                          <span className="group-hover/link:translate-x-1 transition-transform duration-300 font-medium">
                            {link.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs">
                          {link.popular && (
                            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Popular
                            </span>
                          )}
                          {link.students && (
                            <span className="text-blue-300 font-medium">{link.students}</span>
                          )}
                          {link.difficulty && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              link.difficulty === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {link.difficulty}
                            </span>
                          )}
                          {link.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-blue-300 font-medium">{link.rating}</span>
                            </div>
                          )}
                          {link.count && (
                            <span className="text-blue-300 text-xs">({link.count})</span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 pt-12 border-t border-blue-800/50">
            <div className="bg-gradient-to-r from-blue-800/40 to-orange-900/20 rounded-3xl p-8 backdrop-blur-sm border border-blue-700/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                    Stay Updated with Career Aashram
                  </h3>
                  <p className="text-blue-200 text-lg leading-relaxed">
                    Get the latest updates on courses, exams, and career opportunities directly in your inbox.
                  </p>
                  <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-2 text-blue-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Weekly Updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-300">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">No Spam</span>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-12 pr-4 py-4 bg-blue-900/50 border border-blue-700 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent backdrop-blur-sm"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                    >
                      Subscribe
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-blue-800/50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-gradient-to-br from-blue-800/50 to-blue-700/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-blue-200 text-sm">Call Us</div>
                  <div className="text-white font-semibold"><a href="tel:+7301451776">+91 73014 51776 /</a><a href="tel:+7488366702">+91 74883 66702</a></div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-gradient-to-br from-blue-800/50 to-blue-700/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-blue-200 text-sm">Email Us</div>
                  <div className="text-white font-semibold"><a href="mailto:infocareeraashram@gmail.com">infocareeraashram@gmail.com</a></div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-gradient-to-br from-blue-800/50 to-blue-700/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-blue-200 text-sm">Visit Us</div>
                  <a href="https://www.google.com/maps/place/Career+Aashram/@22.575824,88.4306249,766m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed57e07b2ded57:0xa8423bf4d5eac00d!8m2!3d22.5758191!4d88.4331998!16s%2Fg%2F11jclb8x67?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D" target='_blank'>
                    <div className="text-white font-semibold">Xplore Imperia, Dn-21, Salt Lake, 702, DN Block, Sector V, Salt Lake, Kolkata, West Bengal 700091</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and social */}
        <div className="border-t border-blue-800/50 bg-gradient-to-r from-blue-950/80 to-slate-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <div className="text-white font-semibold text-lg mb-2 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                  Career Aashram
                </div>
                <div className="text-blue-300 text-sm">
                  © 2025 Career Aashram | All Rights Reserved.
                </div>
                <div className="text-blue-400 text-xs mt-1">
                  Empowering Dreams, Building Careers
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex items-center gap-8">
                <div className="text-center lg:text-right">
                  <div className="text-blue-200 font-medium text-sm mb-2">
                    Follow Career Aashram
                  </div>
                  <div className="flex items-center gap-4 justify-center lg:justify-end">
                    {socialIcons.map((social, index) => (
                      <div key={index} className="group relative">
                        <a
                          href={social.to}
                          aria-label={social.label}
                          className={`w-12 h-12 bg-blue-800/50 ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg border border-blue-700/30 hover:border-orange-400/50 backdrop-blur-sm`}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {social.followers} followers
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowRight className="w-5 h-5 transform -rotate-90" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;