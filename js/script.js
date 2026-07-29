/**
 * ========================================
 * SCRIPT.JS - Main JavaScript
 * ========================================
 * Table of Contents:
 * 1. DOM Ready
 * 2. Loading Screen
 * 3. Navigation
 * 4. Theme Toggle
 * 5. Scroll Progress
 * 6. Back to Top
 * 7. Active Nav Link
 * 8. Scroll Reveal
 * 9. Typing Animation
 * 10. Counter Animation
 * 11. Skill Bars
 * 12. Contact Form
 * 13. Smooth Scroll
 * 14. Custom Cursor
 * 15. Mobile Menu
 * 16. Project Filtering
 * 17. Button Ripple
 * 18. Resize Handler
 * ======================================== */

(function() {
    'use strict';

    // ========================================
    // 1. DOM READY
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initLoader();
        initNavigation();
        initThemeToggle();
        initScrollProgress();
        initBackToTop();
        initActiveNavLink();
        initScrollReveal();
        initTypingAnimation();
        initCounters();
        initSkillBars();
        initContactForm();
        initSmoothScroll();
        initCustomCursor();
        initMobileMenu();
        initButtonRipple();
        
        // Run after a small delay for proper rendering
        setTimeout(() => {
            initCounters();
            initSkillBars();
        }, 500);
    });

    // ========================================
    // 2. LOADING SCREEN
    // ========================================
    function initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hide');
                document.body.style.overflow = 'visible';
            }, 1000);
        });

        // Fallback: hide loader after 3 seconds if still visible
        setTimeout(() => {
            if (!loader.classList.contains('hide')) {
                loader.classList.add('hide');
                document.body.style.overflow = 'visible';
            }
        }, 3000);
    }

    // ========================================
    // 3. NAVIGATION
    // ========================================
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Add/remove scrolled class
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ========================================
    // 4. THEME TOGGLE
    // ========================================
    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        const icon = document.getElementById('themeIcon');
        if (!toggle || !icon) return;

        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }

        toggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update icon
            if (newTheme === 'dark') {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }

            // Add rotation animation
            toggle.classList.add('rotate');
            setTimeout(() => {
                toggle.classList.remove('rotate');
            }, 500);
        });
    }

// ========================================
// 5. SCROLL PROGRESS
// ========================================
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Calculate progress (0 to 100)
        let progress = (scrollTop / scrollHeight) * 100;
        
        // Clamp between 0 and 100
        progress = Math.min(100, Math.max(0, progress));
        
        progressBar.style.width = progress + '%';
    }, { passive: true });
}
    // ========================================
    // 6. BACK TO TOP
    // ========================================
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 7. ACTIVE NAV LINK
    // ========================================
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!sections.length || !navLinks.length) return;

        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    // ========================================
    // 8. SCROLL REVEAL
    // ========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .scroll-trigger, .scroll-trigger-left, .scroll-trigger-right, .scroll-trigger-scale');

        if (!revealElements.length) return;

        // Also add stagger-children
        const staggerElements = document.querySelectorAll('.stagger-children');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // If it's a stagger element, add active to children
                    if (entry.target.classList.contains('stagger-children')) {
                        // The children will be activated via CSS
                    }

                    // Unobserve after reveal
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });

        staggerElements.forEach(el => {
            observer.observe(el);
        });

        // Also observe section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            observer.observe(header);
        });
    }

    // ========================================
    // 9. TYPING ANIMATION
    // ========================================
    function initTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;

        const roles = [
            'Software Engineer',
            'Java Developer',
            'Spring Boot Developer',
            'Full-Stack Developer',
            'Problem Solver'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let speed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                // Deleting text
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                speed = 50;
            } else {
                // Typing text
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                speed = 100;
            }

            // Check if complete
            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 500;
            }

            setTimeout(typeEffect, speed);
        }

        // Start typing after a delay
        setTimeout(typeEffect, 1000);
    }

    // ========================================
    // 10. COUNTER ANIMATION
    // ========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');

        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.getAttribute('data-count'));
                    const isFloat = target % 1 !== 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

                        let current = target * ease;
                        if (isFloat) {
                            current = current.toFixed(2);
                        } else {
                            current = Math.floor(current);
                        }

                        el.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            if (isFloat) {
                                el.textContent = target.toFixed(2);
                            } else {
                                el.textContent = target;
                            }
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.3
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // ========================================
    // 11. SKILL BARS
    // ========================================
   // ========================================
