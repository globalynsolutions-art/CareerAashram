"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';  // ADD: To get ID from URL query param
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Facebook, Twitter, Linkedin, Link2, ChevronRight, Tag, TrendingUp, MessageCircle, ThumbsUp, Eye, Loader2 } from 'lucide-react';
import { apiClient } from '../services/api';  // ADD: Import your API client
import Link from 'next/link';
import { useParams } from 'next/navigation';

const BlogDetailPage = () => {
  const [searchParams] = useSearchParams();  // ADD: Get URL params
   const articleId = useParams().id; // Get ?id= from URL
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [comments, setComments] = useState([]);  // Mock comments for now; add backend endpoint later
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [allArticles, setAllArticles] = useState([]);  // ADD: Fetch all for related

  // Fetch article data
  useEffect(() => {
    if (!articleId) {
      setError('No article ID found in URL');
      setLoading(false);
      return;
    }

    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch single article
        const articleResponse = await apiClient.get(`/api/articles/${articleId}`);
        const fetchedArticle = articleResponse;  // Backend returns full article object

        // Fetch all articles for related (or add /related endpoint later)
        const allResponse = await apiClient.get('/api/articles');
        const allFetched = allResponse.articles || [];

        // Mock comments (add /articles/:id/comments endpoint to backend later)
        const mockComments = [
          {
            id: 1,
            author: "Rahul Sharma",
            avatar: "RS",
            date: "2 days ago",
            content: "Very informative article! The exam schedule breakdown really helped me plan my preparation timeline.",
            likes: 12
          },
          {
            id: 2,
            author: "Priya Patel",
            avatar: "PP",
            date: "1 day ago",
            content: "Thanks for sharing this. The registration dates are crucial information for all CA aspirants.",
            likes: 8
          }
        ];

        // Map backend data to frontend structure
        const mappedArticle = {
          ...fetchedArticle,
          date: new Date(fetchedArticle.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          }),
          readTime: '8 min read',  // Static; calculate from content length if needed
          views: fetchedArticle.views || 0,
          likes: fetchedArticle.likes || 0,
          isLikedByUser: false,  // Fetch from user prefs or mock
          isBookmarkedByUser: false,  // Mock
          author: {
            name: fetchedArticle.author?.username || 'Unknown Author',
            avatar: fetchedArticle.author?.username?.charAt(0).toUpperCase() || 'U',
            bio: fetchedArticle.author?.email || 'Educational Consultant',
            articles: 45,  // Mock; fetch from user profile
            followers: 12000  // Mock
          },
          tags: fetchedArticle.tags || ['General']  // Add tags to backend if needed
        };

        // Related: Filter all by category (top 3, exclude current)
        const category = fetchedArticle.category || 'General';
        const related = allFetched
          .filter(p => p._id !== articleId && (p.category === category || p.title.includes(fetchedArticle.title.split(' ')[0])))
          .slice(0, 3)
          .map(p => ({
            id: p._id,
            title: p.title,
            category: p.category || 'General',
            readTime: '5 min',
            date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }));

        setArticle(mappedArticle);
        setAllArticles(allFetched);
        setRelatedArticles(related);
        setComments(mockComments);
        setLikes(mappedArticle.likes);
        setIsLiked(false);  // Mock
        setIsBookmarked(false);  // Mock
        
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to load article. Please try again later.');
        // Fallback to mock data
        loadMockData();
      }
    };

    fetchArticleData();
  }, [articleId]);  // Re-fetch if ID changes

  // Mock data for demo (unchanged, but only loads on error)
  const loadMockData = () => {
    setArticle({
      id: '123',
      title: "Complete Guide to ICAI CA 2026 Exam Schedule",
      category: "CA Updates",
      author: {
        name: "Rajesh Kumar",
        avatar: "RK",
        bio: "CA, Educational Consultant with 10+ years experience",
        articles: 45,
        followers: 12000
      },
      date: "December 15, 2025",
      readTime: "8 min read",
      views: "2.5K",
      likes: 342,
      content: `
        <h2>Introduction</h2>
        <p>The Institute of Chartered Accountants of India (ICAI) has officially announced the examination schedule for the January 2026 session. This comprehensive guide covers all important dates, registration procedures, and examination details for CA Foundation, CA Intermediate, and CA Final examinations.</p>
        
        <h2>Key Dates and Deadlines</h2>
        <p>Understanding the examination timeline is crucial for proper preparation and timely registration.</p>

        <h3>CA Foundation Examination Dates</h3>
        <p>The CA Foundation examination is scheduled for January 18, 21, 23, and 25, 2026.</p>
        <ul>
          <li>Principles and Practice of Accounting</li>
          <li>Business Laws and Business Correspondence</li>
          <li>Business Mathematics, Logical Reasoning and Statistics</li>
          <li>Business Economics and Business and Commercial Knowledge</li>
        </ul>

        <h3>CA Intermediate Group Examinations</h3>
        <p>Group 1 examinations are scheduled for January 6, 8, and 10, 2026. Group 2 examinations will be held on January 12, 15, and 17, 2026.</p>

        <h2>Registration Process</h2>
        <p>The examination registration process is entirely online through ICAI's official e-services portal.</p>

        <h3>Registration Timeline</h3>
        <ul>
          <li><strong>Exam Form Registration Starts:</strong> November 03, 2025</li>
          <li><strong>Last Date to Register:</strong> November 18, 2025</li>
          <li><strong>Last Date with Late Fee:</strong> November 19, 2025</li>
          <li><strong>Exam Form Correction Window:</strong> November 20-22, 2025</li>
        </ul>

        <h2>Preparation Strategy</h2>
        <p>Create a realistic study schedule that allocates sufficient time to each subject. Regular practice is essential for CA examinations.</p>

        <h2>Conclusion</h2>
        <p>Proper planning, disciplined study habits, and timely registration are key to success in these examinations. Best wishes to all CA aspirants!</p>
      `,
      tags: ["CA Exam", "Schedule", "ICAI", "Registration", "CA Foundation", "CA Intermediate"],
      isLikedByUser: false,
      isBookmarkedByUser: false
    });

    setRelatedArticles([
      {
        id: '124',
        title: "Top 10 Study Tips for CA Aspirants",
        category: "Study Tips",
        readTime: "5 min",
        date: "Dec 14, 2025"
      },
      {
        id: '125',
        title: "Understanding CA Articleship Requirements",
        category: "CA Updates",
        readTime: "6 min",
        date: "Dec 12, 2025"
      },
      {
        id: '126',
        title: "Time Management Strategies for CA Exams",
        category: "Study Tips",
        readTime: "7 min",
        date: "Dec 10, 2025"
      }
    ]);

    setComments([
      {
        id: 1,
        author: "Rahul Sharma",
        avatar: "RS",
        date: "2 days ago",
        content: "Very informative article! The exam schedule breakdown really helped me plan my preparation timeline.",
        likes: 12
      },
      {
        id: 2,
        author: "Priya Patel",
        avatar: "PP",
        date: "1 day ago",
        content: "Thanks for sharing this. The registration dates are crucial information for all CA aspirants.",
        likes: 8
      }
    ]);

    setLikes(342);
    setLoading(false);
  };

  // Handle like/unlike (optimistic, placeholder API)
  const handleLike = async () => {
    const newLikeState = !isLiked;
    const newLikesCount = newLikeState ? likes + 1 : likes - 1;
    
    // Optimistic update
    setIsLiked(newLikeState);
    setLikes(newLikesCount);

    try {
      // Placeholder: Update backend (add /articles/:id/like endpoint)
      await apiClient.post(`/api/articles/${articleId}/like`, { liked: newLikeState });
    } catch (err) {
      console.error('Failed to update like:', err);
      // Revert on error
      setIsLiked(!newLikeState);
      setLikes(newLikeState ? likes - 1 : likes + 1);
    }
  };

  // Handle bookmark (optimistic, placeholder API)
  const handleBookmark = async () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    try {
      // Placeholder: Update backend (add /articles/:id/bookmark endpoint)
      await apiClient.post(`/api/articles/${articleId}/bookmark`, { bookmarked: newBookmarkState });
    } catch (err) {
      console.error('Failed to update bookmark:', err);
      setIsBookmarked(!newBookmarkState);
    }
  };

  // Handle comment submission (optimistic, placeholder API)
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmittingComment(true);
    
    const newComment = {
      author: "You",
      avatar: "YU",
      date: "Just now",
      content: comment,
      likes: 0
    };

    // Optimistic update
    setComments([...comments, { ...newComment, id: Date.now() }]);
    setComment('');

    try {
      // Placeholder: Post to backend (add /articles/:id/comments endpoint)
      const response = await apiClient.post(`/api/articles/${articleId}/comments`, { content: comment });
      const savedComment = response;  // Assume backend returns saved comment
      // Update with backend ID if needed
      setComments(prev => prev.map(c => c.id === newComment.id ? savedComment : c));
    } catch (err) {
      console.error('Failed to post comment:', err);
      // Keep optimistic on error for UX
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = article?.title || '';
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
  };

  // Loading state (unchanged)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state (unchanged)
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Article</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header (unchanged - add your header code here if needed) */}

      {/* Breadcrumb */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="#" className="hover:text-blue-600">Blog</a>
            <ChevronRight className="w-4 h-4" />
            <a href="#" className="hover:text-blue-600">{article.category}</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400">Article</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto lg:px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
              {/* Featured Image */}
              <div className="h-96 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-12">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>{article.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span>{comments.length} comments</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-blue-800 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {article.author.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-blue-800">{article.author.name}</div>
                      <div className="text-sm text-gray-600">{article.author.bio}</div>
                      <div className="text-xs text-gray-500">{article.author.articles} Articles Published</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`p-2 rounded-full transition-all ${
                        isLiked 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleBookmark}
                      className={`p-2 rounded-full transition-all ${
                        isBookmarked 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      {showShareMenu && (
                        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 w-48 z-10">
                          <button
                            onClick={() => handleShare('facebook')}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                          >
                            <Facebook className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                          >
                            <Twitter className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                          >
                            <Linkedin className="w-4 h-4 text-blue-700" />
                            <span className="text-sm">LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                          >
                            <Link2 className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Copy Link</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Article Content */}
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
                    .article-content p:first-of-type {
                      font-size: 1.125rem;
                      color: #1f2937;
                      line-height: 1.9;
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
                    .article-content ul li:hover {
                      background: linear-gradient(to right, #eff6ff, #fef3c7);
                      transform: translateX(4px);
                      transition: all 0.3s ease;
                    }
                    .article-content a {
                      color: #2563eb;
                      text-decoration: none;
                      border-bottom: 2px solid #93c5fd;
                      transition: all 0.3s ease;
                      padding-bottom: 1px;
                    }
                    .article-content a:hover {
                      color: #f97316;
                      border-bottom-color: #fdba74;
                      background: #fef3c7;
                      padding-left: 0.25rem;
                      padding-right: 0.25rem;
                    }
                    .article-content blockquote {
                      border-left: 4px solid #f97316;
                      background: linear-gradient(to right, #fef3c7, #fffbeb);
                      padding: 1.5rem;
                      margin: 2rem 0;
                      border-radius: 0.5rem;
                      font-style: italic;
                      color: #78350f;
                      box-shadow: 0 2px 8px rgba(251, 146, 60, 0.1);
                    }
                    .article-content code {
                      background: #1e293b;
                      color: #e2e8f0;
                      padding: 0.25rem 0.5rem;
                      border-radius: 0.375rem;
                      font-size: 0.875rem;
                      font-family: 'Courier New', monospace;
                    }
                    .article-content img {
                      border-radius: 1rem;
                      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                      margin: 2rem 0;
                    }
                    .article-content table {
                      width: 100%;
                      border-collapse: separate;
                      border-spacing: 0;
                      margin: 2rem 0;
                      border-radius: 0.5rem;
                      overflow: hidden;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    }
                    .article-content table th {
                      background: linear-gradient(to right, #1e3a8a, #2563eb);
                      color: white;
                      padding: 1rem;
                      text-align: left;
                      font-weight: 600;
                    }
                    .article-content table td {
                      padding: 0.875rem 1rem;
                      border-bottom: 1px solid #e5e7eb;
                      color: #374151;
                    }
                    .article-content table tr:hover td {
                      background: #eff6ff;
                    }
                    .article-content table tr:last-child td {
                      border-bottom: none;
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t-2 border-gray-200">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-gray-500 font-semibold">
                      <Tag className="w-5 h-5 text-orange-500" />
                      <span>Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm hover:from-blue-100 hover:to-blue-200 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 border border-blue-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="mt-8 p-8 bg-gradient-to-br from-blue-500 via-blue-600 to-orange-500 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center group cursor-pointer">
                        <div className="mb-2 transform group-hover:scale-110 transition-transform">
                          <ThumbsUp className="w-8 h-8 text-white mx-auto mb-2" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{likes}</div>
                        <div className="text-sm text-blue-100 font-medium">Likes</div>
                      </div>
                      <div className="text-center group cursor-pointer border-x-2 border-white/30">
                        <div className="mb-2 transform group-hover:scale-110 transition-transform">
                          <Eye className="w-8 h-8 text-white mx-auto mb-2" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{article.views}</div>
                        <div className="text-sm text-blue-100 font-medium">Views</div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="mb-2 transform group-hover:scale-110 transition-transform">
                          <MessageCircle className="w-8 h-8 text-white mx-auto mb-2" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{comments.length}</div>
                        <div className="text-sm text-blue-100 font-medium">Comments</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-300/20 rounded-full blur-2xl"></div>
                </div>

                {/* Comments Section */}
                <div className="mt-16">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageCircle className="w-7 h-7 text-blue-600" />
                    <h3 className="text-3xl font-bold text-blue-800">Discussion</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    </span>
                  </div>
                  
                  {/* Comment Input */}
                  <div className="mb-10">
                    <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-2xl border-2 border-blue-100 shadow-lg">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Join the discussion
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts, ask questions, or provide feedback..."
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none resize-none transition-all text-gray-700 bg-white shadow-inner"
                        rows="4"
                      />
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-500">
                          {comment.length > 0 && (
                            <span className={comment.length > 500 ? 'text-orange-500' : 'text-gray-500'}>
                              {comment.length} / 500 characters
                            </span>
                          )}
                        </div>
                        <button
                          onClick={handleCommentSubmit}
                          disabled={submittingComment || !comment.trim()}
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          {submittingComment && <Loader2 className="w-4 h-4 animate-spin" />}
                          {submittingComment ? 'Posting...' : 'Post Comment'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((item, idx) => (
                      <div 
                        key={item.id} 
                        className="flex gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                          {item.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-bold text-blue-800 text-lg">{item.author}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed text-base">{item.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all font-medium">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{item.likes}</span>
                            </button>
                            <button className="text-sm text-gray-500 hover:text-orange-600 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-all font-medium">
                              <MessageCircle className="w-4 h-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {article.author.avatar}
                  </div>
                  <h4 className="font-bold text-blue-800 text-lg mb-1">{article.author.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{article.author.bio}</p>
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="font-bold text-blue-800">{article.author.articles}</div>
                      <div className="text-xs text-gray-600">Articles</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-800">{(article.author.followers / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-gray-600">Followers</div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium">
                    Follow
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-blue-800 text-lg">Related Articles</h3>
                </div>
                <div className="space-y-4">
                  {relatedArticles.map(related => (
                    <Link 
                      key={related.id}
                      to={`/blogDetail?id=${related.id}`}  // FIX: Link href detail with ID
                      className="block p-4 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg hover:shadow-md transition-all group"
                    >
                      <div className="text-xs text-gray-500 mb-1">{related.category}</div>
                      <h4 className="font-semibold text-blue-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>{related.date}</span>
                        <span>•</span>
                        <span>{related.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
                <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">Get latest articles delivered to your inbox</p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg mb-3 text-gray-800 outline-none"
                />
                <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (unchanged) */}
      <footer className="bg-blue-900 text-white py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-orange-400">Career Aashram</h4>
              <p className="text-blue-200 text-sm">Empowering students with quality education.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Courses</a></li>
                <li><a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">CA Updates</a></li>
                <li><a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Career Guidance</a></li>
                <li><a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Study Tips</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-700 hover:bg-orange-500 rounded-full flex items-center justify-center cursor-pointer transition-colors"></div>
                <div className="w-8 h-8 bg-blue-700 hover:bg-orange-500 rounded-full flex items-center justify-center cursor-pointer transition-colors"></div>
                <div className="w-8 h-8 bg-blue-700 hover:bg-orange-500 rounded-full flex items-center justify-center cursor-pointer transition-colors"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200 text-sm">
            <p>&copy; 2025 Career Aashram. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetailPage;