class CVApp {
    constructor() {
        this.init();
    }

    init() {
        this.initParticles();
        this.initTiltEffect();
        this.setupSmoothScrolling();
        this.setupPrintFunctionality();
        this.setupContactInteractions();
        this.setupAnimations();
        this.setupResponsiveMenu();
        this.setupVisitorCounter();
        this.setupSpotifyInteractions();
        this.setupQuoteRefresh();
        this.setupProfileImage();
    }

    // Initialize Particles.js
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#667eea'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#667eea',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // 3D Tilt Effect for cards
    initTiltEffect() {
        const cards = document.querySelectorAll('[data-tilt]');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // Setup Profile Image (GitHub avatar)
    setupProfileImage() {
        const profileImg = document.getElementById('profileImage');
        if (profileImg) {
            // Fetch GitHub avatar
            fetch('https://api.github.com/users/zuck30')
                .then(response => response.json())
                .then(data => {
                    if (data.avatar_url) {
                        profileImg.src = data.avatar_url;
                    }
                })
                .catch(() => {
                    // Fallback to placeholder if GitHub API fails
                    profileImg.src = 'https://avatars.githubusercontent.com/u/placeholder';
                });
        }
    }

    // Visitor Counter with animation
    setupVisitorCounter() {
        const visitorElement = document.querySelector('.visitor-count span');
        if (visitorElement) {
            const count = Math.floor(Math.random() * 1000) + 500;
            visitorElement.textContent = count.toLocaleString();
            this.animateCounter(visitorElement, count);
        }
    }

    animateCounter(element, finalCount) {
        let current = 0;
        const increment = Math.ceil(finalCount / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalCount) {
                current = finalCount;
                clearInterval(timer);
            }
            element.textContent = current.toLocaleString();
        }, 20);
    }

    // Spotify interactions
    setupSpotifyInteractions() {
        const spotifyDetails = document.querySelector('.spotify-details');
        if (spotifyDetails) {
            spotifyDetails.addEventListener('toggle', (e) => {
                if (spotifyDetails.open) {
                    this.showNotification('Now showing your music taste!');
                }
            });
        }
    }

    // Auto-refresh quote daily
    setupQuoteRefresh() {
        const lastQuoteDate = localStorage.getItem('lastQuoteDate');
        const today = new Date().toDateString();
        
        if (lastQuoteDate !== today) {
            const quoteImg = document.querySelector('.quote-card img');
            if (quoteImg) {
                const src = quoteImg.src.split('?')[0];
                quoteImg.src = `${src}?t=${Date.now()}`;
                localStorage.setItem('lastQuoteDate', today);
            }
        }
    }

    setupSmoothScrolling() {
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
    }

    setupPrintFunctionality() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                this.optimizeForPrint();
            }
        });
    }

    optimizeForPrint() {
        document.body.classList.add('printing');
        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        }, { once: true });
    }

    setupContactInteractions() {
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const link = item.querySelector('a');
                if (link) {
                    item.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });

        const emailItem = document.querySelector('.contact-item a[href^="mailto:"]');
        if (emailItem) {
            emailItem.addEventListener('click', (e) => {
                const email = emailItem.textContent;
                this.copyToClipboard(email);
                this.showNotification('Email copied to clipboard!');
            });
        }
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            font-size: 0.9rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.3);
        `;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = `translateY(20px)`;
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    setupAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });

        document.querySelectorAll('.github-stats-section, .spotify-section, .quote-section').forEach(section => {
            if (section) {
                section.classList.add('fade-in');
                observer.observe(section);
            }
        });
    }

    setupResponsiveMenu() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        const width = window.innerWidth;
        if (width <= 600) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
}

// Add styles for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .contact-item {
        cursor: pointer;
        transition: transform 0.15s ease;
    }

    .contact-item:hover {
        transform: translateX(5px);
    }

    .project-item, .experience-item, .education-item {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .project-item:hover, .experience-item:hover, .education-item:hover {
        transform: translateX(5px);
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0px); }
    }

    .coffee-button {
        animation: float 3s ease-in-out infinite;
    }

    .stats-card {
        transition: all 0.3s ease;
    }

    .stats-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    @media (hover: none) {
        .project-item:hover, .experience-item:hover, .education-item:hover,
        .stats-card:hover, .coffee-button:hover {
            transform: none;
        }
    }

    /* Print styles for new elements */
    @media print {
        .coffee-section, .visitor-badge-top, .spotify-section, 
        .quote-section, .github-stats-section, .floating-actions,
        #particles-js {
            display: none !important;
        }
    }
`;

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new CVApp();

    console.log('%c Shadrack T. John CV ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 8px;');
    console.log('%c CV loaded with 3D animations, particles, and interactive features! ', 'color: #667eea; font-size: 12px; font-weight: 600;');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CVApp;
}