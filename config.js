// 🎬 Configuration des Médias - AutoLoc Bénin

const MEDIA_CONFIG = {
    // Configuration des vidéos
    videos: {
        hero: {
            primary: 'media/videos/hero-video.mp4',
            fallback: 'media/images/hero-fallback.jpg',
            poster: 'media/images/hero-poster.jpg',
            autoplay: true,
            muted: true,
            loop: true,
            playsinline: true
        }
    },

    // Configuration des images de véhicules
    vehicles: {
        citadine: {
            main: 'media/images/vehicles/citadine-economique.jpg',
            thumbnail: 'media/images/vehicles/citadine-thumb.jpg',
            alt: 'Citadine économique Toyota Yaris - Location de voiture au Bénin'
        },
        suv: {
            main: 'media/images/vehicles/suv-familial.jpg',
            thumbnail: 'media/images/vehicles/suv-thumb.jpg',
            alt: 'SUV familial Toyota RAV4 - Location de voiture au Bénin'
        },
        berline: {
            main: 'media/images/vehicles/berline-premium.jpg',
            thumbnail: 'media/images/vehicles/berline-thumb.jpg',
            alt: 'Berline premium Mercedes Classe C - Location de voiture au Bénin'
        }
    },

    // Configuration des images de services
    services: {
        livraison: {
            main: 'media/images/services/livraison-domicile.jpg',
            alt: 'Service de livraison à domicile - AutoLoc Bénin'
        },
        assurance: {
            main: 'media/images/services/assurance-risques.jpg',
            alt: 'Assurance tous risques incluse - AutoLoc Bénin'
        },
        support: {
            main: 'media/images/services/support-24-7.jpg',
            alt: 'Support client 24/7 - AutoLoc Bénin'
        },
        reservation: {
            main: 'media/images/services/reservation-en-ligne.jpg',
            alt: 'Réservation en ligne sécurisée - AutoLoc Bénin'
        }
    },

    // Configuration de la galerie
    gallery: {
        images: [
            {
                src: 'media/images/gallery/voiture-luxe-1.jpg',
                alt: 'Voiture de luxe Mercedes - AutoLoc Bénin',
                category: 'luxe'
            },
            {
                src: 'media/images/gallery/suv-moderne-1.jpg',
                alt: 'SUV moderne Toyota RAV4 - AutoLoc Bénin',
                category: 'suv'
            },
            {
                src: 'media/images/gallery/berline-elegante-1.jpg',
                alt: 'Berline élégante BMW Série 3 - AutoLoc Bénin',
                category: 'berline'
            },
            {
                src: 'media/images/gallery/voiture-sportive-1.jpg',
                alt: 'Voiture sportive Audi - AutoLoc Bénin',
                category: 'sport'
            },
            {
                src: 'media/images/gallery/4x4-terrain-1.jpg',
                alt: '4x4 tout-terrain - AutoLoc Bénin',
                category: '4x4'
            },
            {
                src: 'media/images/gallery/voiture-ville-1.jpg',
                alt: 'Voiture de ville compacte - AutoLoc Bénin',
                category: 'citadine'
            }
        ]
    },

    // Configuration des images de fallback
    fallbacks: {
        hero: 'media/images/fallbacks/hero-default.jpg',
        vehicle: 'media/images/fallbacks/vehicle-default.jpg',
        service: 'media/images/fallbacks/service-default.jpg',
        gallery: 'media/images/fallbacks/gallery-default.jpg'
    },

    // Configuration des logos et icônes
    branding: {
        logo: {
            primary: 'media/images/logo/autoloc-benin-logo.svg',
            white: 'media/images/logo/autoloc-benin-logo-white.svg',
            favicon: 'media/images/logo/favicon.ico'
        },
        icons: {
            car: 'media/images/icons/car-icon.svg',
            delivery: 'media/images/icons/delivery-icon.svg',
            insurance: 'media/images/icons/insurance-icon.svg',
            support: 'media/images/icons/support-icon.svg',
            booking: 'media/images/icons/booking-icon.svg'
        }
    }
};

