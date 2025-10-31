// Admin Panel JavaScript

// Global variables
let blogs = [...blogData]; // Copy of blog data for admin operations
let editingBlogId = null;

// DOM Elements
const blogForm = document.getElementById('blogForm');
const blogsList = document.getElementById('blogsList');
const searchManage = document.getElementById('searchManage');

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardStats();
    renderBlogsList();
    setupEventListeners();
    setDefaultDate();
});

// Setup Event Listeners
function setupEventListeners() {
    blogForm.addEventListener('submit', handleFormSubmit);
    searchManage.addEventListener('input', filterBlogsList);
}

// Set default date to today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

// Update Dashboard Statistics
function updateDashboardStats() {
    const totalBlogs = blogs.length;
    const totalAuthors = [...new Set(blogs.map(blog => blog.author))].length;
    const totalCategories = [...new Set(blogs.map(blog => blog.category))].length;
    
    // Calculate blogs from this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const recentBlogs = blogs.filter(blog => {
        const blogDate = new Date(blog.date);
        return blogDate.getMonth() === currentMonth && blogDate.getFullYear() === currentYear;
    }).length;

    document.getElementById('totalBlogs').textContent = totalBlogs;
    document.getElementById('totalAuthors').textContent = totalAuthors;
    document.getElementById('totalCategories').textContent = totalCategories;
    document.getElementById('recentBlogs').textContent = recentBlogs;
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(blogForm);
    const blogData = {
        title: formData.get('title'),
        author: formData.get('author'),
        category: formData.get('category'),
        readTime: formData.get('readTime') || '5 min read',
        date: formData.get('date'),
        tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
        excerpt: formData.get('excerpt'),
        content: formData.get('content')
    };

    // Validate required fields
    if (!blogData.title || !blogData.author || !blogData.category || !blogData.excerpt || !blogData.content) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (editingBlogId) {
        updateBlog(editingBlogId, blogData);
    } else {
        addNewBlog(blogData);
    }
}

// Add New Blog
function addNewBlog(blogData) {
    const newId = Math.max(...blogs.map(b => b.id)) + 1;
    const newBlog = {
        id: newId,
        ...blogData
    };

    blogs.unshift(newBlog); // Add to beginning of array
    
    showNotification('Blog post added successfully!', 'success');
    resetForm();
    renderBlogsList();
    updateDashboardStats();
}

// Update Existing Blog
function updateBlog(id, blogData) {
    const blogIndex = blogs.findIndex(b => b.id === id);
    if (blogIndex !== -1) {
        blogs[blogIndex] = { ...blogs[blogIndex], ...blogData };
        showNotification('Blog post updated successfully!', 'success');
        resetForm();
        renderBlogsList();
        editingBlogId = null;
        
        // Update form button text
        document.querySelector('#blogForm button[type="submit"]').textContent = 'Publish Blog';
    }
}

// Reset Form
function resetForm() {
    blogForm.reset();
    setDefaultDate();
    editingBlogId = null;
    document.querySelector('#blogForm button[type="submit"]').textContent = 'Publish Blog';
    document.querySelector('.form-section h2').innerHTML = '✍️ Add New Blog Post';
}

// Render Blogs List for Management
function renderBlogsList(filteredBlogs = blogs) {
    if (filteredBlogs.length === 0) {
        blogsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No blogs found.</p>';
        return;
    }

    blogsList.innerHTML = filteredBlogs.map(blog => createBlogManagementCard(blog)).join('');
}

// Create Blog Management Card
function createBlogManagementCard(blog) {
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return `
        <div class="blog-item">
            <div class="blog-meta-info">
                <span><strong>ID:</strong> ${blog.id}</span>
                <span><strong>Category:</strong> ${blog.category}</span>
                <span><strong>Date:</strong> ${formattedDate}</span>
                <span><strong>Author:</strong> ${blog.author}</span>
            </div>
            <h3>${blog.title}</h3>
            <p>${blog.excerpt.substring(0, 150)}${blog.excerpt.length > 150 ? '...' : ''}</p>
            <div style="margin: 1rem 0;">
                <strong>Tags:</strong> 
                ${blog.tags.map(tag => `<span style="background: #f8f9fa; color: #667eea; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.8rem; margin-right: 0.5rem;">${tag}</span>`).join('')}
            </div>
            <div class="blog-actions">
                <button class="btn btn-primary" onclick="editBlog(${blog.id})">✏️ Edit</button>
                <button class="btn btn-secondary" onclick="viewBlog(${blog.id})">👁️ Preview</button>
                <button class="btn btn-danger" onclick="deleteBlog(${blog.id})">🗑️ Delete</button>
            </div>
        </div>
    `;
}

