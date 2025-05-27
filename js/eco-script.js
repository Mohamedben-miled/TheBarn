// Eco-Friendly JavaScript for The Barn

document.addEventListener('DOMContentLoaded', function() {
    // Eco loading screen
    const loadingScreen = document.getElementById('loading-screen');
    const progressLine = document.querySelector('.progress-line');
    const progressText = document.querySelector('.progress-text');

    const ecoMessages = [
        "🌱 Planting seeds of productivity...",
        "🌿 Growing your workspace naturally...",
        "🍃 Breathing life into your environment...",
        "🌾 Cultivating sustainable habits...",
        "♻️ Recycling old work patterns...",
        "🌳 Your eco-workspace is ready!"
    ];

    let messageIndex = 0;

    // Animate loading messages
    const messageInterval = setInterval(() => {
        if (messageIndex < ecoMessages.length) {
            progressText.textContent = ecoMessages[messageIndex];
            messageIndex++;
        }
    }, 600);

    // Hide loading screen after plant growth animation
    setTimeout(() => {
        clearInterval(messageInterval);
        progressText.textContent = "🌿 Welcome to your natural workspace!";

        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                startEcoAnimations();
            }, 800);
        }, 1000);
    }, 4000);
});

// Start eco-friendly animations
function startEcoAnimations() {
    // Animate navigation with natural ease
    const nav = document.querySelector('.eco-nav');
    nav.style.transform = 'translateY(-100px)';
    nav.style.opacity = '0';

    setTimeout(() => {
        nav.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
    }, 300);

    // Animate hero content with organic movement
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'translateY(50px)';
    heroContent.style.opacity = '0';

    setTimeout(() => {
        heroContent.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        heroContent.style.transform = 'translateY(0)';
        heroContent.style.opacity = '1';
    }, 700);

    // Add eco interactions
    addEcoInteractions();

    // Start natural particle system
    startNaturalParticles();
}

// Eco-friendly interactions
function addEcoInteractions() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinkElements = document.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Logo grows like a plant when clicked
    const logo = document.querySelector('.nav-logo');
    logo.addEventListener('click', () => {
        logo.style.transform = 'scale(1.3) rotate(10deg)';
        logo.style.filter = 'hue-rotate(90deg)';

        setTimeout(() => {
            logo.style.transform = 'scale(1) rotate(0deg)';
            logo.style.filter = 'none';
        }, 600);

        // Create leaf burst effect
        createLeafBurst(logo);
    });

    // Eco buttons with natural hover effects
    const ecoButtons = document.querySelectorAll('.eco-btn');
    ecoButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
            button.style.boxShadow = '0 8px 25px rgba(44, 96, 53, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 5px 20px rgba(44, 96, 53, 0.3)';
        });

        button.addEventListener('click', () => {
            // Ripple effect
            createRippleEffect(button);

            // Gentle shake
            button.style.animation = 'gentleShake 0.5s ease';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        });
    });

    // Eco stats with growing effect
    const ecoStats = document.querySelectorAll('.eco-stat');
    ecoStats.forEach((stat, index) => {
        stat.addEventListener('click', () => {
            // Growing animation
            stat.style.transform = 'scale(1.1)';
            stat.style.background = 'rgba(168, 213, 186, 0.3)';

            setTimeout(() => {
                stat.style.transform = 'scale(1)';
                stat.style.background = 'rgba(255, 255, 255, 0.8)';
            }, 300);

            // Change icon temporarily to show growth
            const icon = stat.querySelector('.stat-icon');
            const originalIcon = icon.textContent;
            const growthIcons = ['🌱', '🌿', '🌳'];

            icon.textContent = growthIcons[index % growthIcons.length];
            setTimeout(() => {
                icon.textContent = originalIcon;
            }, 1500);
        });
    });

    // Scroll-based animations
    addScrollAnimations();

    // Natural mouse trail
    addNaturalMouseTrail();
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Create leaf burst effect
function createLeafBurst(element) {
    const rect = element.getBoundingClientRect();
    const leaves = ['🌿', '🍃', '🌱', '🌾'];

    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: leafBurst 1.5s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;

        // Random direction
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        leaf.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        leaf.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');

        document.body.appendChild(leaf);

        setTimeout(() => {
            leaf.remove();
        }, 1500);
    }
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Natural particle system
function startNaturalParticles() {
    setInterval(() => {
        createNaturalParticle();
    }, 3000);
}

function createNaturalParticle() {
    const particles = ['🌿', '🍃', '🌱', '✨', '🌾'];
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -50px;
        font-size: ${1 + Math.random()}rem;
        pointer-events: none;
        z-index: 1;
        animation: naturalFloat ${8 + Math.random() * 4}s linear forwards;
        opacity: 0.7;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 12000);
}

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'growIn 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.eco-stat, .feature-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Natural mouse trail
function addNaturalMouseTrail() {
    let mouseX = 0, mouseY = 0;
    let trailElements = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create subtle trail dot
        if (Math.random() > 0.8) { // Only sometimes
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${mouseX}px;
                top: ${mouseY}px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(135, 169, 107, 0.6), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: naturalTrailFade 1s ease-out forwards;
            `;

            document.body.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 1000);
        }
    });
}

// Add CSS animations
const ecoAnimationStyles = document.createElement('style');
ecoAnimationStyles.textContent = `
    @keyframes leafBurst {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(360deg) translate(var(--end-x), var(--end-y));
            opacity: 0;
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes gentleShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }

    @keyframes naturalFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(180deg);
            opacity: 0;
        }
    }

    @keyframes growIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes naturalTrailFade {
        0% {
            opacity: 0.6;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }

    .eco-btn {
        position: relative;
        overflow: hidden;
    }

    .eco-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
    }

    .eco-btn:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(ecoAnimationStyles);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.eco-nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Easter egg: Plant growth when typing "grow"
let typedSequence = '';
document.addEventListener('keydown', (e) => {
    typedSequence += e.key.toLowerCase();

    if (typedSequence.includes('grow')) {
        triggerPlantGrowth();
        typedSequence = '';
    }

    if (typedSequence.length > 10) {
        typedSequence = typedSequence.slice(-10);
    }
});

function triggerPlantGrowth() {
    // Create growing plants across the screen
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const plant = document.createElement('div');
            plant.textContent = '🌱';
            plant.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                bottom: 0;
                font-size: 2rem;
                pointer-events: none;
                z-index: 10000;
                animation: plantGrow 3s ease-out forwards;
            `;

            document.body.appendChild(plant);

            setTimeout(() => {
                plant.remove();
            }, 3000);
        }, i * 200);
    }

    // Show message
    const message = document.createElement('div');
    message.textContent = '🌱 Nature is growing! Keep typing "grow" to see more! 🌿';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--forest-green), var(--sage-green));
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 500;
        z-index: 10001;
        animation: fadeInUp 0.5s ease;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add plant growth animation
const plantGrowthStyle = document.createElement('style');
plantGrowthStyle.textContent = `
    @keyframes plantGrow {
        0% {
            transform: scale(0) translateY(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(3) translateY(-200px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(plantGrowthStyle);
