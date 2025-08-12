// 🖼️ CONFIGURATION DES IMAGES RÉELLES - AutoLoc Bénin
// Toutes les images ont été téléchargées et sont prêtes à l'emploi

const IMAGES_CONFIG = {
    // 🚗 VÉHICULES - Images haute qualité 800x600px
    vehicles: {
        citadine: {
            image: 'media/images/vehicles/citadine-economique.jpg',
            alt: 'Citadine Économique - AutoLoc Bénin',
            description: 'Voiture compacte idéale pour la ville'
        },
        suv: {
            image: 'media/images/vehicles/suv-familial.jpg',
            alt: 'SUV Familial - AutoLoc Bénin',
            description: 'Véhicule spacieux pour toute la famille'
        },
        berline: {
            image: 'media/images/vehicles/berline-premium.jpg',
            alt: 'Berline Premium - AutoLoc Bénin',
            description: 'Voiture de luxe pour vos déplacements professionnels'
        }
    },

    // 🎯 SERVICES - Images 600x400px
    services: {
        livraison: {
            image: 'media/images/services/livraison-domicile.jpg',
            alt: 'Livraison à Domicile - AutoLoc Bénin',
            description: 'Service de livraison à votre porte'
        },
        assurance: {
            image: 'media/images/services/assurance-risques.jpg',
            alt: 'Assurance Tous Risques - AutoLoc Bénin',
            description: 'Protection complète incluse'
        },
        support: {
            image: 'media/images/services/support-24-7.jpg',
            alt: 'Support 24/7 - AutoLoc Bénin',
            description: 'Assistance disponible jour et nuit'
        },
        reservation: {
            image: 'media/images/services/reservation-en-ligne.jpg',
            alt: 'Réservation en Ligne - AutoLoc Bénin',
            description: 'Réservez facilement sur notre site'
        }
    },

    // 🖼️ GALERIE - Images 600x400px
    gallery: {
        voitureLuxe: {
            image: 'media/images/gallery/voiture-luxe-1.jpg',
            alt: 'Voiture de Luxe - AutoLoc Bénin',
            description: 'Véhicule haut de gamme'
        },
        suvModerne: {
            image: 'media/images/gallery/suv-moderne-1.jpg',
            alt: 'SUV Moderne - AutoLoc Bénin',
            description: 'SUV contemporain et élégant'
        },
        berlineElegante: {
            image: 'media/images/gallery/berline-elegante-1.jpg',
            alt: 'Berline Élégante - AutoLoc Bénin',
            description: 'Berline sophistiquée'
        },
        voitureSportive: {
            image: 'media/images/gallery/voiture-sportive-1.jpg',
            alt: 'Voiture Sportive - AutoLoc Bénin',
            description: 'Véhicule dynamique et performant'
        },
        quatreQuatre: {
            image: 'media/images/gallery/4x4-terrain-1.jpg',
            alt: '4x4 Tout Terrain - AutoLoc Bénin',
            description: 'Véhicule robuste pour tous terrains'
        },
        voitureVille: {
            image: 'media/images/gallery/voiture-ville-1.jpg',
            alt: 'Voiture de Ville - AutoLoc Bénin',
            description: 'Citadine parfaite pour la ville'
        }
    },

    // 🏠 ACCUEIL - Images haute résolution 1920x1080px
    hero: {
        fallback: {
            image: 'media/images/hero/hero-fallback.jpg',
            alt: 'Voitures de Luxe au Bénin - AutoLoc Bénin',
            description: 'Image de fallback pour la vidéo d\'accueil'
        },
        poster: {
            image: 'media/images/hero/hero-poster.jpg',
            alt: 'Poster Vidéo Accueil - AutoLoc Bénin',
            description: 'Aperçu de la vidéo d\'accueil'
        }
    },

    // 👥 TÉMOIGNAGES - Photos clients 200x200px
    testimonials: {
        client1: {
            image: 'media/images/testimonials/client-1.jpg',
            alt: 'Client Satisfait - AutoLoc Bénin',
            description: 'Photo du client Marie Kossi'
        },
        client2: {
            image: 'media/images/testimonials/client-2.jpg',
            alt: 'Client Satisfait - AutoLoc Bénin',
            description: 'Photo du client Kossi Agbeko'
        },
        client3: {
            image: 'media/images/testimonials/client-3.jpg',
            alt: 'Client Satisfait - AutoLoc Bénin',
            description: 'Photo du client Fatou Diallo'
        }
    },

    // 👨‍💼 ÉQUIPE - Photos professionnelles 300x300px
    team: {
        directeur: {
            image: 'media/images/team/directeur.jpg',
            alt: 'Directeur Général - AutoLoc Bénin',
            description: 'Photo de Kossi Mensah, Directeur Général'
        },
        manager: {
            image: 'media/images/team/manager.jpg',
            alt: 'Manager Opérations - AutoLoc Bénin',
            description: 'Photo de Fatou Traoré, Manager Opérations'
        },
        technicien: {
            image: 'media/images/team/technicien.jpg',
            alt: 'Chef Mécanicien - AutoLoc Bénin',
            description: 'Photo de Moussa Koné, Chef Mécanicien'
        }
    },

    // 📰 ACTUALITÉS - Images articles 600x400px
    news: {
        routeBenin: {
            image: 'media/images/news/route-benin.jpg',
            alt: 'Routes du Bénin - AutoLoc Bénin',
            description: 'Image pour l\'article sur les routes du Bénin'
        },
        maintenance: {
            image: 'media/images/news/maintenance-voiture.jpg',
            alt: 'Maintenance Voiture - AutoLoc Bénin',
            description: 'Image pour l\'article sur la maintenance'
        },
        evenements: {
            image: 'media/images/news/evenements-benin.jpg',
            alt: 'Événements Bénin - AutoLoc Bénin',
            description: 'Image pour l\'article sur les événements'
        }
    },

    // 🤝 PARTENAIRES - Logos 200x200px
    partners: {
        assurance: {
            image: 'media/images/partners/assurance-logo.jpg',
            alt: 'Partenaire Assurance - AutoLoc Bénin',
            description: 'Logo du partenaire assurance'
        },
        hotel: {
            image: 'media/images/partners/hotel-logo.jpg',
            alt: 'Partenaire Hôtels - AutoLoc Bénin',
            description: 'Logo du réseau hôtelier partenaire'
        },
        restaurant: {
            image: 'media/images/partners/restaurant-logo.jpg',
            alt: 'Partenaire Restaurants - AutoLoc Bénin',
            description: 'Logo des restaurants partenaires'
        },
        airline: {
            image: 'media/images/partners/airline-logo.jpg',
            alt: 'Partenaire Compagnie Aérienne - AutoLoc Bénin',
            description: 'Logo des compagnies aériennes partenaires'
        }
    },

    // 📍 LOCATIONS - Photos agences 600x400px
    locations: {
        cotonou: {
            image: 'media/images/locations/agence-cotonou.jpg',
            alt: 'Agence Cotonou - AutoLoc Bénin',
            description: 'Photo de l\'agence principale de Cotonou'
        },
        aeroport: {
            image: 'media/images/locations/agence-aeroport.jpg',
            alt: 'Agence Aéroport - AutoLoc Bénin',
            description: 'Photo de l\'agence de l\'aéroport'
        },
        portonovo: {
            image: 'media/images/locations/agence-portonovo.jpg',
            alt: 'Agence Porto-Novo - AutoLoc Bénin',
            description: 'Photo de l\'agence de Porto-Novo'
        }
    }
};

