// Global variables
let currentPage = 1;
const blogsPerPage = 6;
let filteredBlogs = [...blogData];

// DOM elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const blogGrid = document.getElementById('blogGrid');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

hamburger.addEventListener('click', toggleMobileMenu);
searchInput.addEventListener('input', handleSearch);
searchBtn.addEventListener('click', handleSearch);

// Initialize the blog application
function initializeApp() {
    renderBlogs();
    renderPagination();
    setupSmoothScrolling();
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredBlogs = [...blogData];
    } else {
        filteredBlogs = blogData.filter(blog => 
            blog.title.toLowerCase().includes(query) ||
            blog.excerpt.toLowerCase().includes(query) ||
            blog.category.toLowerCase().includes(query) ||
            blog.author.toLowerCase().includes(query) ||
            blog.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    currentPage = 1;
    renderBlogs();
    renderPagination();
}

// Render blog cards
function renderBlogs() {
    showLoading();
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

        if (currentBlogs.length === 0) {
            blogGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or browse all articles.</p>
                </div>
            `;
        } else {
            blogGrid.innerHTML = currentBlogs.map(blog => createBlogCard(blog)).join('');
        }

        hideLoading();
    }, 300);
}

// Create individual blog card HTML
function createBlogCard(blog) {
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <article class="blog-card" onclick="openBlog(${blog.id})" aria-label="Read ${blog.title}">
            <div class="blog-image" style="background: linear-gradient(45deg, #667eea, #764ba2)">
                <div style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 0.3rem 0.6rem; border-radius: 15px; font-size: 0.8rem; font-weight: bold; color: #333;">
                    ${blog.category}
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="icon">👤</i> ${blog.author}</span>
                    <span><i class="icon">🕒</i> ${blog.readTime}</span>
                </div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                    <small style="color: #888;">${formattedDate}</small>
                    <a href="#" class="read-more" onclick="event.stopPropagation(); openBlog(${blog.id})">Read more →</a>
                </div>
            </div>
        </article>
    `;
}

// Render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            ← Previous
        </button>
    `;
    
    // Page numbers with smart pagination
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page and ellipsis
    if (startPage > 1) {
        paginationHTML += `<button onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span style="padding: 0.8rem;">...</span>`;
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" ${currentPage === i ? 'class="active"' : ''}>
                ${i}
            </button>
        `;
    }
    
    // Last page and ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span style="padding: 0.8rem;">...</span>`;
        }
        paginationHTML += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Next →
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderBlogs();
    renderPagination();
    
    // Scroll to top of blog section
    document.getElementById('blogs').scrollIntoView({ behavior: 'smooth' });
}

// Open blog detail page
function openBlog(blogId) {
    const blog = blogData.find(b => b.id === blogId);
    if (blog) {
        // Store blog data in memory for the blog detail page
        // In a real application, you would pass this data via URL parameters or API
        console.log('Opening blog:', blog.title);
        
        // For demo purposes, we'll show an alert with blog info
        // In production, you would navigate to a detailed blog page
        showBlogModal(blog);
    }
}

// Show blog in a modal (for demo purposes)
function showBlogModal(blog) {
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
    
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 15px; max-width: 800px; max-height: 80vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; top: 1rem; right: 1rem; background: #667eea; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">×</button>
            <div style="padding: 2rem;">
                <div style="margin-bottom: 1rem;">
                    <span style="background: #667eea; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: bold;">${blog.category}</span>
                </div>
                <h1 style="color: #333; margin-bottom: 1rem; font-size: 2rem; line-height: 1.2;">${blog.title}</h1>
                <div style="display: flex; gap: 2rem; color: #888; margin-bottom: 2rem; font-size: 0.9rem;">
                    <span>👤 ${blog.author}</span>
                    <span>📅 ${formattedDate}</span>
                    <span>🕒 ${blog.readTime}</span>
                </div>
                <div style="background: linear-gradient(45deg, #667eea, #764ba2); height: 200px; border-radius: 10px; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; opacity: 0.3;">
                    📝
                </div>
                <div style="color: #666; line-height: 1.8; font-size: 1.1rem;">
                    ${blog.content}
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

// Show loading animation
function showLoading() {
    loading.style.display = 'block';
    blogGrid.style.display = 'none';
}

// Hide loading animation
function hideLoading() {
    loading.style.display = 'none';
    blogGrid.style.display = 'grid';
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Filter blogs by category
function filterByCategory(category) {
    if (category === 'all') {
        filteredBlogs = [...blogData];
    } else {
        filteredBlogs = blogData.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
    }
    
    currentPage = 1;
    searchInput.value = '';
    renderBlogs();
    renderPagination();
}

// Get unique categories
function getCategories() {
    const categories = [...new Set(blogData.map(blog => blog.category))];
    return categories.sort();
}

// Utility function to debounce search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced search
const debouncedSearch = debounce(handleSearch, 300);
searchInput.removeEventListener('input', handleSearch);
searchInput.addEventListener('input', debouncedSearch);

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }
});

// Add category filter buttons (optional enhancement)
function addCategoryFilters() {
    const categories = getCategories();
    const hero = document.querySelector('.hero');
    
    const filterContainer = document.createElement('div');
    filterContainer.style.cssText = `
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    `;
    
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.style.cssText = `
        padding: 0.5rem 1rem;
        border: 2px solid #667eea;
        background: #667eea;
        color: white;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.9rem;
    `;
    allButton.onclick = () => {
        filterByCategory('all');
        updateActiveFilterButton(allButton);
    };
    filterContainer.appendChild(allButton);
    
    // Add category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.style.cssText = `
            padding: 0.5rem 1rem;
            border: 2px solid #667eea;
            background: white;
            color: #667eea;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
        `;
        button.onmouseover = () => {
            button.style.background = '#667eea';
            button.style.color = 'white';
        };
        button.onmouseout = () => {
            if (!button.classList.contains('active')) {
                button.style.background = 'white';
                button.style.color = '#667eea';
            }
        };
        button.onclick = () => {
            filterByCategory(category);
            updateActiveFilterButton(button);
        };
        filterContainer.appendChild(button);
    });
    
    hero.appendChild(filterContainer);
}

// Update active filter button
function updateActiveFilterButton(activeButton) {
    const filterContainer = activeButton.parentNode;
    const buttons = filterContainer.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.classList.remove('active');
        button.style.background = 'white';
        button.style.color = '#667eea';
    });
    
    activeButton.classList.add('active');
    activeButton.style.background = '#667eea';
    activeButton.style.color = 'white';
}

// Initialize category filters after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addCategoryFilters, 100);
});