// Configuration des chemins de base
const BASE_PATHS = {
    media: '/media/',
    images: '/media/images/',
    videos: '/media/videos/',
    icons: '/media/images/icons/',
    logo: '/media/images/logo/'
};

// Configuration des formats d'images supportés
const SUPPORTED_FORMATS = {
    images: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
    videos: ['mp4', 'webm', 'ogg'],
    audio: ['mp3', 'wav', 'ogg']
};

// Configuration de l'optimisation
const OPTIMIZATION_CONFIG = {
    images: {
        quality: 85,
        format: 'webp',
        fallback: 'jpg',
        lazyLoading: true,
        responsive: true
    },
    videos: {
        compression: 'h264',
        quality: 'high',
        autoplay: true,
        muted: true,
        loop: true
    }
};

// Fonction pour obtenir l'URL d'une image
function getImageUrl(path, size = 'main') {
    if (!path) return MEDIA_CONFIG.fallbacks.vehicle;
    
    // Si c'est une URL externe, la retourner telle quelle
    if (path.startsWith('http')) {
        return path;
    }
    
    // Sinon, construire le chemin local
    return BASE_PATHS.media + path;
}

// Fonction pour obtenir l'URL d'une vidéo
function getVideoUrl(path) {
    if (!path) return MEDIA_CONFIG.videos.hero.fallback;
    
    if (path.startsWith('http')) {
        return path;
    }
    
    return BASE_PATHS.media + path;
}

// Fonction pour vérifier si une image existe
async function checkImageExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Fonction pour charger une image avec fallback
async function loadImageWithFallback(element, primarySrc, fallbackSrc) {
    if (await checkImageExists(primarySrc)) {
        element.src = primarySrc;
    } else {
        element.src = fallbackSrc;
        console.warn(`Image non trouvée: ${primarySrc}, utilisation du fallback: ${fallbackSrc}`);
    }
}

// Fonction pour optimiser les images
function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        observer.observe(img);
    });
}

// Fonction pour gérer les erreurs d'images
function handleImageErrors() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            const category = e.target.dataset.category || 'vehicle';
            e.target.src = MEDIA_CONFIG.fallbacks[category] || MEDIA_CONFIG.fallbacks.vehicle;
        }
    }, true);
}

// Configuration des métadonnées des images
const IMAGE_METADATA = {
    vehicles: {
        citadine: {
            title: 'Citadine Économique Toyota Yaris',
            description: 'Voiture compacte et économique pour la ville',
            keywords: ['citadine', 'économique', 'Toyota', 'Yaris', 'Bénin']
        },
        suv: {
            title: 'SUV Familial Toyota RAV4',
            description: 'Véhicule spacieux et confortable pour la famille',
            keywords: ['SUV', 'familial', 'Toyota', 'RAV4', 'Bénin']
        },
        berline: {
            title: 'Berline Premium Mercedes Classe C',
            description: 'Voiture de luxe élégante et performante',
            keywords: ['berline', 'premium', 'Mercedes', 'Classe C', 'Bénin']
        }
    }
};

// Export des configurations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MEDIA_CONFIG,
        BASE_PATHS,
        SUPPORTED_FORMATS,
        OPTIMIZATION_CONFIG,
        getImageUrl,
        getVideoUrl,
        checkImageExists,
        loadImageWithFallback,
        optimizeImages,
        handleImageErrors,
        IMAGE_METADATA
    };
} else {
    // Pour utilisation dans le navigateur
    window.MEDIA_CONFIG = MEDIA_CONFIG;
    window.BASE_PATHS = BASE_PATHS;
    window.getImageUrl = getImageUrl;
    window.getVideoUrl = getVideoUrl;
    window.optimizeImages = optimizeImages;
    window.handleImageErrors = handleImageErrors;
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
    handleImageErrors();
    
    console.log('🎬 Configuration des médias AutoLoc Bénin chargée !');
});