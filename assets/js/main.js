// ============================================
// Climate Solutions - Modern JavaScript 2026
// ============================================

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger to X
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active Navigation Link Highlight
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath ||
        (currentPath === '/' && href === 'index.html') ||
        (currentPath.includes(href) && href !== 'index.html' && href !== '../index.html')) {
        link.classList.add('active');
    }
});

// Sticky Navigation with smooth glass effect on scroll
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
}, { passive: true });

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

// ============================================
// Scroll Reveal Animation (Modern IntersectionObserver)
// ============================================
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation for grid children
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay * 1000);
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// Observe all animatable elements
document.querySelectorAll('.card, .testimonial, .project-item, .blog-card, .stat-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${(i % 4) * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${(i % 4) * 0.1}s`;
    revealObserver.observe(el);
});

// ============================================
// Counter Animation with Easing
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500;
    const startTime = performance.now();

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
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 150);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// ============================================
// Contact Form Validation
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const formData = {};

        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        document.querySelectorAll('.form-control').forEach(input => {
            input.style.borderColor = '';
        });

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (name && name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else if (name) {
            formData.name = name.value.trim();
        }

        if (email && email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (email && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else if (email) {
            formData.email = email.value.trim();
        }

        if (phone && phone.value.trim() !== '' && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else if (phone && phone.value.trim() !== '') {
            formData.phone = phone.value.trim();
        }

        if (subject && subject.value.trim() === '') {
            showError(subject, 'Subject is required');
            isValid = false;
        } else if (subject) {
            formData.subject = subject.value.trim();
        }

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
    input.style.borderColor = '#EC2329';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        background: linear-gradient(135deg, #3A55A6, #2C4085);
        color: white;
        padding: 1.25rem;
        border-radius: 0.75rem;
        margin-top: 1.25rem;
        text-align: center;
        font-weight: 500;
        animation: fadeInUp 0.4s ease;
    `;
    successDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
    form.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Remove error styling on input
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', function () {
        this.style.borderColor = '';
        const error = this.parentElement.querySelector('.form-error');
        if (error) error.remove();
    });
});

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth loading transition
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});
