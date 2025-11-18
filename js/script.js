// ================================
// DOM Elements
// ================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');

// ================================
// Navbar Scroll Effect
// ================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (currentScroll > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// ================================
// Mobile Navigation Toggle
// ================================
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    navToggle.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ================================
// Smooth Scrolling for Navigation Links
// ================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            navMenu.classList.remove('active');
            
            // Reset hamburger menu animation
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ================================
// Active Navigation Link on Scroll
// ================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ================================
// Scroll to Top Button
// ================================
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// Skills Animation on Scroll
// ================================
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (barPosition < screenPosition) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

// Initial check
animateSkills();

// Check on scroll
let skillsAnimated = false;
window.addEventListener('scroll', () => {
    if (!skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
    }
});

// ================================
// Language Level Bars Animation
// ================================
const levelBars = document.querySelectorAll('.level-bar');

const animateLevelBars = () => {
    levelBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (barPosition < screenPosition) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

// Initial check
animateLevelBars();

// Check on scroll
let levelBarsAnimated = false;
window.addEventListener('scroll', () => {
    if (!levelBarsAnimated) {
        animateLevelBars();
        levelBarsAnimated = true;
    }
});

// ================================
// Contact Form Handler
// ================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll create a mailto link
    const mailtoLink = `mailto:zmiguel96@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('¡Mensaje enviado! Se abrirá tu cliente de correo.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ================================
// Notification System
// ================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: '#ffffff',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease',
        fontWeight: '500'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
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

// ================================
// Intersection Observer for Fade In Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and major elements
const animatedElements = document.querySelectorAll(`
    .timeline-item,
    .skill-category,
    .project-card,
    .education-card,
    .certification-card,
    .contact-card
`);

animatedElements.forEach(el => {
    fadeInObserver.observe(el);
});

// ================================
// Typing Effect for Hero Subtitle
// ================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 100;
    
    function typeText() {
        if (charIndex < text.length) {
            heroSubtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 500);
}

// ================================
// Project Image Placeholder
// ================================
// If project images don't exist, create placeholder gradients
document.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach((img, index) => {
        img.addEventListener('error', function() {
            // Hide the broken image
            this.style.display = 'none';
            
            // Add a gradient background to the parent
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
            ];
            
            this.parentElement.style.background = gradients[index % gradients.length];
        });
    });
});

// ================================
// Lazy Loading for Images
// ================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ================================
// Update Copyright Year
// ================================
const updateCopyrightYear = () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
};

updateCopyrightYear();

// ================================
// Performance Optimization: Debounce Scroll Events
// ================================
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

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Your scroll-intensive operations here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ================================
// Console Message
// ================================
console.log('%c¡Hola Developer! 👋', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cGracias por revisar mi código. Si te interesa trabajar conmigo, contáctame: zmiguel96@gmail.com', 'color: #10b981; font-size: 14px;');

// ================================
// Print Development Info
// ================================
console.log('%cMiguel Zambrano Herrera', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('Full Stack Developer | .NET & Angular');
console.log('📧 zmiguel96@gmail.com');
console.log('🔗 linkedin.com/in/miguel-zambrano-herrera');
console.log('💻 github.com/Devmiguelz');

// ================================
// Accessibility: Focus Management
// ================================
document.addEventListener('keydown', (e) => {
    // Enable focus outline when navigating with keyboard
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    // Remove focus outline when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// Add styles for keyboard navigation
const a11yStyles = document.createElement('style');
a11yStyles.textContent = `
    body:not(.keyboard-navigation) *:focus {
        outline: none;
    }
    
    body.keyboard-navigation *:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
    }
`;
document.head.appendChild(a11yStyles);

// ================================
// Loading Animation (Optional)
// ================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade in animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }
});

// ================================
// Dark Mode Toggle (Future Enhancement)
// ================================
// This is prepared for future dark mode implementation
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Check for saved preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
}

// ================================
// Form Input Validation
// ================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    if (input.required && !value) {
        showInputError(input, 'Este campo es obligatorio');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Por favor ingresa un email válido');
            return false;
        }
    }
    
    removeInputError(input);
    return true;
}

function showInputError(input, message) {
    input.classList.add('error');
    
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
        input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function removeInputError(input) {
    input.classList.remove('error');
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// ================================
// Analytics (Placeholder)
// ================================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event:', category, action, label);
    
    // If you add Google Analytics or similar:
    // gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    // });
}

// Track important interactions
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Navigation', 'Click', link.textContent);
    });
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Button', 'Click', button.textContent);
    });
});

// ================================
// Initialize Everything
// ================================
function init() {
    console.log('Portfolio initialized successfully! 🚀');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}