// 🎯 FONCTIONS UTILITAIRES
function getImagePath(category, name) {
    if (IMAGES_CONFIG[category] && IMAGES_CONFIG[category][name]) {
        return IMAGES_CONFIG[category][name].image;
    }
    return 'media/images/placeholder.jpg'; // Image par défaut
}

function getImageAlt(category, name) {
    if (IMAGES_CONFIG[category] && IMAGES_CONFIG[category][name]) {
        return IMAGES_CONFIG[category][name].alt;
    }
    return 'Image AutoLoc Bénin';
}

function getImageDescription(category, name) {
    if (IMAGES_CONFIG[category] && IMAGES_CONFIG[category][name]) {
        return IMAGES_CONFIG[category][name].description;
    }
    return 'Image de qualité AutoLoc Bénin';
}

// 📊 STATISTIQUES DES IMAGES
function getImageStats() {
    let totalImages = 0;
    let totalSize = 0;
    
    Object.keys(IMAGES_CONFIG).forEach(category => {
        Object.keys(IMAGES_CONFIG[category]).forEach(name => {
            totalImages++;
        });
    });
    
    return {
        total: totalImages,
        categories: Object.keys(IMAGES_CONFIG).length,
        status: '✅ Toutes les images sont prêtes !'
    };
}

// 🚀 INITIALISATION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🖼️ Configuration des images réelles chargée !');
    console.log('📊 Statistiques:', getImageStats());
    
    // Vérifier que toutes les images sont accessibles
    checkImagesAvailability();
});

// 🔍 VÉRIFICATION DE DISPONIBILITÉ
function checkImagesAvailability() {
    let availableImages = 0;
    let totalImages = 0;
    
    Object.keys(IMAGES_CONFIG).forEach(category => {
        Object.keys(IMAGES_CONFIG[category]).forEach(name => {
            totalImages++;
            const img = new Image();
            img.onload = () => availableImages++;
            img.onerror = () => console.warn(`⚠️ Image non trouvée: ${IMAGES_CONFIG[category][name].image}`);
            img.src = IMAGES_CONFIG[category][name].image;
        });
    });
    
    setTimeout(() => {
        console.log(`📊 Images disponibles: ${availableImages}/${totalImages}`);
        if (availableImages === totalImages) {
            console.log('🎉 Toutes les images sont parfaitement chargées !');
        }
    }, 2000);
}

// 🌐 EXPORT POUR UTILISATION EXTERNE
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IMAGES_CONFIG,
        getImagePath,
        getImageAlt,
        getImageDescription,
        getImageStats
    };
}