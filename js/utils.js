// ===== UTILITAIRES =====

// Préchargement des images pour une meilleure performance
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
    
    // Préchargement de l'image de fond du hero
    const heroImage = new Image();
    heroImage.src = '../images/S4D3NDC0M3.png';
    heroImage.onload = function() {
        console.log('🖼️ Image S4D3NDC0M3 chargée avec succès');
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '1';
        }
    };
    heroImage.onerror = function() {
        console.warn('⚠️ Image S4D3NDC0M3 non trouvée, utilisation du fallback');
    };
}

// Lazy loading des images
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Fonction pour formater les dates
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

// Fonction pour valider les emails
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour limiter le texte
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Fonction pour générer un ID unique
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Fonction pour détecter le support des fonctionnalités
function supportsFeature(feature) {
    switch (feature) {
        case 'intersectionObserver':
            return 'IntersectionObserver' in window;
        case 'backdropFilter':
            return CSS.supports('backdrop-filter', 'blur(10px)');
        case 'cssGrid':
            return CSS.supports('display', 'grid');
        default:
            return false;
    }
}

// Fonction pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction pour throttler les événements
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Fonction pour copier du texte dans le presse-papiers
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Texte copié !', 'success');
        }).catch(() => {
            showNotification('Erreur lors de la copie', 'error');
        });
    } else {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Texte copié !', 'success');
        } catch (err) {
            showNotification('Erreur lors de la copie', 'error');
        }
        document.body.removeChild(textArea);
    }
}

// Fonction pour partager du contenu
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).then(() => {
            showNotification('Contenu partagé !', 'success');
        }).catch(() => {
            showNotification('Erreur lors du partage', 'error');
        });
    } else {
        // Fallback : copier le lien
        copyToClipboard(url);
    }
}

// Fonction pour détecter la préférence de thème sombre
function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Fonction pour détecter la connexion lente
function isSlowConnection() {
    return navigator.connection && 
           (navigator.connection.effectiveType === 'slow-2g' || 
            navigator.connection.effectiveType === '2g');
}

// Fonction pour optimiser les images selon la connexion
function optimizeImages() {
    if (isSlowConnection()) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.srcLow) {
                img.src = img.dataset.srcLow;
            }
        });
    }
} 