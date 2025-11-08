"use client";
import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Eye, Save, X, Search, Filter, 
  Image as ImageIcon, Calendar, User, Tag, FileText,
  Settings, BarChart3, Users, BookOpen, ArrowLeft,
  Check, Clock, AlertCircle, Loader2
} from 'lucide-react';

const BlogCMS = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, list, create, edit, preview
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form state for creating/editing articles
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    excerpt: '',
    author: {
      name: '',
      bio: '',
      avatar: ''
    },
    tags: [],
    status: 'draft', // draft, published
    featuredImage: ''
  });

  const [tagInput, setTagInput] = useState('');

  // Load articles from backend (mock data for demo)
  useEffect(() => {
    loadArticles();
  }, []);

  // Filter articles based on search and status
  useEffect(() => {
    let filtered = articles;
    
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(article => article.status === filterStatus);
    }
    
    setFilteredArticles(filtered);
  }, [searchTerm, filterStatus, articles]);

  const loadArticles = async () => {
    try {
      // Replace with actual API call
      // const response = await fetch('https://api.example.com/articles');
      // const data = await response.json();
      
      // Mock data for demo
      const mockArticles = [
        {
          id: '1',
          title: 'Complete Guide to ICAI CA 2026 Exam Schedule',
          category: 'CA Updates',
          excerpt: 'Everything you need to know about the upcoming CA exams...',
          content: '<h2>Introduction</h2><p>The ICAI has announced...</p>',
          author: {
            name: 'Rajesh Kumar',
            bio: 'CA, Educational Consultant',
            avatar: 'RK'
          },
          tags: ['CA Exam', 'ICAI', 'Schedule'],
          status: 'published',
          views: 2543,
          likes: 342,
          comments: 28,
          date: new Date().toISOString(),
          featuredImage: ''
        },
        {
          id: '2',
          title: 'Top 10 Career Opportunities After B.Com',
          category: 'Career Guidance',
          excerpt: 'Discover diverse career paths after your B.Com degree...',
          content: '<h2>Career Options</h2><p>After completing B.Com...</p>',
          author: {
            name: 'Priya Sharma',
            bio: 'Career Counselor',
            avatar: 'PS'
          },
          tags: ['Career', 'B.Com', 'Opportunities'],
          status: 'published',
          views: 1876,
          likes: 234,
          comments: 15,
          date: new Date(Date.now() - 86400000).toISOString(),
          featuredImage: ''
        }
      ];
      
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
    } catch (error) {
      showNotification('Failed to load articles', 'error');
    }
  };

  const saveArticle = async () => {
    setSaving(true);
    
    try {
      const articleData = {
        ...formData,
        id: currentArticle?.id || Date.now().toString(),
        date: currentArticle?.date || new Date().toISOString(),
        views: currentArticle?.views || 0,
        likes: currentArticle?.likes || 0,
        comments: currentArticle?.comments || 0
      };

      // Replace with actual API call
      // const response = await fetch(`https://api.example.com/articles${currentArticle ? `/${currentArticle.id}` : ''}`, {
      //   method: currentArticle ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(articleData)
      // });

      if (currentArticle) {
        // Update existing article
        setArticles(articles.map(a => a.id === currentArticle.id ? articleData : a));
        showNotification('Article updated successfully!', 'success');
      } else {
        // Create new article
        setArticles([articleData, ...articles]);
        showNotification('Article created successfully!', 'success');
      }

      resetForm();
      setCurrentView('list');
    } catch (error) {
      showNotification('Failed to save article', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      // Replace with actual API call
      // await fetch(`https://api.example.com/articles/${id}`, { method: 'DELETE' });
      
      setArticles(articles.filter(a => a.id !== id));
      showNotification('Article deleted successfully!', 'success');
    } catch (error) {
      showNotification('Failed to delete article', 'error');
    }
  };

  const editArticle = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      excerpt: article.excerpt,
      author: article.author,
      tags: article.tags,
      status: article.status,
      featuredImage: article.featuredImage || ''
    });
    setCurrentView('edit');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      content: '',
      excerpt: '',
      author: { name: '', bio: '', avatar: '' },
      tags: [],
      status: 'draft',
      featuredImage: ''
    });
    setCurrentArticle(null);
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const categories = ['CA Updates', 'Career Guidance', 'Study Tips', 'Industry Trends', 'Finance', 'Exam Preparation'];

  // Dashboard Stats
  const stats = {
    totalArticles: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    drafts: articles.filter(a => a.status === 'draft').length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-600 to-orange-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                  Career Aashram CMS
                </h1>
                <p className="text-sm text-gray-600">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-6 py-4 font-medium transition-all border-b-2 ${
                currentView === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-6 py-4 font-medium transition-all border-b-2 ${
                currentView === 'list' || currentView === 'edit' || currentView === 'preview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              All Articles
            </button>
            <button
              onClick={() => { resetForm(); setCurrentView('create'); }}
              className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Article
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-2">Dashboard</h2>
              <p className="text-gray-600">Overview of your blog content</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
                <div className="text-3xl font-bold text-blue-800 mb-1">{stats.totalArticles}</div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500">Live</span>
                </div>
                <div className="text-3xl font-bold text-green-800 mb-1">{stats.published}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
                <div className="text-3xl font-bold text-orange-800 mb-1">{stats.drafts}</div>
                <div className="text-sm text-gray-600">Drafts</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
                <div className="text-3xl font-bold text-purple-800 mb-1">{(stats.totalViews / 1000).toFixed(1)}K</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-blue-800">Recent Articles</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {articles.slice(0, 5).map(article => (
                  <div key={article.id} className="p-6 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{article.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            article.status === 'published' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {article.status}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => editArticle(article)}
                        className="px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Articles List View */}
        {currentView === 'list' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-2">All Articles</h2>
                <p className="text-gray-600">{filteredArticles.length} articles found</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-6">
              {filteredArticles.map(article => (
                <div key={article.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.status === 'published' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {article.status}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-blue-800 mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => editArticle(article)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCurrentArticle(article);
                          setCurrentView('preview');
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create/Edit Article View */}
        {(currentView === 'create' || currentView === 'edit') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => { resetForm(); setCurrentView('list'); }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-blue-800">
                    {currentView === 'create' ? 'Create New Article' : 'Edit Article'}
                  </h2>
                  <p className="text-gray-600">Fill in the details below</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFormData({ ...formData, status: 'draft' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formData.status === 'draft'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Draft
                </button>
                <button
                  onClick={() => setFormData({ ...formData, status: 'published' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formData.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Published
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter article title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg font-semibold"
                  />
                </div>

                {/* Excerpt */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the article..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    rows="3"
                  />
                </div>

                {/* Content Editor */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content * (HTML Supported)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your article content here... HTML tags are supported for formatting."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none font-mono text-sm"
                    rows="20"
                  />
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Use HTML tags like &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; for formatting
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Category */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Author Info */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Author Information
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.author.name}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        author: { ...formData.author, name: e.target.value }
                      })}
                      placeholder="Author name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                    <input
                      type="text"
                      value={formData.author.bio}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        author: { ...formData.author, bio: e.target.value }
                      })}
                      placeholder="Author bio"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                    <input
                      type="text"
                      value={formData.author.avatar}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        author: { ...formData.author, avatar: e.target.value }
                      })}
                      placeholder="Avatar initials (e.g., RK)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      maxLength="2"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tag..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={saveArticle}
                  disabled={saving || !formData.title || !formData.content || !formData.category}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {currentView === 'create' ? 'Create Article' : 'Update Article'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview View */}
        {currentView === 'preview' && currentArticle && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('list')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-blue-800">Article Preview</h2>
                  <p className="text-gray-600">How it will appear on the blog</p>
                </div>
              </div>
              <button
                onClick={() => editArticle(currentArticle)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Article
              </button>
            </div>

            {/* Preview Content */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
              {/* Featured Image Area */}
              <div className="h-96 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {currentArticle.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{new Date(currentArticle.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>{currentArticle.views} views</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-blue-800 mb-6 leading-tight">
                  {currentArticle.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {currentArticle.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800">{currentArticle.author.name}</div>
                    <div className="text-sm text-gray-600">{currentArticle.author.bio}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="article-content space-y-8">
                  <style>{`
                    .article-content h2 {
                      font-size: 2rem;
                      font-weight: 800;
                      color: #1e3a8a;
                      margin-top: 3rem;
                      margin-bottom: 1.5rem;
                      padding-bottom: 0.75rem;
                      border-bottom: 3px solid #3b82f6;
                      position: relative;
                    }
                    .article-content h2::before {
                      content: '';
                      position: absolute;
                      bottom: -3px;
                      left: 0;
                      width: 80px;
                      height: 3px;
                      background: linear-gradient(to right, #f97316, #fb923c);
                    }
                    .article-content h3 {
                      font-size: 1.5rem;
                      font-weight: 700;
                      color: #1e40af;
                      margin-top: 2rem;
                      margin-bottom: 1rem;
                      padding-left: 1rem;
                      border-left: 4px solid #3b82f6;
                      background: linear-gradient(to right, #eff6ff, transparent);
                      padding-top: 0.5rem;
                      padding-bottom: 0.5rem;
                    }
                    .article-content p {
                      color: #374151;
                      line-height: 1.8;
                      margin-bottom: 1.25rem;
                      font-size: 1.0625rem;
                      text-align: justify;
                    }
                    .article-content strong {
                      color: #1e3a8a;
                      font-weight: 600;
                      background: linear-gradient(to right, #dbeafe, transparent);
                      padding: 0.125rem 0.375rem;
                      border-radius: 0.25rem;
                    }
                    .article-content ul {
                      margin: 1.5rem 0;
                      padding-left: 0;
                      list-style: none;
                    }
                    .article-content ul li {
                      color: #4b5563;
                      margin-bottom: 0.875rem;
                      padding-left: 2rem;
                      position: relative;
                      line-height: 1.7;
                      background: #f9fafb;
                      padding-top: 0.75rem;
                      padding-bottom: 0.75rem;
                      padding-right: 1rem;
                      border-radius: 0.5rem;
                      border-left: 3px solid #3b82f6;
                    }
                    .article-content ul li::before {
                      content: '▸';
                      position: absolute;
                      left: 0.75rem;
                      color: #f97316;
                      font-size: 1.25rem;
                      font-weight: bold;
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t-2 border-gray-200">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-gray-500 font-semibold">
                      <Tag className="w-5 h-5 text-orange-500" />
                      <span>Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentArticle.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCMS;