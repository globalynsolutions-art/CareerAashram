"use client";
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './footer';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [course, setCourse] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription success
    setSubscribed(true);
    setEmail('');
    setMobile('');
    setCourse('');
    
    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  const sections = [
    { id: 'license', title: '1. License', content: 'Unless otherwise stated, Career Aashram Pvt. Ltd. and/or its licensors own the intellectual property rights for all material on Career Aashram.com. All intellectual property rights are reserved. You may access this from Career Aashram.com for your own personal use subjected to restrictions set in these terms and conditions.' },
    { id: 'restrictions', title: '2. Restrictions', content: 'You are specifically restricted from all of the following:', list: [
      'Publishing any website material in any other media',
      'Selling, sublicensing and/or otherwise commercializing any website material',
      'Publicly performing and/or showing any website material',
      'Using this website in any way that is or may be damaging to this website',
      'Using this website in any way that impacts user access to this website',
      'Using this website contrary to applicable laws and regulations',
      'Engaging in any data mining, data harvesting, data extracting or any other similar activity'
    ]},
    { id: 'content', title: '3. Your Content', content: 'In these terms and conditions, "Your Content" shall mean any audio, video, text, images or other material you choose to display on this website. By displaying Your Content, you grant Career Aashram Pvt. Ltd. a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.' },
    { id: 'warranties', title: '4. No warranties', content: 'This website is provided "as is," with all faults, and Career Aashram Pvt. Ltd. expresses no representations or warranties, of any kind related to this website or the materials contained on this website.' },
    { id: 'liability', title: '5. Limitation of liability', content: 'In no event shall Career Aashram Pvt. Ltd., nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Career Aashram Pvt. Ltd., including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.' },
    { id: 'indemnification', title: '6. Indemnification', content: 'You hereby indemnify to the fullest extent Career Aashram Pvt. Ltd. from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.' },
    { id: 'severability', title: '7. Severability', content: 'If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.' },
    { id: 'variation', title: '8. Variation of Terms', content: 'Career Aashram Pvt. Ltd. is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.' },
    { id: 'assignment', title: '9. Assignment', content: 'Career Aashram Pvt. Ltd. is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.' },
    { id: 'agreement', title: '10. Entire Agreement', content: 'These terms constitute the entire agreement between Career Aashram Pvt. Ltd. and you in relation to your use of this website, and supersede all prior agreements and understandings.' },
    { id: 'governing', title: '11. Governing Law & Jurisdiction', content: 'These terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the courts located in India for the resolution of any disputes.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-2">Last Updated: August 26, 2025</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
          <p className="text-gray-700 mb-4 text-lg">
            Welcome to Career Aashram.com. These terms and conditions outline the rules and regulations for the use of Career Aashram Pvt. Ltd.'s Website, located at Career Aashram.com.
          </p>
          <p className="text-gray-700 font-medium">
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Career Aashram.com if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </div>
        
        {/* Table of Contents for Mobile */}
        <div className="md:hidden mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Jump to Section</h3>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                const element = document.getElementById(e.target.value);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <option value="">Select a section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>{section.title}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Terms Sections */}
        <div className="space-y-6 mb-10">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <button 
                className="w-full p-5 text-left flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50"
                onClick={() => toggleSection(section.id)}
              >
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                <svg 
                  className={`w-5 h-5 text-blue-600 transform transition-transform ${activeSection === section.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${activeSection === section.id ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-5">
                  <p className="text-gray-700 mb-3">{section.content}</p>
                  {section.list && (
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      {section.list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Section */}
    
        
        {/* Acceptance Button */}
        <div className="text-center mb-10">
          <p className="text-gray-600 mb-4">By continuing to use our website, you agree to these terms</p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
            I Accept the Terms & Conditions
          </button>
        </div>
      </main>

   
    </div>
  );
};

export default TermsAndConditions;