// Edit Blog
function editBlog(id) {
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    // Populate form with blog data
    document.getElementById('title').value = blog.title;
    document.getElementById('author').value = blog.author;
    document.getElementById('category').value = blog.category;
    document.getElementById('readTime').value = blog.readTime;
    document.getElementById('date').value = blog.date;
    document.getElementById('tags').value = blog.tags.join(', ');
    document.getElementById('excerpt').value = blog.excerpt;
    document.getElementById('content').value = blog.content;

    editingBlogId = id;
    
    // Update form UI
    document.querySelector('#blogForm button[type="submit"]').textContent = 'Update Blog';
    document.querySelector('.form-section h2').innerHTML = '✏️ Edit Blog Post';
    
    // Scroll to form
    document.getElementById('add-blog').scrollIntoView({ behavior: 'smooth' });
}

// View Blog Preview
function viewBlog(id) {
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create modal for preview
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 2rem;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 15px; max-width: 800px; max-height: 80vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; top: 1rem; right: 1rem; background: #667eea; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem; z-index: 1;">×</button>
            <div style="padding: 2rem;">
                <div style="margin-bottom: 1rem;">
                    <span style="background: #667eea; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: bold;">${blog.category}</span>
                </div>
                <h1 style="color: #333; margin-bottom: 1rem; font-size: 2rem; line-height: 1.2;">${blog.title}</h1>
                <div style="display: flex; gap: 2rem; color: #888; margin-bottom: 2rem; font-size: 0.9rem; flex-wrap: wrap;">
                    <span>👤 ${blog.author}</span>
                    <span>📅 ${formattedDate}</span>
                    <span>🕒 ${blog.readTime}</span>
                    <span>🆔 ID: ${blog.id}</span>
                </div>
                <div style="background: linear-gradient(45deg, #667eea, #764ba2); height: 200px; border-radius: 10px; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; opacity: 0.3;">
                    📝
                </div>
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #333; margin-bottom: 1rem;">Excerpt:</h3>
                    <p style="color: #666; font-style: italic; background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #667eea;">${blog.excerpt}</p>
                </div>
                <div style="color: #666; line-height: 1.8; font-size: 1rem;">
                    <h3 style="color: #333; margin-bottom: 1rem;">Content:</h3>
                    ${blog.content.split('\n').map(paragraph => `<p style="margin-bottom: 1rem;">${paragraph}</p>`).join('')}
                </div>
                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #eee;">
                    <strong>Tags:</strong>
                    ${blog.tags.map(tag => `<span style="background: #f8f9fa; color: #667eea; padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.8rem; margin: 0 0.5rem 0.5rem 0; display: inline-block;">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Delete Blog
function deleteBlog(id) {
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    const isConfirmed = confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`);
    
    if (isConfirmed) {
        blogs = blogs.filter(b => b.id !== id);
        showNotification('Blog post deleted successfully!', 'success');
        renderBlogsList();
        updateDashboardStats();
    }
}

// Filter Blogs List
function filterBlogsList() {
    const query = searchManage.value.toLowerCase().trim();
    
    if (query === '') {
        renderBlogsList(blogs);
    } else {
        const filteredBlogs = blogs.filter(blog => 
            blog.title.toLowerCase().includes(query) ||
            blog.author.toLowerCase().includes(query) ||
            blog.category.toLowerCase().includes(query) ||
            blog.excerpt.toLowerCase().includes(query) ||
            blog.tags.some(tag => tag.toLowerCase().includes(query))
        );
        renderBlogsList(filteredBlogs);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: bold;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add CSS animation
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${message}</span>
            <button onclick="this.closest('div').style.animation = 'slideOutRight 0.3s ease-out'; setTimeout(() => this.closest('div').remove(), 300);" 
                    style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: 1rem;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Export Blogs Data (for backup)
function exportBlogs() {
    const dataStr = JSON.stringify(blogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `blogs-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Blog data exported successfully!', 'success');
}

// Import Blogs Data
function importBlogs(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedBlogs = JSON.parse(e.target.result);
            
            if (!Array.isArray(importedBlogs)) {
                throw new Error('Invalid file format');
            }
            
            const isConfirmed = confirm(`Import ${importedBlogs.length} blogs? This will replace current data.`);
            if (isConfirmed) {
                blogs = importedBlogs;
                renderBlogsList();
                updateDashboardStats();
                showNotification('Blogs imported successfully!', 'success');
            }
        } catch (error) {
            showNotification('Error importing blogs. Please check file format.', 'error');
        }
    };
    reader.readAsText(file);
}

// Add Export/Import buttons to the admin panel
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const manageBlogsSection = document.getElementById('manage-blogs');
        const exportImportDiv = document.createElement('div');
        exportImportDiv.style.cssText = `
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        `;
        
        exportImportDiv.innerHTML = `
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-secondary" onclick="exportBlogs()">📥 Export Blogs</button>
                <label class="btn btn-secondary" style="cursor: pointer;">
                    📤 Import Blogs
                    <input type="file" accept=".json" onchange="importBlogs(event)" style="display: none;">
                </label>
            </div>
            <div style="color: #666; font-size: 0.9rem;">
                Total: ${blogs.length} blog posts
            </div>
        `;
        
        const searchContainer = manageBlogsSection.querySelector('div');
        manageBlogsSection.insertBefore(exportImportDiv, searchContainer.nextSibling);
    }, 100);
});

// Bulk Operations
function selectAllBlogs() {
    const checkboxes = document.querySelectorAll('.blog-checkbox');
    checkboxes.forEach(cb => cb.checked = true);
}

function deselectAllBlogs() {
    const checkboxes = document.querySelectorAll('.blog-checkbox');
    checkboxes.forEach(cb => cb.checked = false);
}

function deleteSelectedBlogs() {
    const checkboxes = document.querySelectorAll('.blog-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.blogId));
    
    if (selectedIds.length === 0) {
        showNotification('Please select blogs to delete', 'error');
        return;
    }
    
    const isConfirmed = confirm(`Are you sure you want to delete ${selectedIds.length} selected blog(s)? This action cannot be undone.`);
    
    if (isConfirmed) {
        blogs = blogs.filter(blog => !selectedIds.includes(blog.id));
        renderBlogsList();
        updateDashboardStats();
        showNotification(`${selectedIds.length} blog(s) deleted successfully!`, 'success');
    }
}

// Enhanced blog management card with checkboxes
function createBlogManagementCard(blog) {
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return `
        <div class="blog-item">
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <input type="checkbox" class="blog-checkbox" data-blog-id="${blog.id}" style="margin-top: 0.5rem;">
                <div style="flex: 1;">
                    <div class="blog-meta-info">
                        <span><strong>ID:</strong> ${blog.id}</span>
                        <span><strong>Category:</strong> ${blog.category}</span>
                        <span><strong>Date:</strong> ${formattedDate}</span>
                        <span><strong>Author:</strong> ${blog.author}</span>
                        <span><strong>Reading Time:</strong> ${blog.readTime}</span>
                    </div>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt.substring(0, 150)}${blog.excerpt.length > 150 ? '...' : ''}</p>
                    <div style="margin: 1rem 0;">
                        <strong>Tags:</strong> 
                        ${blog.tags.map(tag => `<span style="background: #f8f9fa; color: #667eea; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.8rem; margin-right: 0.5rem; display: inline-block; margin-bottom: 0.25rem;">${tag}</span>`).join('')}
                    </div>
                    <div class="blog-actions">
                        <button class="btn btn-primary" onclick="editBlog(${blog.id})" title="Edit Blog">✏️ Edit</button>
                        <button class="btn btn-secondary" onclick="viewBlog(${blog.id})" title="Preview Blog">👁️ Preview</button>
                        <button class="btn btn-danger" onclick="deleteBlog(${blog.id})" title="Delete Blog">🗑️ Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add bulk operations UI
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const manageBlogsSection = document.getElementById('manage-blogs');
        const bulkActionsDiv = document.createElement('div');
        bulkActionsDiv.style.cssText = `
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #dee2e6;
        `;
        
        bulkActionsDiv.innerHTML = `
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <span style="font-weight: bold;">Bulk Actions:</span>
                <button class="btn btn-secondary" onclick="selectAllBlogs()" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Select All</button>
                <button class="btn btn-secondary" onclick="deselectAllBlogs()" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Deselect All</button>
                <button class="btn btn-danger" onclick="deleteSelectedBlogs()" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Delete Selected</button>
            </div>
        `;
        
        const blogsListDiv = document.getElementById('blogsList');
        manageBlogsSection.insertBefore(bulkActionsDiv, blogsListDiv);
    }, 150);
});