class ProfessionalPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTypingAnimation();
    }

    setupEventListeners() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupRippleEffect();
    }
    
    // Updated Typing Animation for multiple dynamic roles
    setupTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const roles = [
            "AI & Automation Developer",
            "Python,Figma,Adobe XD,Adobe XD",
            "Full Stack Developer",
            "UI/UX Enthusiast",
            "ChatGPT/GPT Models ",
            "gemini AI",
            "Grok,GitHub Copilot,Prompt Engineering ,Google Gemini AI",
            "MS OFFICE,Microsoft Excel,Data analysis and visualization,Data analysis and visualization"

        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            let displayText = '';

            if (isDeleting) {
                // Deleting text
                displayText = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing text
                displayText = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            heroTitle.textContent = displayText;
            heroTitle.classList.remove('typing-done');

            let typeSpeed = isDeleting ? 50 : 150;

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of typing
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, move to next role
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next role
            }

            setTimeout(type, typeSpeed);
        }

        // Start the animation
        setTimeout(type, 500);
    }

    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    setupScrollEffects() {
        const nav = document.getElementById('main-nav');
        const scrollToTopBtn = document.getElementById('scrollToTop');
        const scrollProgressBar = document.querySelector('.scroll-progress-bar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section, .hero-section');

        window.addEventListener('scroll', () => {
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

            if (scrollToTopBtn) {
                scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
            }
            
            if (scrollProgressBar) {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (window.scrollY / docHeight) * 100;
                scrollProgressBar.style.width = `${progress}%`;
            }

            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - nav.offsetHeight;
                if(window.scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });

        scrollToTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    setupRippleEffect() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.ripple-effect');
            if (target) {
                const rect = target.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${e.clientX - rect.left}px`;
                ripple.style.top = `${e.clientY - rect.top}px`;
                target.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalPortfolio();
});