// ========================================================
// EMIRATES COMMERCIAL PROPERTIES - JAVASCRIPT
// Features: Reliable Video Autoplay, Slider, Accordion, Mobile Nav
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // 1. Force Video Autoplay & Fallback Verification
    // --------------------------------------------------------
    const heroVideo = document.querySelector('.hero-video-bg');
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('autoplay', '');
        
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Video autoplay prevented by browser policy; adding user interaction trigger:', error);
                const playOnInteraction = () => {
                    heroVideo.play();
                    window.removeEventListener('click', playOnInteraction);
                    window.removeEventListener('scroll', playOnInteraction);
                    window.removeEventListener('touchstart', playOnInteraction);
                };
                window.addEventListener('click', playOnInteraction, { once: true });
                window.addEventListener('scroll', playOnInteraction, { once: true });
                window.addEventListener('touchstart', playOnInteraction, { once: true });
            });
        }
    }

    // --------------------------------------------------------
    // 2. Mobile Menu Toggle
    // --------------------------------------------------------
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggleBtn && navLinks) {
        mobileToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggleBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu on nav item click (mobile)
        const allNavItems = navLinks.querySelectorAll('a:not(.dropdown-toggle)');
        allNavItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 868) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggleBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Dropdown toggle on mobile
        const dropdownToggles = document.querySelectorAll('.nav-item.has-dropdown');
        dropdownToggles.forEach(drop => {
            const link = drop.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 868) {
                        e.preventDefault();
                        drop.classList.toggle('open');
                    }
                });
            }
        });
    }

    // --------------------------------------------------------
    // 3. Portfolio Gallery Slider
    // --------------------------------------------------------
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');

    if (sliderTrack) {
        const slides = sliderTrack.querySelectorAll('.slider-slide');
        const slideCount = slides.length;
        let currentIndex = 0;
        let autoSlideTimer = null;

        // Generate dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-bullet');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        const updateDots = () => {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.slider-bullet');
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const goToSlide = (index) => {
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetAutoSlide();
            });
        }

        const startAutoSlide = () => {
            autoSlideTimer = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 4500);
        };

        const resetAutoSlide = () => {
            if (autoSlideTimer) clearInterval(autoSlideTimer);
            startAutoSlide();
        };

        sliderTrack.addEventListener('mouseenter', () => {
            if (autoSlideTimer) clearInterval(autoSlideTimer);
        });

        sliderTrack.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        startAutoSlide();
    }

    // --------------------------------------------------------
    // 4. FAQ Accordion
    // --------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-row');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-row-head');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --------------------------------------------------------
    // 5. Contact Form Handler
    // --------------------------------------------------------
    const contactForm = document.getElementById('consultationForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName')?.value || '';
            const phone = document.getElementById('clientPhone')?.value || '';
            const propertyType = document.getElementById('propertyType')?.value || '';

            alert(`Thank you, ${name}! Your inquiry for "${propertyType}" has been received. Our commercial real estate specialist will contact you at ${phone} shortly.`);
            contactForm.reset();
        });
    }
});
