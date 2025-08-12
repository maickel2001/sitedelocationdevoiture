#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🖼️ Script Simple de Téléchargement d'Images - AutoLoc Bénin
Télécharge des images réelles depuis des URLs fiables
"""

import urllib.request
import os
import time
from urllib.parse import urlparse

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
        "news",
        "partners",
        "locations"
    ]
    
    for dir_name in directories:
        dir_path = os.path.join(base_dir, dir_name)
        os.makedirs(dir_path, exist_ok=True)
        print(f"✅ Dossier créé : {dir_path}")

def download_image(url, filepath):
    """Télécharge une image depuis une URL"""
    try:
        print(f"📥 Téléchargement : {url}")
        
        # Configuration de l'User-Agent pour éviter les blocages
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        
        print(f"✅ Image téléchargée : {filepath}")
        return True
    except Exception as e:
        print(f"❌ Erreur lors du téléchargement : {e}")
        return False

def get_image_urls():
    """Retourne les URLs des images à télécharger"""
    return {
        "vehicles": {
            "citadine-economique": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80",
            "suv-familial": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&q=80",
            "berline-premium": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&q=80"
        },
        "services": {
            "livraison-domicile": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&q=80",
            "assurance-risques": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80",
            "support-24-7": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80",
            "reservation-en-ligne": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80"
        },
        "gallery": {
            "voiture-luxe-1": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&q=80",
            "suv-moderne-1": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80",
            "berline-elegante-1": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&q=80",
            "voiture-sportive-1": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80",
            "4x4-terrain-1": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80",
            "voiture-ville-1": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&q=80"
        },
        "hero": {
            "hero-fallback": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&q=80",
            "hero-poster": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&q=80"
        },
        "testimonials": {
            "client-1": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
            "client-2": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
            "client-3": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&q=80"
        },
        "team": {
            "directeur": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
            "manager": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&q=80",
            "technicien": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80"
        },
        "news": {
            "route-benin": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80",
            "maintenance-voiture": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&q=80",
            "evenements-benin": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80"
        },
        "partners": {
            "assurance-logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80",
            "hotel-logo": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&q=80",
            "restaurant-logo": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=80",
            "airline-logo": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&q=80"
        },
        "locations": {
            "agence-cotonou": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80",
            "agence-aeroport": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80",
            "agence-portonovo": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&q=80"
        }
    }

def download_all_images():
    """Télécharge toutes les images nécessaires"""
    print("🚀 Début du téléchargement des images...")
    print("=" * 60)
    
    # Créer les dossiers
    create_directories()
    
    # Obtenir les URLs des images
    image_urls = get_image_urls()
    
    total_images = 0
    downloaded_images = 0
    
    # Télécharger chaque image
    for category, images in image_urls.items():
        print(f"\n📁 Catégorie : {category.upper()}")
        print("-" * 40)
        
        for image_name, image_url in images.items():
            total_images += 1
            
            # Créer le nom de fichier
            filename = f"{image_name}.jpg"
            dest_path = os.path.join("media/images", category, filename)
            
            # Télécharger l'image
            if download_image(image_url, dest_path):
                downloaded_images += 1
            
            # Pause pour éviter de surcharger le serveur
            time.sleep(0.5)
    
    print("\n" + "=" * 60)
    print(f"🎉 Téléchargement terminé !")
    print(f"📊 Résumé : {downloaded_images}/{total_images} images téléchargées")
    
    if downloaded_images < total_images:
        print(f"⚠️  {total_images - downloaded_images} images n'ont pas pu être téléchargées")
        print("   Vérifiez votre connexion internet et réessayez")

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
    
    manifest_path = os.path.join(base_dir, "image_manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        import json
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"📋 Manifest créé : {manifest['total_images']} images répertoriées")
    print(f"   📄 Fichier : {manifest_path}")

if __name__ == "__main__":
    print("🖼️  AutoLoc Bénin - Téléchargeur d'Images Simple")
    print("=" * 60)
    
    # Télécharger les images
    download_all_images()
    
    # Créer le manifest
    create_image_manifest()
    
    print("\n🎯 Prochaines étapes :")
    print("1. ✅ Vérifiez que toutes les images sont téléchargées")
    print("2. 🖥️  Testez le site avec les nouvelles images")
    print("3. 🎨 Personnalisez les images selon vos besoins")
    print("4. 🎬 Créez votre vidéo d'accueil")
    print("5. 🚀 Déployez sur Hostinger !")