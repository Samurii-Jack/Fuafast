/* ============================================================
   FUAFAST — INTERACTIVE ENGINE
   Mascot Animations, Bubbles, and Scroll Effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Intersectional Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter if it's a price element
                const counter = entry.target.querySelector('[data-count]');
                if (counter) animateCounter(counter);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-in').forEach(el => scrollObserver.observe(el));

    // 2. Bubble Generator for Hero Background
    const createBubbles = () => {
        const container = document.querySelector('.bubbles');
        if (!container) return;

        const bubbleCount = 15;
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Randomize bubble
            const size = Math.random() * 60 + 20 + 'px';
            const left = Math.random() * 100 + '%';
            const duration = Math.random() * 10 + 10 + 's';
            const delay = Math.random() * 15 + 's';

            bubble.style.width = size;
            bubble.style.height = size;
            bubble.style.left = left;
            bubble.style.animationDuration = duration;
            bubble.style.animationDelay = delay;

            container.appendChild(bubble);
        }
    };
    createBubbles();

    // 3. Counter Animation Logic
    const animateCounter = (el) => {
        if (el.dataset.animated) return;
        el.dataset.animated = "true";

        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = 0;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * (target - start) + start);
            
            el.textContent = current.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // 4. Sticky CTA Visibility Logic & WhatsApp Dynamic Routing
    const stickyContainer = document.getElementById('sticky-cta');
    const heroSection = document.getElementById('hero');
    
    if (stickyContainer && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - 200) {
                stickyContainer.classList.add('visible');
            } else {
                stickyContainer.classList.remove('visible');
            }
        });
    }

    // Handle WhatsApp clicks globally
    const waPhone = "254700000000";
    document.querySelectorAll('[data-wa-msg]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent default if it's an anchor without a true href
            if (btn.tagName === 'A' && (!btn.href || btn.href.includes('#'))) {
                e.preventDefault();
            }
            const msg = encodeURIComponent(btn.getAttribute('data-wa-msg'));
            const url = `https://wa.me/${waPhone}?text=${msg}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });

    // 7. Image Lazy Loading
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('fade-in');
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 200px 0px' });

    document.querySelectorAll('img.lazy-img').forEach(img => lazyImageObserver.observe(img));

    // 5. Speech Bubble Staggered Entry
    // Make speech bubbles pop slightly after the mascot is seen
    const speechObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bubbles = entry.target.querySelectorAll('.speech-bubble');
                bubbles.forEach((bubble, index) => {
                    bubble.style.opacity = '0';
                    bubble.style.transform = 'scale(0.8) translateY(20px)';
                    bubble.style.transition = '0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
                    
                    setTimeout(() => {
                        bubble.style.opacity = '1';
                        bubble.style.transform = 'scale(1) translateY(0)';
                    }, 400 + (index * 300));
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.peeking-mascot, .mascot-wrapper, .delivery-mascot').forEach(m => speechObserver.observe(m));

    // 6. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 7. How-It-Works Carousel
    const track = document.getElementById('hiwTrack');
    const dotsContainer = document.getElementById('hiwDots');
    if (track && dotsContainer) {
        const slides = track.querySelectorAll('.hiw-slide');
        const dots = dotsContainer.querySelectorAll('.hiw-dot');
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoplayTimer;
        const isMobile = () => window.innerWidth <= 768;
        const slidesPerView = () => isMobile() ? 1 : 2;
        const maxIndex = () => Math.max(0, totalSlides - slidesPerView());

        function goToSlide(index) {
            currentIndex = Math.min(index, maxIndex());
            const offset = currentIndex * (100 / slidesPerView());
            track.style.transform = `translateX(-${offset}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }

        function nextSlide() {
            goToSlide(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(nextSlide, 4000);
        }

        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }

        // Dot clicks
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                startAutoplay();
            });
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });
        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < maxIndex()) goToSlide(currentIndex + 1);
                else if (diff < 0 && currentIndex > 0) goToSlide(currentIndex - 1);
            }
            startAutoplay();
        }, { passive: true });

        // Pause on hover
        const carousel = document.getElementById('hiwCarousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
        }

        // Recalculate on resize
        window.addEventListener('resize', () => goToSlide(Math.min(currentIndex, maxIndex())));

        // Start
        goToSlide(0);
        startAutoplay();
    }

    // 8. Special Offer Popup Toast
    const offerPopup = document.getElementById('offerPopup');
    const offerClose = document.getElementById('offerPopupClose');
    if (offerPopup && offerClose) {
        const dismissed = sessionStorage.getItem('offerDismissed');
        if (!dismissed) {
            setTimeout(() => {
                offerPopup.style.display = 'block';
            }, 5000);
        }
        offerClose.addEventListener('click', () => {
            offerPopup.classList.add('hiding');
            setTimeout(() => {
                offerPopup.style.display = 'none';
            }, 350);
            sessionStorage.setItem('offerDismissed', 'true');
        });
    }
});
