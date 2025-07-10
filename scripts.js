// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all features
    initTheme();
    initPageLoader();
    initParticles();
    initScrollAnimations();
    initNavigation();
    initMobileMenu();
    initTypingAnimation();
    initHeaderScroll();
    initDropdown();
    initCarousels();
}

// ==================== PAGE LOADER ====================
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    const body = document.body;
    
    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('fade-out');
        body.classList.remove('loading');
        
        // Remove loader after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
        
        // Start other animations after page load
        setTimeout(() => {
            initScrollAnimations();
        }, 500);
    }, 2000);
}

// ==================== PARTICLE SYSTEM ====================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle1, index) => {
            particles.slice(index + 1).forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1000})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-parent');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for smoother animation
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    
                    // Special handling for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('visible');
                    }
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observe timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Ensure section titles are always visible after page load
    setTimeout(() => {
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.style.opacity = '1';
            title.style.transform = 'none';
        });
    }, 2500);
}

// ==================== THEME MANAGEMENT ====================
function initTheme() {
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    
    // Apply saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle events
    lightIcon.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        createThemeRipple(lightIcon);
    });
    
    darkIcon.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        createThemeRipple(darkIcon);
    });
    
    function createThemeRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(59, 130, 246, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '30px';
        ripple.style.height = '30px';
        ripple.style.marginLeft = '-15px';
        ripple.style.marginTop = '-15px';
        ripple.style.pointerEvents = 'none';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scroll navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offsetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after navigation
                closeMobileMenu();
            }
        });
    });
    
    // Active section highlighting on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingNavLink = document.querySelector(`.nav__link[href="#${id}"]`);
                
                // Remove active class from all nav links
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to corresponding nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (!mobileMenuToggle || !navMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnToggle = mobileMenuToggle.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            closeMobileMenu();
        }
    });
}

function openMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const body = document.body;
    
    navMenu.classList.add('active');
    mobileMenuToggle.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
    
    // Add animation delay for menu items
    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('slide-in');
    });
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const body = document.body;
    
    if (!navMenu || !mobileMenuToggle) return;
    
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    body.style.overflow = ''; // Restore body scroll
    
    // Remove animation classes
    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('slide-in');
        item.style.animationDelay = '';
    });
}

// ==================== TYPING ANIMATION ====================
function initTypingAnimation() {
    const roles = ["ML Developer", "AI Developer", "Web Developer", "UI/UX Designer", "Data Scientist"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    const changingRoleElement = document.getElementById('changing-role');
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isWaiting) {
            isWaiting = false;
            isDeleting = true;
            setTimeout(typeRole, 1500); // Wait before deleting
            return;
        }
        
        if (isDeleting) {
            // Deleting characters
            changingRoleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        } else {
            // Typing characters
            changingRoleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isWaiting = true;
            }
        }
        
        // Variable typing speed
        const typingSpeed = isDeleting ? 50 : 100;
        const waitingSpeed = isWaiting ? 2000 : typingSpeed;
        
        setTimeout(typeRole, waitingSpeed);
    }
    
    // Start typing animation
    setTimeout(typeRole, 1000);
}

// ==================== HEADER SCROLL EFFECT ====================
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ==================== DROPDOWN MENU ====================
function initDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (!dropdown || !dropdownToggle || !dropdownMenu) return;
    
    let isOpen = false;
    
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isOpen = !isOpen;
        dropdown.classList.toggle('active', isOpen);
        
        if (isOpen) {
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.animation = 'slideDown 0.3s ease forwards';
        } else {
            dropdownMenu.style.animation = 'slideUp 0.3s ease forwards';
            setTimeout(() => {
                dropdownMenu.style.display = 'none';
            }, 300);
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && isOpen) {
            isOpen = false;
            dropdown.classList.remove('active');
            dropdownMenu.style.animation = 'slideUp 0.3s ease forwards';
            setTimeout(() => {
                dropdownMenu.style.display = 'none';
            }, 300);
        }
    });
    
    // Close dropdown when selecting an item
    const dropdownLinks = dropdownMenu.querySelectorAll('.nav__link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            isOpen = false;
            dropdown.classList.remove('active');
            dropdownMenu.style.display = 'none';
        });
    });
    
    // Add slideUp animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
        
        @keyframes slide-in {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .slide-in {
            animation: slide-in 0.3s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// ==================== BUTTON INTERACTIONS ====================
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ==================== PARALLAX EFFECTS ====================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.home-img, .section-title');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

// ==================== UTILITY FUNCTIONS ====================
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== PERFORMANCE OPTIMIZATION ====================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    initParallax();
}, 16)); // ~60fps

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add reduced motion support
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== FINAL INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initButtonEffects();
    initAccessibility();
    
    // Initialize ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // Graceful fallback - ensure basic functionality works
    if (!document.querySelector('.nav__link.active')) {
        document.querySelector('.nav__link').classList.add('active');
    }
});

// ==================== CAROUSEL FUNCTIONALITY ====================
function initCarousels() {
    initSkillsCarousel();
    initExperienceCarousel();
}

function initSkillsCarousel() {
    const skillsContent = document.querySelector('.skills-content');
    const prevBtn = document.querySelector('.skills .carousel-btn-prev');
    const nextBtn = document.querySelector('.skills .carousel-btn-next');
    const dots = document.querySelectorAll('.skills .dot');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (!skillsContent || !prevBtn || !nextBtn || skillItems.length === 0) return;
    
    let currentSlide = 0;
    const itemsPerSlide = window.innerWidth <= 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
    const maxSlides = Math.ceil(skillItems.length / itemsPerSlide);
    
    function updateCarousel() {
        const translateX = -currentSlide * (100 / maxSlides);
        skillsContent.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % maxSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + maxSlides) % maxSlides;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-scroll
    let autoScrollInterval = setInterval(nextSlide, 4000);
    
    // Pause auto-scroll on hover
    const skillsSection = document.querySelector('.skills');
    skillsSection.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    skillsSection.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(nextSlide, 4000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemsPerSlide = window.innerWidth <= 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
        if (newItemsPerSlide !== itemsPerSlide) {
            location.reload(); // Simple solution for responsive carousel
        }
    });
    
    // Initialize
    updateCarousel();
}

function initExperienceCarousel() {
    const experienceContent = document.querySelector('.experience-content');
    const prevBtn = document.querySelector('.experience .carousel-btn-prev');
    const nextBtn = document.querySelector('.experience .carousel-btn-next');
    const dots = document.querySelectorAll('.experience .dot');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    if (!experienceContent || !prevBtn || !nextBtn || experienceItems.length === 0) return;
    
    let currentSlide = 0;
    const itemsPerSlide = window.innerWidth <= 768 ? 1 : 2;
    const maxSlides = Math.ceil(experienceItems.length / itemsPerSlide);
    
    function updateCarousel() {
        const translateX = -currentSlide * (100 / maxSlides);
        experienceContent.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % maxSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + maxSlides) % maxSlides;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-scroll
    let autoScrollInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-scroll on hover
    const experienceSection = document.querySelector('.experience');
    experienceSection.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    experienceSection.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(nextSlide, 5000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemsPerSlide = window.innerWidth <= 768 ? 1 : 2;
        if (newItemsPerSlide !== itemsPerSlide) {
            location.reload(); // Simple solution for responsive carousel
        }
    });
    
    // Initialize
    updateCarousel();
}

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log(`
🚀 Welcome to Ajay J's Portfolio!
🎨 Designed with modern animations and smooth interactions
💫 Powered by vanilla JavaScript and CSS3
📧 Contact: ajay.jofficial3@gmail.com
`);
