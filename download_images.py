#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🖼️ Script de Téléchargement d'Images - AutoLoc Bénin
Télécharge des images réelles depuis Unsplash pour le site web
"""

import requests
import os
import json
from urllib.parse import urlparse
import time

# Configuration Unsplash
UNSPLASH_ACCESS_KEY = "VOTRE_CLE_API_ICI"  # Remplacez par votre clé API
UNSPLASH_BASE_URL = "https://api.unsplash.com"

# Images à télécharger avec leurs requêtes de recherche
IMAGES_TO_DOWNLOAD = {
    # Images de véhicules
    "vehicles": {
        "citadine-economique": "compact car city driving",
        "suv-familial": "SUV family car modern",
        "berline-premium": "luxury sedan business car"
    },
    
    # Images de services
    "services": {
        "livraison-domicile": "car delivery service",
        "assurance-risques": "car insurance protection",
        "support-24-7": "customer service support",
        "reservation-en-ligne": "online booking computer"
    },
    
    # Images de galerie
    "gallery": {
        "voiture-luxe-1": "luxury car Mercedes",
        "suv-moderne-1": "modern SUV Toyota",
        "berline-elegante-1": "elegant sedan BMW",
        "voiture-sportive-1": "sports car Audi",
        "4x4-terrain-1": "4x4 off-road vehicle",
        "voiture-ville-1": "city car compact"
    },
    
    # Images d'accueil
    "hero": {
        "hero-fallback": "luxury cars benin africa",
        "hero-poster": "car rental service"
    }
}

def create_directories():
    """Crée la structure de dossiers pour les images"""
    base_dir = "media/images"
    directories = [
        "vehicles",
        "services", 
        "gallery",
        "hero",
        "logo",
        "testimonials",
        "team",
        "locations",
        "events"
    ]
    
    for dir_name in directories:
        dir_path = os.path.join(base_dir, dir_name)
        os.makedirs(dir_path, exist_ok=True)
        print(f"✅ Dossier créé : {dir_path}")

def search_unsplash_image(query, orientation="landscape"):
    """Recherche une image sur Unsplash"""
    if not UNSPLASH_ACCESS_KEY or UNSPLASH_ACCESS_KEY == "VOTRE_CLE_API_ICI":
        print("⚠️  Clé API Unsplash manquante. Utilisation d'images d'exemple.")
        return None
    
    url = f"{UNSPLASH_BASE_URL}/search/photos"
    params = {
        "query": query,
        "orientation": orientation,
        "per_page": 1,
        "client_id": UNSPLASH_ACCESS_KEY
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if data["results"]:
            return data["results"][0]
        return None
    except Exception as e:
        print(f"❌ Erreur lors de la recherche : {e}")
        return None

def download_image(url, filepath):
    """Télécharge une image depuis une URL"""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✅ Image téléchargée : {filepath}")
        return True
    except Exception as e:
        print(f"❌ Erreur lors du téléchargement : {e}")
        return False

def get_fallback_images():
    """Retourne des URLs d'images de fallback depuis Unsplash (sans API)"""
    return {
        "vehicles": {
            "citadine-economique": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
            "suv-familial": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
            "berline-premium": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
        },
        "services": {
            "livraison-domicile": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
            "assurance-risques": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            "support-24-7": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            "reservation-en-ligne": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
        },
        "gallery": {
            "voiture-luxe-1": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
            "suv-moderne-1": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop",
            "berline-elegante-1": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
            "voiture-sportive-1": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
            "4x4-terrain-1": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop",
            "voiture-ville-1": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop"
        },
        "hero": {
            "hero-fallback": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop",
            "hero-poster": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop"
        }
    }

def download_all_images():
    """Télécharge toutes les images nécessaires"""
    print("🚀 Début du téléchargement des images...")
    
    # Créer les dossiers
    create_directories()
    
    # Obtenir les images de fallback
    fallback_images = get_fallback_images()
    
    # Télécharger chaque image
    for category, images in fallback_images.items():
        print(f"\n📁 Catégorie : {category}")
        for image_name, image_url in images.items():
            # Déterminer l'extension
            parsed_url = urlparse(image_url)
            filename = os.path.basename(parsed_url.path)
            if not filename or '.' not in filename:
                filename = f"{image_name}.jpg"
            
            # Créer le chemin de destination
            dest_path = os.path.join("media/images", category, filename)
            
            # Télécharger l'image
            if download_image(image_url, dest_path):
                time.sleep(0.5)  # Pause pour éviter de surcharger le serveur
    
    print("\n🎉 Téléchargement terminé !")

def create_image_manifest():
    """Crée un fichier manifest des images téléchargées"""
    manifest = {
        "last_updated": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_images": 0,
        "categories": {}
    }
    
    base_dir = "media/images"
    for category in os.listdir(base_dir):
        if os.path.isdir(os.path.join(base_dir, category)):
            category_path = os.path.join(base_dir, category)
            images = [f for f in os.listdir(category_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
            manifest["categories"][category] = images
            manifest["total_images"] += len(images)
    
    with open("media/images/image_manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"📋 Manifest créé : {manifest['total_images']} images répertoriées")

if __name__ == "__main__":
    print("🖼️  AutoLoc Bénin - Téléchargeur d'Images")
    print("=" * 50)
    
    # Vérifier si la clé API est configurée
    if UNSPLASH_ACCESS_KEY == "VOTRE_CLE_API_ICI":
        print("⚠️  Pour utiliser l'API Unsplash, obtenez une clé gratuite sur :")
        print("   https://unsplash.com/developers")
        print("   Puis remplacez VOTRE_CLE_API_ICI dans ce script")
        print()
    
    # Télécharger les images
    download_all_images()
    
    # Créer le manifest
    create_image_manifest()
    
    print("\n🎯 Prochaines étapes :")
    print("1. Vérifiez que toutes les images sont téléchargées")
    print("2. Testez le site avec les nouvelles images")
    print("3. Personnalisez les images selon vos besoins")
    print("4. Créez votre vidéo d'accueil")