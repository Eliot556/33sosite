// ===== GALERIE =====

// Modal pour les œuvres d'art
function initializeArtworkModal() {
    const artworkCards = document.querySelectorAll('.artwork-card');
    
    artworkCards.forEach(card => {
        card.addEventListener('click', function() {
            const image = this.querySelector('img');
            const title = this.querySelector('h3')?.textContent || 'Œuvre d\'art';
            const artist = this.querySelector('p')?.textContent || 'Artiste';
            
            showArtworkModal(image.src, title, artist);
        });
    });
    
    // Protection contre le clic droit sur toutes les images de la galerie
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        // Désactiver le clic droit
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Désactiver le glisser-déposer
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Désactiver la sélection
        img.addEventListener('selectstart', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Attribut draggable
        img.setAttribute('draggable', 'false');
    });
}

function showArtworkModal(imageSrc, title, artist) {
    // Création du modal
    const modal = document.createElement('div');
    modal.className = 'artwork-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-image">
                    <img src="${imageSrc}" alt="${title}" draggable="false">
                </div>
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p class="artist-name">${artist}</p>
                    <div class="modal-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-heart"></i>
                            Ajouter aux favoris
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-share"></i>
                            Partager
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Styles du modal
    const modalStyles = `
        .artwork-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            background: var(--card-background);
            border-radius: 20px;
            max-width: 90vw;
            max-height: 90vh;
            width: auto;
            height: auto;
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(138, 0, 0, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), var(--glow);
            display: flex;
            flex-direction: column;
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(138, 0, 0, 0.8);
            border: none;
            color: var(--text-color);
            font-size: 2rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
            transition: var(--transition);
        }
        
        .modal-close:hover {
            background: var(--secondary-color);
            transform: scale(1.1);
        }
        
        .modal-image {
            width: 100%;
            height: auto;
            max-height: 70vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--dark-background);
        }
        
        .modal-image img {
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        
        .modal-info {
            padding: 30px;
            flex-shrink: 0;
        }
        
        .modal-info h3 {
            color: var(--text-color);
            font-size: 1.8rem;
            margin-bottom: 10px;
            font-family: 'Playfair Display', serif;
        }
        
        .artist-name {
            color: var(--secondary-color);
            font-size: 1.2rem;
            margin-bottom: 20px;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .modal-actions .btn {
            flex: 1;
            min-width: 150px;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                margin: 10px;
                max-width: 95vw;
                max-height: 95vh;
            }
            
            .modal-image {
                max-height: 60vh;
            }
            
            .modal-info {
                padding: 20px;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    // Ajout des styles
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Ajout du modal au body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animation d'entrée
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Protection contre le clic droit et la sélection
    const modalImage = modal.querySelector('.modal-image img');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    // Désactiver le clic droit sur l'image
    modalImage.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Désactiver le clic droit sur tout le modal
    modalOverlay.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Désactiver la sélection de texte
    modalOverlay.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Désactiver le glisser-déposer
    modalImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Gestion de la fermeture
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    };
    
    // Événements de fermeture
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            closeModal();
        }
    });
    
    // Fermeture avec Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Initialisation de la galerie
function initializeGallery() {
    initializeArtworkModal();
} 