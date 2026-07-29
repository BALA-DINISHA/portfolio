/**
 * ========================================
 * ANIMATION.JS - Advanced Animations
 * ========================================
 * Table of Contents:
 * 1. Parallax Effects
 * 2. Mouse Tracking
 * 3. Smooth Reveal with GSAP-style
 * 4. Morphing Shapes
 * 5. Magnetic Hover
 * 6. Text Split Animation
 * 7. Stagger Animation (FIXED)
 * 8. Sequence Animation
 * 9. Hover Tilt Effect
 * 10. Auto Play Animations
 * 11. Intersection Observer Enhancements
 * 12. Performance Optimizations
 * ======================================== */

(function() {
    'use strict';

    // ========================================
    // 1. PARALLAX EFFECTS
    // ========================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (!parallaxElements.length) return;

        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
                const rect = el.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const viewportCenter = window.innerHeight / 2;
                const offset = (centerY - viewportCenter) * speed;

                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    el.style.transform = `translateY(${offset}px)`;
                }
            });
        }, { passive: true });
    }

    // ========================================
    // 2. MOUSE TRACKING
    // ========================================
    function initMouseTracking() {
        const trackElements = document.querySelectorAll('[data-mouse-track]');

        if (!trackElements.length) return;

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

            trackElements.forEach(el => {
                const intensity = parseFloat(el.getAttribute('data-mouse-track')) || 10;
                const x = mouseX * intensity;
                const y = mouseY * intensity;

                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        document.addEventListener('mouseleave', function() {
            trackElements.forEach(el => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ========================================
    // 3. SMOOTH REVEAL WITH ANIMATION
    // ========================================
    function initSmoothReveal() {
        const revealItems = document.querySelectorAll('.reveal-smooth');

        if (!revealItems.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseFloat(el.getAttribute('data-delay')) || 0;

                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay * 1000);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealItems.forEach(el => {
            observer.observe(el);
        });
    }

    // ========================================
    // 4. MORPHING SHAPES (Blob Animation)
    // ========================================
    function initMorphingShapes() {
        const shapes = document.querySelectorAll('.morph-shape');

        if (!shapes.length) return;

        shapes.forEach((shape, index) => {
            const duration = parseFloat(shape.getAttribute('data-duration')) || 10;
            const delay = index * 2;

            const points = generateMorphPoints(8);

            shape.style.animation = `morphShape${index} ${duration}s ease-in-out ${delay}s infinite alternate`;
            shape.style.transformOrigin = 'center';

            const styleSheet = document.createElement('style');
            let keyframes = `@keyframes morphShape${index} {`;
            points.forEach((point, i) => {
                const percent = (i / (points.length - 1)) * 100;
                keyframes += `${percent}% { border-radius: ${point}; }`;
            });
            keyframes += '}';
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
        });
    }

    function generateMorphPoints(count) {
        const points = [];
        for (let i = 0; i < count; i++) {
            const p1 = 30 + Math.random() * 40;
            const p2 = 30 + Math.random() * 40;
            const p3 = 30 + Math.random() * 40;
            const p4 = 30 + Math.random() * 40;
            points.push(`${p1}% ${p2}% ${p3}% ${p4}%`);
        }
        return points;
    }

    // ========================================
    // 5. MAGNETIC HOVER
    // ========================================
    function initMagneticHover() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');

        if (!magneticElements.length) return;

        magneticElements.forEach(el => {
            const strength = parseFloat(el.getAttribute('data-magnetic')) || 20;

            el.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = Math.max(rect.width, rect.height) / 2;

                if (distance < maxDistance) {
                    const factor = 1 - (distance / maxDistance);
                    const moveX = deltaX * factor * (strength / 100);
                    const moveY = deltaY * factor * (strength / 100);
                    this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
                }
            });

            el.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) scale(1)';
                this.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    this.style.transition = '';
                }, 300);
            });
        });
    }

    // ========================================
    // 6. TEXT SPLIT ANIMATION
    // ========================================
    function initTextSplit() {
        const splitTexts = document.querySelectorAll('[data-split-text]');

        if (!splitTexts.length) return;

        splitTexts.forEach(el => {
            const text = el.textContent;
            const chars = text.split('');
            const html = chars.map((char, i) => {
                const isSpace = char === ' ';
                return isSpace ? 
                    '&nbsp;' : 
                    `<span class="split-char" style="display:inline-block;opacity:0;transform:translateY(30px) rotateX(90deg);transition:all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);transition-delay:${i * 0.03}s">${char}</span>`;
            }).join('');

            el.innerHTML = html;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const chars = el.querySelectorAll('.split-char');
                        chars.forEach(char => {
                            char.style.opacity = '1';
                            char.style.transform = 'translateY(0) rotateX(0)';
                        });
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(el);
        });
    }

    // ========================================
    // 7. STAGGER ANIMATION - FIXED
    // ========================================
    function initStaggerAnimation() {
        const staggerGroups = document.querySelectorAll('[data-stagger]');

        if (!staggerGroups.length) return;

        staggerGroups.forEach(group => {
            const delay = parseFloat(group.getAttribute('data-stagger')) || 0.1;
            const children = group.children;

            // Skip if this is a skills grid or expertise grid
            if (group.classList.contains('skills-grid') || 
                group.classList.contains('expertise-grid') ||
                group.closest('.skills') ||
                group.closest('.expertise')) {
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(children).forEach((child, index) => {
                            // Don't override existing styles
                            if (!child.style.opacity) {
                                child.style.opacity = '0';
                                child.style.transform = 'translateY(30px)';
                                child.style.transition = `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * delay}s`;

                                setTimeout(() => {
                                    child.style.opacity = '1';
                                    child.style.transform = 'translateY(0)';
                                }, 50);
                            }
                        });
                        observer.unobserve(group);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(group);
        });
    }

    // ========================================
    // 8. SEQUENCE ANIMATION
    // ========================================
    function initSequenceAnimation() {
        const sequences = document.querySelectorAll('[data-sequence]');

        if (!sequences.length) return;

        sequences.forEach(sequence => {
            const items = sequence.querySelectorAll('[data-sequence-item]');
            if (!items.length) return;

            const duration = parseFloat(sequence.getAttribute('data-sequence-duration')) || 500;
            const delay = parseFloat(sequence.getAttribute('data-sequence-delay')) || 0;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
                                const anim = item.getAttribute('data-sequence-anim') || 'fadeInUp';
                                item.style.animation = `${anim} 0.6s ease forwards`;
                            }, delay + index * duration);
                        });
                        observer.unobserve(sequence);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(sequence);
        });
    }

    // ========================================
    // 9. HOVER TILT EFFECT
    // ========================================
    function initHoverTilt() {
        const tiltElements = document.querySelectorAll('[data-tilt]');

        if (!tiltElements.length) return;

        tiltElements.forEach(el => {
            const intensity = parseFloat(el.getAttribute('data-tilt')) || 10;

            el.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                const rotateX = y * intensity;
                const rotateY = x * intensity;

                this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                this.style.transition = 'transform 0.1s ease';
            });

            el.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                this.style.transition = 'transform 0.5s ease';
            });
        });
    }

    // ========================================
    // 10. AUTO PLAY ANIMATIONS
    // ========================================
    function initAutoPlayAnimations() {
        const autoPlayElements = document.querySelectorAll('[data-auto-play]');

        if (!autoPlayElements.length) return;

        autoPlayElements.forEach(el => {
            const animation = el.getAttribute('data-auto-play');
            const duration = parseFloat(el.getAttribute('data-duration')) || 1;
            const delay = parseFloat(el.getAttribute('data-delay')) || 0;
            const iteration = el.getAttribute('data-iteration') || 'infinite';

            el.style.animation = `${animation} ${duration}s ease ${delay}s ${iteration}`;
            el.style.opacity = '1';
        });
    }

    // ========================================
    // 11. INTERSECTION OBSERVER ENHANCEMENTS
    // ========================================
    function initEnhancedObserver() {
        const observeElements = document.querySelectorAll('[data-observe]');

        if (!observeElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const action = el.getAttribute('data-observe');

                    switch (action) {
                        case 'add-class':
                            const className = el.getAttribute('data-class') || 'visible';
                            el.classList.add(className);
                            break;
                        case 'remove-class':
                            const removeClass = el.getAttribute('data-class') || 'hidden';
                            el.classList.remove(removeClass);
                            break;
                        case 'toggle-class':
                            const toggleClass = el.getAttribute('data-class') || 'active';
                            el.classList.toggle(toggleClass);
                            break;
                        case 'play-animation':
                            const animName = el.getAttribute('data-animation') || 'fadeIn';
                            const duration = parseFloat(el.getAttribute('data-duration')) || 0.6;
                            el.style.animation = `${animName} ${duration}s ease forwards`;
                            break;
                        default:
                            el.classList.add('visible');
                    }

                    if (el.getAttribute('data-persistent') !== 'true') {
                        observer.unobserve(el);
                    }
                } else {
                    if (el.getAttribute('data-persistent') === 'true') {
                        const action = el.getAttribute('data-observe');
                        if (action === 'add-class') {
                            const className = el.getAttribute('data-class') || 'visible';
                            el.classList.remove(className);
                        }
                    }
                }
            });
        }, {
            threshold: parseFloat(document.querySelector('[data-threshold]')?.getAttribute('data-threshold')) || 0.1,
            rootMargin: document.querySelector('[data-root-margin]')?.getAttribute('data-root-margin') || '0px'
        });

        observeElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ========================================
    // 12. PERFORMANCE OPTIMIZATIONS
    // ========================================
    function initPerformanceOptimizations() {
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateParallaxOptimized();
                    ticking = false;
                });
                ticking = true;
            }
        });

        const optimizeElements = document.querySelectorAll('[data-optimize]');

        if (optimizeElements.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const el = entry.target;
                    if (entry.isIntersecting) {
                        el.style.animationPlayState = 'running';
                    } else {
                        el.style.animationPlayState = 'paused';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '200px'
            });

            optimizeElements.forEach(el => {
                observer.observe(el);
            });
        }
    }

    function updateParallaxOptimized() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
            const rect = el.getBoundingClientRect();

            if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
                const offset = (rect.top - window.innerHeight / 2) * speed;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAnimations);
        } else {
            initAnimations();
        }
    }

    function initAnimations() {
        initParallax();
        initMouseTracking();
        initSmoothReveal();
        initMorphingShapes();
        initMagneticHover();
        initTextSplit();
        initStaggerAnimation(); // FIXED - now skips skills/expertise
        initSequenceAnimation();
        initHoverTilt();
        initAutoPlayAnimations();
        initEnhancedObserver();
        initPerformanceOptimizations();

        console.log('✨ Advanced animations initialized');
    }

    init();

    if (typeof window !== 'undefined') {
        window.__animations = {
            initParallax,
            initMouseTracking,
            initSmoothReveal,
            initMorphingShapes,
            initMagneticHover,
            initTextSplit,
            initStaggerAnimation,
            initSequenceAnimation,
            initHoverTilt,
            initAutoPlayAnimations,
            initEnhancedObserver,
            initPerformanceOptimizations
        };
    }

})();