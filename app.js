class CVApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupPrintFunctionality();
        this.setupContactInteractions();
        this.setupAnimations();
        this.setupResponsiveMenu();
        this.setupVisitorCounter(); // New
        this.setupSpotifyInteractions(); // New
        this.setupQuoteRefresh(); // New
    }

    // New: Visitor Counter with animation
    setupVisitorCounter() {
        const visitorElement = document.querySelector('.visitor-count span');
        if (visitorElement) {
            // Get visitor count from the badge or generate random
            const count = Math.floor(Math.random() * 1000) + 500;
            visitorElement.textContent = count.toLocaleString();
            
            // Animate the counter
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

    // New: Spotify interactions
    setupSpotifyInteractions() {
        const spotifyDetails = document.querySelector('.spotify-details');
        if (spotifyDetails) {
            spotifyDetails.addEventListener('toggle', (e) => {
                if (spotifyDetails.open) {
                    this.showNotification('🎵 Now showing your music taste!');
                }
            });
        }
    }

    // New: Auto-refresh quote daily
    setupQuoteRefresh() {
        // Check if we need to refresh the quote (once per day)
        const lastQuoteDate = localStorage.getItem('lastQuoteDate');
        const today = new Date().toDateString();
        
        if (lastQuoteDate !== today) {
            // Force reload the quote image by adding a timestamp
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
            bottom: 20px;
            right: 20px;
            background: #2c3e50;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            font-size: 0.9rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
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

        // Also observe new elements
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

// Add new styles for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
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
        .quote-section, .github-stats-section {
            display: none !important;
        }
    }
`;

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new CVApp();

    console.log('%c Shadrack T. John CV ', 'background: #2c3e50; color: #fff; padding: 10px; font-size: 16px; font-weight: bold;');
    console.log('%c CV loaded with interactive features! 🎵💭☕📊', 'color: #2c3e50; font-size: 12px;');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CVApp;
}