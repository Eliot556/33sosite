// ===== FICHIER PRINCIPAL JAVASCRIPT =====

// Protection globale contre le clic droit
function initializeImageProtection() {
    // Désactiver le clic droit sur tout le document
    document.addEventListener('contextmenu', (e) => {
        // Permettre le clic droit sur les éléments interactifs (boutons, liens, etc.)
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
            return true;
        }
        
        // Empêcher le clic droit sur les images et autres éléments
        if (e.target.tagName === 'IMG' || e.target.closest('.gallery-item') || e.target.closest('.artwork-card')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Désactiver la sélection de texte sur les images
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.closest('.gallery-item') || e.target.closest('.artwork-card')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Désactiver le glisser-déposer sur les images
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation de 33s0t3rror11smee...');
    
    // Initialisation des modules
    initializeNavigation();
    initializeGallery();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeLoadingAnimations();
    initializeLazyLoading();
    initializeImageProtection();
    
    // Optimisations
    optimizeImages();
    
    console.log('✅ 33s0t3rror11smee initialisé avec succès !');
});

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript:', e.error);
});

// Gestion des promesses rejetées
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesse rejetée:', e.reason);
}); 