"use client";
import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, BookOpen, TrendingUp, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '../services/api';  // Import your API client

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);  // State for fetched posts
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  const categories = ["all", "CA Updates", "Career Guidance", "Study Tips", "Industry Trends", "Finance"];  // Hardcoded, or fetch from backend

  // Fetch articles from backend on mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get('/api/articles');  // Fetches { articles: [...] }
        const fetchedPosts = response.articles || [];  // Extract array from response

        // Map backend data to frontend structure
        const mappedPosts = fetchedPosts.map(post => ({
          id: post._id,  // Use Mongo _id as id
          title: post.title,
          excerpt: post.excerpt,
          category: post.category || 'General',  // Add if backend has category field
          author: post.author?.username || 'Unknown',  // Backend author.username → author
          date: new Date(post.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', month: 'short', day: 'numeric' 
          }),  // Format backend createdAt
          readTime: '5 min read',  // Static for now; calculate based on content length if needed
          image: '/api/placeholder/400/250',  // Static; use post.featuredImage if added to backend
          featured: post.published,  // Use published as featured (adjust as needed)
          tags: post.tags || []  // Add tags field to backend schema if needed
        }));

        setBlogPosts(mappedPosts);
      } catch (err) {
        setError('Failed to load articles. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);  // Runs once on mount

  // Filter logic (uses fetched blogPosts)
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Error display
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section (unchanged) */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/5 to-orange-400/5"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-800 via-blue-600 to-orange-500 bg-clip-text text-transparent">
            Insights & Updates
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Stay informed with the latest educational trends, exam updates, and career guidance to accelerate your professional journey.
          </p>
          
          {/* Stats (unchanged) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-800">500+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-800">50K+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-800">95%</div>
              <div className="text-gray-600">Student Success Rate</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-800">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter (unchanged) */}
      <section className="py-8 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts (unchanged, but uses fetched data) */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-blue-800 mb-8 text-center">Featured Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <article key={post.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
                  <div className="relative">
                    <div className="h-64 bg-gradient-to-br from-blue-500 to-orange-400"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{post.category}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      <Link href={`/blog/${post.id}`}>  // Pass ID for detail page
                        <button className="flex items-center gap-2 text-blue-600 hover:text-orange-500 font-medium group-hover:gap-3 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link> 
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts (fixed: removed outer Link, added inner Link with Read More button for consistency) */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50/50 to-orange-50/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-800 mb-12 text-center">Latest Articles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map(post => (
              <article key={post.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-500"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-blue-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {post.readTime}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link href={`/blog/${post.id}`}>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-orange-500 font-medium transition-all w-full justify-center">
                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-xl mb-4">No articles found</div>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup (unchanged - add your code here if needed) */}
    </div>
  );
};

export default BlogPage;