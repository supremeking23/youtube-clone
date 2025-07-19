// YouTube Clone JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    try {
        // Initialize search functionality
        initializeSearch();
        
        // Initialize sidebar toggle
        initializeSidebar();
        
        // Initialize navigation
        initializeNavigation();
        
        // Initialize responsive behavior
        initializeResponsive();
        
        console.log('YouTube Clone initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to initialize the application');
    }
}

// Search Functionality
function initializeSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (!searchForm || !searchInput) {
        console.warn('Search elements not found');
        return;
    }
    
    searchForm.addEventListener('submit', handleSearch);
    
    // Add search suggestions (simulated)
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', handleSearchFocus);
    searchInput.addEventListener('blur', handleSearchBlur);
}

function handleSearch(event) {
    event.preventDefault();
    
    try {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        
        if (!query) {
            showMessage('Please enter a search term');
            return;
        }
        
        // Simulate search functionality
        console.log('Searching for:', query);
        showSearchResults(query);
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please try again.');
    }
}

function handleSearchInput(event) {
    const query = event.target.value.trim();
    
    // In a real app, this would show search suggestions
    if (query.length > 2) {
        // Simulate search suggestions
        console.log('Search suggestions for:', query);
    }
}

function handleSearchFocus(event) {
    event.target.parentElement.classList.add('focused');
}

function handleSearchBlur(event) {
    event.target.parentElement.classList.remove('focused');
}

// Sidebar Functionality
function initializeSidebar() {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    
    if (!menuBtn || !sidebar) {
        console.warn('Sidebar elements not found');
        return;
    }
    
    menuBtn.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
                closeSidebar();
            }
        }
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar) {
        sidebar.classList.remove('open');
    }
}

// Navigation Functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
}

function handleNavigation(event) {
    event.preventDefault();
    
    try {
        // Remove active class from all nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked item
        event.currentTarget.classList.add('active');
        
        // Get the navigation text
        const navText = event.currentTarget.querySelector('.nav-text');
        const section = navText ? navText.textContent : 'Unknown';
        
        console.log('Navigating to:', section);
        
        // Simulate navigation
        showNavigationContent(section);
        
    } catch (error) {
        console.error('Navigation error:', error);
        showError('Navigation failed');
    }
}

// Content Display Functions
function showSearchResults(query) {
    const mainContent = document.querySelector('.main-content');
    const contentMessage = document.querySelector('.content-message');
    const videoGrid = document.getElementById('video-grid');
    
    if (!mainContent || !videoGrid) {
        console.error('Content elements not found');
        return;
    }
    
    // Hide the default message
    if (contentMessage) {
        contentMessage.style.display = 'none';
    }
    
    // Show video grid
    videoGrid.style.display = 'grid';
    
    // Generate mock search results
    const mockVideos = generateMockVideos(query);
    displayVideos(mockVideos);
}

function showNavigationContent(section) {
    const contentMessage = document.querySelector('.content-message');
    const videoGrid = document.getElementById('video-grid');
    
    if (section === 'Home') {
        // Show default home content
        if (contentMessage) {
            contentMessage.style.display = 'block';
            contentMessage.innerHTML = `
                <h2>Try searching to get started</h2>
                <p>Start watching videos to help us build a feed of videos you'll love.</p>
            `;
        }
        if (videoGrid) {
            videoGrid.style.display = 'none';
        }
    } else {
        // Show section-specific content
        if (contentMessage) {
            contentMessage.style.display = 'block';
            contentMessage.innerHTML = `
                <h2>${section}</h2>
                <p>This section is not implemented yet. In a real YouTube clone, this would show ${section.toLowerCase()} content.</p>
            `;
        }
        if (videoGrid) {
            videoGrid.style.display = 'none';
        }
    }
}

function generateMockVideos(query) {
    const mockTitles = [
        `${query} - Complete Tutorial`,
        `Best ${query} Examples 2024`,
        `${query} for Beginners`,
        `Advanced ${query} Techniques`,
        `${query} Tips and Tricks`,
        `${query} vs Alternatives`,
        `${query} Review and Analysis`,
        `${query} Step by Step Guide`
    ];
    
    const mockChannels = [
        'TechChannel', 'LearnWithUs', 'CodeMaster', 'TutorialPro',
        'SkillBuilder', 'EduTech', 'KnowledgeHub', 'ExpertGuide'
    ];
    
    const mockViews = ['1.2M', '856K', '2.1M', '445K', '3.7M', '678K', '1.8M', '923K'];
    const mockTimes = ['2 days ago', '1 week ago', '3 days ago', '5 days ago', '1 day ago', '4 days ago', '6 days ago', '2 weeks ago'];
    
    return mockTitles.map((title, index) => ({
        id: index + 1,
        title: title,
        channel: mockChannels[index % mockChannels.length],
        views: mockViews[index % mockViews.length],
        time: mockTimes[index % mockTimes.length],
        thumbnail: `https://via.placeholder.com/320x180/f0f0f0/666666?text=${encodeURIComponent(query)}`
    }));
}

function displayVideos(videos) {
    const videoGrid = document.getElementById('video-grid');
    
    if (!videoGrid) {
        console.error('Video grid not found');
        return;
    }
    
    videoGrid.innerHTML = '';
    
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('data-video-id', video.id);
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%); display: flex; align-items: center; justify-content: center; color: #666; font-size: 14px;">
                Video Thumbnail
            </div>
        </div>
        <div class="video-info">
            <div class="channel-avatar"></div>
            <div class="video-details">
                <h3>${escapeHtml(video.title)}</h3>
                <div class="video-meta">
                    <div>${escapeHtml(video.channel)}</div>
                    <div>${video.views} views • ${video.time}</div>
                </div>
            </div>
        </div>
    `;
    
    // Add click event listener
    card.addEventListener('click', () => handleVideoClick(video));
    
    return card;
}

function handleVideoClick(video) {
    console.log('Video clicked:', video.title);
    showMessage(`Video "${video.title}" clicked! In a real app, this would open the video player.`);
}

// Responsive Functionality
function initializeResponsive() {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

function handleResize() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth > 768) {
        // Desktop view - ensure sidebar is visible
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }
}

// Utility Functions
function showMessage(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #323232;
        color: white;
        padding: 12px 16px;
        border-radius: 4px;
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

function showError(message) {
    console.error(message);
    showMessage(`Error: ${message}`);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Keyboard Navigation
document.addEventListener('keydown', function(event) {
    // Handle keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'k':
            case '/':
                event.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
                break;
        }
    }
    
    // Handle escape key
    if (event.key === 'Escape') {
        closeSidebar();
    }
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showError('An unexpected error occurred');
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showError('An unexpected error occurred');
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        handleSearch,
        toggleSidebar,
        generateMockVideos,
        escapeHtml
    };
}
