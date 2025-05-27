// Offers Display System for The Barn

class OffersManager {
    constructor() {
        this.apiUrl = 'admin/offers-api.php';
        this.offers = [];
        this.init();
    }

    async init() {
        await this.loadOffers();
        this.createOffersContainer();
        this.displayOffers();
    }

    async loadOffers() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            if (data.success) {
                this.offers = data.offers;
            }
        } catch (error) {
            console.log('No offers available or API not accessible');
            this.offers = [];
        }
    }

    createOffersContainer() {
        // Check if offers container already exists
        if (document.getElementById('offers-banner')) {
            return;
        }

        // Create offers banner
        const offersBanner = document.createElement('div');
        offersBanner.id = 'offers-banner';
        offersBanner.className = 'offers-banner';
        
        // Insert after navigation
        const nav = document.querySelector('.eco-nav');
        if (nav && nav.nextSibling) {
            nav.parentNode.insertBefore(offersBanner, nav.nextSibling);
        }
    }

    displayOffers() {
        const container = document.getElementById('offers-banner');
        if (!container || this.offers.length === 0) {
            return;
        }

        // Create offers HTML
        const offersHTML = this.offers.map(offer => this.createOfferHTML(offer)).join('');
        
        container.innerHTML = `
            <div class="offers-container">
                <div class="offers-slider">
                    ${offersHTML}
                </div>
                <button class="offers-close" onclick="offersManager.hideOffers()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add CSS if not already added
        this.addOfferStyles();

        // Start auto-rotation if multiple offers
        if (this.offers.length > 1) {
            this.startAutoRotation();
        }
    }

    createOfferHTML(offer) {
        const validUntil = new Date(offer.valid_until);
        const isExpiringSoon = (validUntil - new Date()) < (7 * 24 * 60 * 60 * 1000); // 7 days

        return `
            <div class="offer-slide ${isExpiringSoon ? 'expiring-soon' : ''}">
                <div class="offer-content">
                    <div class="offer-badge">🎉 Special Offer</div>
                    <h3 class="offer-title">${this.escapeHtml(offer.title)}</h3>
                    <p class="offer-description">${this.escapeHtml(offer.description)}</p>
                    <div class="offer-details">
                        <span class="offer-discount">${this.escapeHtml(offer.discount)}</span>
                        <span class="offer-validity">Valid until: ${validUntil.toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="offer-action">
                    <button class="offer-cta" onclick="scrollToSection('contact')">
                        Claim Offer
                    </button>
                </div>
            </div>
        `;
    }

    addOfferStyles() {
        if (document.getElementById('offers-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'offers-styles';
        style.textContent = `
            .offers-banner {
                position: relative;
                background: linear-gradient(135deg, #f0c75e, #ff6b35);
                color: white;
                z-index: 999;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                animation: slideDown 0.5s ease;
            }

            .offers-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 15px 20px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .offers-slider {
                flex: 1;
                overflow: hidden;
            }

            .offer-slide {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 30px;
                animation: fadeIn 0.5s ease;
            }

            .offer-slide.expiring-soon {
                animation: pulse 2s infinite;
            }

            .offer-content {
                flex: 1;
            }

            .offer-badge {
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 8px;
                opacity: 0.9;
            }

            .offer-title {
                font-size: 1.3rem;
                font-weight: 700;
                margin-bottom: 8px;
                line-height: 1.2;
            }

            .offer-description {
                font-size: 1rem;
                margin-bottom: 12px;
                opacity: 0.9;
                line-height: 1.4;
            }

            .offer-details {
                display: flex;
                gap: 20px;
                align-items: center;
                flex-wrap: wrap;
            }

            .offer-discount {
                background: rgba(255, 255, 255, 0.2);
                padding: 4px 12px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 0.9rem;
            }

            .offer-validity {
                font-size: 0.9rem;
                opacity: 0.8;
            }

            .offer-action {
                flex-shrink: 0;
            }

            .offer-cta {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .offer-cta:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }

            .offers-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 20px;
            }

            .offers-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            @keyframes slideDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }

            @media (max-width: 768px) {
                .offer-slide {
                    flex-direction: column;
                    gap: 15px;
                    text-align: center;
                }

                .offer-details {
                    justify-content: center;
                }

                .offers-container {
                    padding: 15px;
                }

                .offers-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    margin: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    startAutoRotation() {
        let currentIndex = 0;
        const slides = document.querySelectorAll('.offer-slide');
        
        if (slides.length <= 1) return;

        // Hide all slides except first
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });

        setInterval(() => {
            slides[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.display = 'flex';
        }, 5000); // Change every 5 seconds
    }

    hideOffers() {
        const banner = document.getElementById('offers-banner');
        if (banner) {
            banner.style.animation = 'slideUp 0.5s ease';
            setTimeout(() => {
                banner.remove();
            }, 500);
        }

        // Add slideUp animation
        if (!document.getElementById('slideup-animation')) {
            const style = document.createElement('style');
            style.id = 'slideup-animation';
            style.textContent = `
                @keyframes slideUp {
                    from {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize offers manager when DOM is loaded
let offersManager;
document.addEventListener('DOMContentLoaded', () => {
    offersManager = new OffersManager();
});
