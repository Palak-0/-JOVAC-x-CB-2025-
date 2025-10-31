import React, { useState, useEffect, useMemo } from 'react';
import { Search, Menu, X, Clock, User, ChevronLeft, ChevronRight, Edit, Trash2, Eye, Plus } from 'lucide-react';

const BlogApp = () => {
  // Sample blog data (20 articles)
  const initialBlogData = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt: "Learn how to use React Hooks to manage state and side effects in functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
      content: "React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components...",
      author: "John Doe",
      date: "2024-03-15",
      category: "React",
      readTime: "5 min read",
      tags: ["React", "Hooks", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Advanced CSS Grid Techniques",
      excerpt: "Master CSS Grid with advanced techniques for creating complex layouts. Explore grid areas, auto-placement, and responsive design patterns.",
      content: "CSS Grid is a powerful two-dimensional layout system that has revolutionized web design...",
      author: "Jane Smith",
      date: "2024-03-12",
      category: "CSS",
      readTime: "7 min read",
      tags: ["CSS", "Grid", "Layout", "Responsive Design"]
    },
    {
      id: 3,
      title: "JavaScript ES2024 New Features",
      excerpt: "Discover the latest JavaScript features in ES2024 including new array methods, temporal API, and pattern matching capabilities.",
      content: "JavaScript ES2024 brings exciting new features that enhance developer productivity and code readability...",
      author: "Mike Johnson",
      date: "2024-03-10",
      category: "JavaScript",
      readTime: "6 min read",
      tags: ["JavaScript", "ES2024", "Features", "Programming"]
    },
    {
      id: 4,
      title: "Building RESTful APIs with Node.js",
      excerpt: "Complete guide to building robust RESTful APIs using Node.js and Express. Learn about routing, middleware, authentication, and best practices.",
      content: "Building RESTful APIs is a cornerstone skill for backend development...",
      author: "Sarah Wilson",
      date: "2024-03-08",
      category: "Node.js",
      readTime: "10 min read",
      tags: ["Node.js", "Express", "API", "Backend"]
    },
    {
      id: 5,
      title: "Python for Data Science",
      excerpt: "Introduction to using Python for data science with pandas, numpy, and matplotlib. Learn data manipulation, analysis, and visualization techniques.",
      content: "Python has become the lingua franca of data science...",
      author: "David Brown",
      date: "2024-03-05",
      category: "Python",
      readTime: "8 min read",
      tags: ["Python", "Data Science", "Pandas", "Analytics"]
    },
    {
      id: 6,
      title: "Modern DevOps Practices",
      excerpt: "Explore modern DevOps practices including CI/CD pipelines, containerization with Docker, and infrastructure as code using Terraform.",
      content: "DevOps practices have transformed how we build, test, and deploy software...",
      author: "Lisa Chen",
      date: "2024-03-02",
      category: "DevOps",
      readTime: "12 min read",
      tags: ["DevOps", "Docker", "CI/CD", "Infrastructure"]
    },
    {
      id: 7,
      title: "Vue.js 3 Composition API",
      excerpt: "Deep dive into Vue.js 3 Composition API. Learn how to organize logic, share code between components, and improve maintainability.",
      content: "Vue.js 3's Composition API provides a more flexible way to organize component logic...",
      author: "Alex Rodriguez",
      date: "2024-02-28",
      category: "Vue.js",
      readTime: "9 min read",
      tags: ["Vue.js", "Composition API", "Frontend", "JavaScript"]
    },
    {
      id: 8,
      title: "TypeScript Best Practices",
      excerpt: "Learn TypeScript best practices for large-scale applications. Covers advanced types, generics, decorators, and project configuration.",
      content: "TypeScript enhances JavaScript with static typing...",
      author: "Emma Davis",
      date: "2024-02-25",
      category: "TypeScript",
      readTime: "11 min read",
      tags: ["TypeScript", "Types", "JavaScript", "Best Practices"]
    },
    // Adding more blog data for demonstration
    ...Array.from({ length: 12 }, (_, i) => ({
      id: i + 9,
      title: `Advanced ${['React', 'JavaScript', 'Python', 'Node.js'][i % 4]} Tutorial ${i + 1}`,
      excerpt: `This is an advanced tutorial covering important concepts in ${['React', 'JavaScript', 'Python', 'Node.js'][i % 4]} development. Learn best practices and modern techniques.`,
      content: `Detailed content for ${['React', 'JavaScript', 'Python', 'Node.js'][i % 4]} tutorial...`,
      author: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'][i % 4],
      date: `2024-0${Math.floor(Math.random() * 2) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      category: ['React', 'JavaScript', 'Python', 'Node.js'][i % 4],
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      tags: [['React', 'Frontend'], ['JavaScript', 'Programming'], ['Python', 'Backend'], ['Node.js', 'API']][i % 4]
    }))
  ];

  // State management
  const [blogs, setBlogs] = useState(initialBlogData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'admin', 'blog-detail'
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Admin state
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    readTime: '',
    date: '',
    tags: '',
    excerpt: '',
    content: ''
  });

  const blogsPerPage = 6;

  // Memoized filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(blogs.map(blog => blog.category))].sort();
  }, [blogs]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // Effects
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setCurrentView('blog-detail');
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Admin functions
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: formData.date || new Date().toISOString().split('T')[0]
    };

    if (editingBlog) {
      setBlogs(prev => prev.map(blog => 
        blog.id === editingBlog.id ? { ...blog, ...blogData } : blog
      ));
      setEditingBlog(null);
    } else {
      const newId = Math.max(...blogs.map(b => b.id)) + 1;
      setBlogs(prev => [{ id: newId, ...blogData }, ...prev]);
    }

    resetForm();
    alert(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      category: '',
      readTime: '',
      date: '',
      tags: '',
      excerpt: '',
      content: ''
    });
    setEditingBlog(null);
  };

  const editBlog = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      category: blog.category,
      readTime: blog.readTime,
      date: blog.date,
      tags: blog.tags.join(', '),
      excerpt: blog.excerpt,
      content: blog.content
    });
  };

  const deleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
      alert('Blog deleted successfully!');
    }
  };

  // Components
  const Header = () => (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">TechBlog Pro</div>
          
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => setCurrentView('home')}
              className={`hover:opacity-80 transition-opacity ${currentView === 'home' ? 'border-b-2' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('admin')}
              className={`hover:opacity-80 transition-opacity ${currentView === 'admin' ? 'border-b-2' : ''}`}
            >
              Admin
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <button 
              onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 hover:opacity-80"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentView('admin'); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 hover:opacity-80"
            >
              Admin
            </button>
          </div>
        )}
      </nav>
    </header>
  );

  const Hero = () => (
    <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Welcome to TechBlog Pro
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover the latest insights in technology, development, and innovation. 
        Stay updated with our expert articles and tutorials.
      </p>
    </section>
  );

  const SearchBar = () => (
    <div className="relative max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-colors"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );

  const CategoryFilters = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => handleCategoryFilter('all')}
        className={`px-4 py-2 rounded-full border-2 transition-colors ${
          selectedCategory === 'all' 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryFilter(category)}
          className={`px-4 py-2 rounded-full border-2 transition-colors ${
            selectedCategory === category 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50'
        }`}
        >
          {category}
        </button>
      ))}
    </div>
  );

  const BlogCard = ({ blog }) => (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
          {blog.category}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-30">
          📝
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <span className="flex items-center">
            <User size={16} className="mr-1" />
            {blog.author}
          </span>
          <span className="flex items-center">
            <Clock size={16} className="mr-1" />
            {blog.readTime}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <small className="text-gray-500">
            {new Date(blog.date).toLocaleDateString()}
          </small>
          <button 
            onClick={() => openBlog(blog)}
            className="text-blue-500 hover:text-blue-700 font-semibold transition-colors"
          >
            Read more →
          </button>
        </div>
      </div>
    </article>
  );

  const BlogGrid = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading articles...</span>
        </div>
      );
    }

    if (paginatedBlogs.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search terms or browse all articles.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedBlogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const maxVisible = 5;
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        {getVisiblePages()[0] > 1 && (
          <>
            <button
              onClick={() => changePage(1)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              1
            </button>
            {getVisiblePages()[0] > 2 && <span className="px-2">...</span>}
          </>
        )}

        {getVisiblePages().map(page => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
          <>
            {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => changePage(totalPages)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const BlogDetail = () => {
    if (!selectedBlog) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentView('home')}
          className="mb-6 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Articles
        </button>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
              {selectedBlog.category}
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-8xl opacity-30">
              📝
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {selectedBlog.title}
            </h1>

            <div className="flex flex-wrap items-center text-gray-600 mb-6 space-x-6">
              <span className="flex items-center">
                <User size={18} className="mr-2" />
                {selectedBlog.author}
              </span>
              <span className="flex items-center">
                <Clock size={18} className="mr-2" />
                {selectedBlog.readTime}
              </span>
              <span>
                📅 {new Date(selectedBlog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="prose max-w-none">
              <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                <p className="text-lg text-gray-700 italic">{selectedBlog.excerpt}</p>
              </div>

              <div className="text-gray-700 leading-relaxed">
                {selectedBlog.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <strong className="mr-2">Tags:</strong>
                {selectedBlog.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  };

  const AdminDashboard = () => {
    const stats = {
      totalBlogs: blogs.length,
      totalAuthors: [...new Set(blogs.map(blog => blog.author))].length,
      totalCategories: categories.length,
      recentBlogs: blogs.filter(blog => {
        const blogDate = new Date(blog.date);
        const now = new Date();
        return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear();
      }).length
    };

    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Administration Panel</h1>
          <p className="text-gray-600">Manage your blog posts, authors, and content</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl">
            <h3 className="text-3xl font-bold mb-2">{stats.totalBlogs}</h3>
            <p className="text-blue-100">Total Blogs</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white p-6 rounded-xl">
            <h3 className="text-3xl font-bold mb-2">{stats.totalAuthors}</h3>
            <p className="text-pink-100">Authors</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-xl">
            <h3 className="text-3xl font-bold mb-2">{stats.totalCategories}</h3>
            <p className="text-cyan-100">Categories</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white p-6 rounded-xl">
            <h3 className="text-3xl font-bold mb-2">{stats.recentBlogs}</h3>
            <p className="text-green-100">This Month</p>
          </div>
        </div>

        {/* Add/Edit Blog Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            {editingBlog ? <Edit className="mr-2" /> : <Plus className="mr-2" />}
            {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {['React', 'JavaScript', 'CSS', 'Node.js', 'Python', 'DevOps', 'Database', 'Security', 'Other'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="5 min read"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="React, JavaScript, Frontend"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the article..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Full article content..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {editingBlog ? 'Update Blog' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>

        {/* Manage Blogs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Manage Blog Posts</h2>
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="space-y-4">
            {blogs.map(blog => (
              <div key={blog.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between mb-4 text-sm text-gray-500 space-x-4">
                  <span><strong>ID:</strong> {blog.id}</span>
                  <span><strong>Category:</strong> {blog.category}</span>
                  <span><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</span>
                  <span><strong>Author:</strong> {blog.author}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => editBlog(blog)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => openBlog(blog)}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Eye size={16} className="mr-1" />
                    Preview
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-gray-800 text-white text-center py-8 mt-16">
      <div className="container mx-auto px-4">
        <p>&copy; 2024 TechBlog Pro. All rights reserved.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {currentView === 'home' && (
          <>
            <Hero />
            <SearchBar />
            <CategoryFilters />
            <BlogGrid />
            <Pagination />
          </>
        )}
        
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'blog-detail' && <BlogDetail />}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogApp;