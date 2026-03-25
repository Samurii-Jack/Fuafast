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

    // 4. Sticky CTA Visibility Logic
    // In index.html, we use the nav-cta or hero-cta. 
    // Let's create a logic where a sticky button appears after hero.
    const createStickyCTA = () => {
        const sticky = document.createElement('a');
        sticky.id = 'sticky-cta';
        sticky.href = "https://wa.me/254700000000";
        sticky.innerHTML = `
            <div class="hero-cta-btn" style="padding: 12px 24px; font-size: 0.9rem; pointer-events: auto;">
                Book via WhatsApp
            </div>
        `;
        document.body.appendChild(sticky);

        const heroSection = document.getElementById('hero');
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - 200) {
                sticky.classList.add('visible');
            } else {
                sticky.classList.remove('visible');
            }
        });
    };
    createStickyCTA();

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

});
