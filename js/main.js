// Main JavaScript for One Stop Centre for Tutoring

document.addEventListener('DOMContentLoaded', function() {
    
    // Form Validation
    function validateForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#e74c3c';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                    return false;
                }
                
                return true;
            });
        }
    }
    
    // Initialize form validations
    validateForm('session-request-form');
    validateForm('tutor-registration-form');
    
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.main-nav ul');
            const navToggle = document.createElement('button');
            navToggle.className = 'mobile-nav-toggle';
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const headerContainer = document.querySelector('.header-container');
            
            if (!document.querySelector('.mobile-nav-toggle')) {
                headerContainer.appendChild(navToggle);
                
                navToggle.addEventListener('click', function() {
                    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                });
            }
        }
    };
    
    createMobileNav();
    window.addEventListener('resize', createMobileNav);
    
    // Set Active Navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Demo Login Functionality
    const demoLogin = (formId, demoEmail, demoPassword, successMessage) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                const password = this.querySelector('input[type="password"]').value;
                
                if (email === demoEmail && password === demoPassword) {
                    alert(successMessage);
                    // In real implementation, redirect to dashboard
                } else {
                    alert(`Invalid credentials. Demo: ${demoEmail} / ${demoPassword}`);
                }
            });
        }
    };
    
    // Demo logins
    demoLogin('tutor-login-form', 'tutor@example.com', 'tutor123', 
              'Login successful! Redirecting to Tutor Dashboard...');
    
    // Announcement Form Handling
    const announcementForm = document.querySelector('.announcement-form form');
    if (announcementForm) {
        announcementForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = this.querySelector('input[name="title"]').value;
            alert(`Announcement "${title}" sent to selected users!`);
            this.reset();
        });
    }
    
    // Search Functionality
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const subject = document.getElementById('search-subject').value;
            const level = document.getElementById('search-level').value;
            const mode = document.getElementById('search-mode').value;
            
            let message = 'Searching tutors with criteria:\n';
            if (subject) message += `• Subject: ${subject}\n`;
            if (level) message += `• Level: ${level}\n`;
            if (mode) message += `• Mode: ${mode}\n`;
            
            alert(message + '\nIn a real system, this would filter tutor listings.');
        });
    }
    
    // Initialize all tooltips
    const tooltips = document.querySelectorAll('[title]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            // Could add custom tooltip implementation here
        });
    });
    
    // Form reset confirmation
    const resetButtons = document.querySelectorAll('button[type="reset"]');
    resetButtons.forEach(button => {
        button.addEventListener('click', function() {
            return confirm('Are you sure you want to clear all form data?');
        });
    });
    
    // External link confirmation
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('You are leaving our website. Continue?')) {
                e.preventDefault();
            }
        });
    });
});
// Dashboard JavaScript Functions
function initializeDashboard() {
    // Star rating functionality
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        const stars = starRating.querySelectorAll('i');
        const ratingValue = document.getElementById('ratingValue');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingValue.value = rating;
                
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                stars.forEach(s => {
                    s.classList.remove('hover');
                });
            });
        });
    }
    
    // Modal functionality
    const modal = document.getElementById('reviewModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Open review modal
function openReviewModal(tutorName) {
    const modal = document.getElementById('reviewModal');
    const tutorNameSpan = document.getElementById('tutorName');
    
    if (modal && tutorNameSpan) {
        tutorNameSpan.textContent = tutorName;
        modal.style.display = 'flex';
    }
}

// Submit review form
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const rating = document.getElementById('ratingValue').value;
            const reviewText = document.getElementById('reviewText').value;
            
            if (!rating) {
                alert('Please select a rating.');
                return false;
            }
            
            if (reviewText.length < 10) {
                alert('Please write a more detailed review (minimum 10 characters).');
                return false;
            }
            
            alert('Thank you for your review! Your feedback has been submitted.');
            
            // Close modal and reset form
            document.getElementById('reviewModal').style.display = 'none';
            reviewForm.reset();
            
            // Reset stars
            const stars = document.querySelectorAll('.star-rating i');
            stars.forEach(star => {
                star.classList.remove('active');
                star.classList.remove('fas');
                star.classList.add('far');
            });
            
            return true;
        });
    }
    
    // Dashboard navigation
    const dashboardLinks = document.querySelectorAll('.dashboard-menu a');
    dashboardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Remove active class from all links
                    dashboardLinks.forEach(l => l.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Session request form
    const sessionRequestForm = document.querySelector('.request-form form');
    if (sessionRequestForm) {
        sessionRequestForm.addEventListener('submit', function(e) {
            const subject = document.getElementById('new-subject').value;
            const date = document.getElementById('new-date').value;
            
            if (!subject) {
                e.preventDefault();
                alert('Please select a subject.');
                return false;
            }
            
            if (!date) {
                e.preventDefault();
                alert('Please select a date.');
                return false;
            }
            
            // Check if date is in the future
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                e.preventDefault();
                alert('Please select a future date.');
                return false;
            }
            
            alert('Tutoring session request submitted! We will match you with a tutor within 24 hours.');
            return true;
        });
    }
    
    // Simulate joining session
    const joinButtons = document.querySelectorAll('.btn.btn-small');
    joinButtons.forEach(button => {
        if (button.textContent.includes('Join')) {
            button.addEventListener('click', function() {
                alert('Joining tutoring session...\n\nIn a real system, this would connect you to the video call or physical location.');
            });
        }
    });
});