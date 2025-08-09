// ===== ANIMATIONS =====

// Animations au scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Animation spécifique selon la classe
                if (entry.target.classList.contains('gallery-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.gallery-item, .artist-card, .exhibition-item, .section-header');
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Effets parallaxe
function initializeParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        const hero = document.querySelector('.hero');
        
        // Parallaxe pour les formes flottantes
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Parallaxe pour l'image de fond
        if (hero) {
            const heroHeight = hero.offsetHeight;
            const heroTop = hero.offsetTop;
            const heroBottom = heroTop + heroHeight;
            
            if (scrolled >= heroTop && scrolled <= heroBottom) {
                const progress = (scrolled - heroTop) / (heroHeight - window.innerHeight);
                const yOffset = progress * 100;
                hero.style.backgroundPosition = `center ${yOffset}%`;
            }
        }
    });
}

// Animations de chargement
function initializeLoadingAnimations() {
    // Animation des formes flottantes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animation des cartes d'artistes
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Effet de particules ésotériques en arrière-plan
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const isRed = Math.random() > 0.5;
        const color = isRed ? 'rgba(138, 0, 0, 0.6)' : 'rgba(74, 0, 128, 0.6)';
        particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            box-shadow: 0 0 10px ${color};
        `;
        hero.appendChild(particle);
    }
}

// Animation des particules ésotériques
const particleStyles = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(90vh) rotate(36deg) scale(1);
        }
        50% {
            transform: translateY(50vh) rotate(180deg) scale(1.2);
        }
        90% {
            opacity: 1;
            transform: translateY(10vh) rotate(324deg) scale(1);
        }
        100% {
            transform: translateY(-100px) rotate(360deg) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes mysticalGlow {
        0%, 100% {
            box-shadow: 0 0 10px rgba(138, 0, 0, 0.3);
        }
        50% {
            box-shadow: 0 0 20px rgba(138, 0, 0, 0.6), 0 0 30px rgba(74, 0, 128, 0.4);
        }
    }
`;

// Ajout des styles de particules
if (!document.querySelector('#particle-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'particle-styles';
    styleSheet.textContent = particleStyles;
    document.head.appendChild(styleSheet);
}

// Initialisation des particules après le chargement
window.addEventListener('load', function() {
    createParticles();
}); 