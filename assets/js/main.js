// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link
const currentPath = window.location.pathname;
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === 'index.html') ||
        (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== 'index.html')) {
        link.classList.add('active');
    }
});

// Sticky Navigation on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .testimonial, .project-item, .blog-card').forEach(el => {
    observer.observe(el);
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validate name
        if (name && name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else if (name) {
            formData.name = name.value.trim();
        }
        
        // Validate email
        if (email && email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (email && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else if (email) {
            formData.email = email.value.trim();
        }
        
        // Validate phone (optional but must be valid if provided)
        if (phone && phone.value.trim() !== '' && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else if (phone && phone.value.trim() !== '') {
            formData.phone = phone.value.trim();
        }
        
        // Validate subject
        if (subject && subject.value.trim() === '') {
            showError(subject, 'Subject is required');
            isValid = false;
        } else if (subject) {
            formData.subject = subject.value.trim();
        }
        
        // Validate message
        if (message && message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message && message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        } else if (message) {
            formData.message = message.value.trim();
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage(contactForm);
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    formGroup.appendChild(error);
    input.style.borderColor = '#ef4444';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
    `;
    successDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Remove error styling on input
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', function() {
        this.style.borderColor = '';
        const error = this.parentElement.querySelector('.form-error');
        if (error) {
            error.remove();
        }
    });
});

// Counter Animation for Stats with Easing
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500; // 2.5 seconds for smoother animation
    const startTime = performance.now();
    
    // Easing function for smooth animation
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Observe stats section for counter animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-counter');
                // Add slight delay between each counter for cascading effect
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 100);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Website loaded successfully');
});