// 11. SKILL BARS
// ========================================
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    if (!skillItems.length) {
        console.log('No skill items found');
        return;
    }

    console.log('Found ' + skillItems.length + ' skill items');

    // Force set initial widths
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        if (progressBar) {
            const targetWidth = progressBar.getAttribute('style')?.match(/width:\s*(\d+)%/)?.[1] || 
                               progressBar.style.width.replace('%', '');
            if (targetWidth) {
                // Set width directly without animation
                progressBar.style.width = targetWidth + '%';
                console.log('Set ' + targetWidth + '% for ' + item.querySelector('.skill-name')?.textContent);
            }
        }
    });

    // Also handle via IntersectionObserver for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    // Get the target width from inline style
                    const targetWidth = progressBar.style.width;
                    
                    // Reset to 0 first
                    progressBar.style.width = '%';
                    
                    // Force reflow
                    void progressBar.offsetWidth;
                    
                    // Animate to target after a small delay
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                        console.log('Animated to: ' + targetWidth);
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    skillItems.forEach(item => {
        observer.observe(item);
    });
}
    // ========================================
    // 12. CONTACT FORM
    // ========================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset errors
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
            });

            // Validate
            let isValid = true;
            const name = document.getElementById('formName');
            const email = document.getElementById('formEmail');
            const subject = document.getElementById('formSubject');
            const message = document.getElementById('formMessage');

            if (!name.value.trim()) {
                name.closest('.form-group').classList.add('error');
                isValid = false;
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                email.closest('.form-group').classList.add('error');
                isValid = false;
            }

            if (!subject.value.trim()) {
                subject.closest('.form-group').classList.add('error');
                isValid = false;
            }

            if (!message.value.trim()) {
                message.closest('.form-group').classList.add('error');
                isValid = false;
            }

            if (!isValid) return;

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';

                // Reset form
                form.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ========================================
    // 13. SMOOTH SCROLL
    // ========================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu
                const mobileMenu = document.getElementById('navMenu');
                const mobileToggle = document.getElementById('mobileToggle');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ========================================
    // 14. CUSTOM CURSOR
    // ========================================
    function initCustomCursor() {
        const cursor = document.getElementById('customCursor');
        if (!cursor) return;

        const dot = cursor.querySelector('.cursor-dot');
        const ring = cursor.querySelector('.cursor-ring');

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

            requestAnimationFrame(animateRing);
        }

        animateRing();

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-tag, .project-card, .expertise-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
    }

    // ========================================
    // 15. MOBILE MENU
    // ========================================
    function initMobileMenu() {
        const toggle = document.getElementById('mobileToggle');
        const menu = document.getElementById('navMenu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', function() {
            const isActive = menu.classList.toggle('active');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // 16. PROJECT FILTERING (Optional Enhancement)
    // ========================================
    function initProjectFiltering() {
        // This is a placeholder for potential project filtering feature
        // Can be expanded later if needed
        const projectCards = document.querySelectorAll('.project-card');
        if (!projectCards.length) return;

        // Add filter functionality if needed in the future
        console.log('Project filtering ready');
    }

    // ========================================
    // 17. BUTTON RIPPLE
    // ========================================
    function initButtonRipple() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = '20px';
                ripple.style.height = '20px';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ========================================
    // 18. RESIZE HANDLER
    // ========================================
    function initResizeHandler() {
        let resizeTimer;

        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Handle any resize-specific logic
                console.log('Window resized');
            }, 250);
        });
    }

    // ========================================
    // Utility: Debounce
    // ========================================
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

    // ========================================
    // Utility: Throttle
    // ========================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ========================================
    // Export for debugging if needed
    // ========================================
    if (typeof window !== 'undefined') {
        window.__portfolio = {
            initLoader,
            initNavigation,
            initThemeToggle,
            initScrollProgress,
            initBackToTop,
            initActiveNavLink,
            initScrollReveal,
            initTypingAnimation,
            initCounters,
            initSkillBars,
            initContactForm,
            initSmoothScroll,
            initCustomCursor,
            initMobileMenu,
            initButtonRipple,
            debounce,
            throttle
        };
    }

})();