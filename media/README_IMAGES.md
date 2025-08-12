# 🖼️ Guide des Images - AutoLoc Bénin

## 📸 Images pour le Site Web

### 🎯 Types d'Images Requises

#### **1. Images de Véhicules**
- **Citadine Économique** : Voiture compacte moderne
- **SUV Familial** : Véhicule spacieux et confortable
- **Berline Premium** : Voiture de luxe élégante

#### **2. Images de Services**
- **Livraison à domicile** : Service de livraison
- **Assurance tous risques** : Protection et sécurité
- **Support 24/7** : Service client
- **Réservation en ligne** : Plateforme digitale

#### **3. Images de Galerie**
- **Flotte complète** : Vue d'ensemble
- **Détails véhicules** : Intérieurs et extérieurs
- **Lieux Bénin** : Cotonou et environs

### 🎨 Spécifications Techniques

#### **Format**
- **Principal** : JPG/JPEG pour photos
- **Logo** : SVG pour le logo
- **Icônes** : SVG pour les icônes
- **Fallback** : PNG pour transparence

#### **Résolution**
- **Desktop** : 1920x1080 minimum
- **Tablet** : 1280x720
- **Mobile** : 800x600
- **Thumbnails** : 400x300

#### **Taille de Fichier**
- **Images principales** : < 500KB
- **Galerie** : < 300KB
- **Thumbnails** : < 100KB
- **Optimisation** : WebP + JPG

### 🚗 Images de Véhicules Recommandées

#### **Citadine Économique**
- **Modèles** : Toyota Yaris, Hyundai i10, Renault Clio
- **Style** : Moderne, compact, économique
- **Couleurs** : Blanc, bleu, gris métallisé
- **Contexte** : Ville, parking, route

#### **SUV Familial**
- **Modèles** : Toyota RAV4, Honda CR-V, Nissan Qashqai
- **Style** : Spacieux, confortable, polyvalent
- **Couleurs** : Blanc, noir, argent
- **Contexte** : Route, famille, voyage

#### **Berline Premium**
- **Modèles** : Mercedes Classe C, BMW Série 3, Audi A4
- **Style** : Luxueux, élégant, professionnel
- **Couleurs** : Noir, blanc, bleu métallisé
- **Contexte** : Business, événements, luxe

### 📍 Localisation Bénin

#### **Lieux à Photographier**
- **Cotonou** : Centre-ville, port, plages
- **Aéroport** : Terminal, parking, arrivées
- **Hôtels** : Zones touristiques
- **Routes** : Autoroutes principales

#### **Contexte Culturel**
- **Architecture** : Bâtiments modernes
- **Paysages** : Côte atlantique
- **Vie urbaine** : Marchés, commerces
- **Transport** : Routes, circulation

### 🎭 Style Visuel

#### **Couleurs**
- **Palette principale** : Bleus, blancs, gris
- **Accents** : Or, vert, orange
- **Contraste** : Équilibré et professionnel

#### **Composition**
- **Règle des tiers** : Composition équilibrée
- **Profondeur** : Premier plan, arrière-plan
- **Lumière** : Naturelle et professionnelle
- **Angles** : Variés et intéressants

### 📱 Optimisation Mobile

#### **Responsive Images**
```html
<picture>
    <source srcset="image-large.jpg" media="(min-width: 1200px)">
    <source srcset="image-medium.jpg" media="(min-width: 768px)">
    <img src="image-small.jpg" alt="Description">
</picture>
```

#### **Lazy Loading**
```html
<img src="image.jpg" alt="Description" loading="lazy">
```

#### **WebP Support**
```html
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>
```

### 🛠️ Outils de Création

#### **Gratuits**
- **GIMP** : Édition d'images
- **Inkscape** : Création SVG
- **Canva** : Design en ligne
- **Unsplash** : Photos gratuites

#### **Payants**
- **Adobe Photoshop** : Édition professionnelle
- **Adobe Illustrator** : Création vectorielle
- **Sketch** : Design UI/UX
- **Figma** : Design collaboratif

### 📊 Optimisation Performance

#### **Compression**
- **JPG** : Qualité 80-85%
- **PNG** : Optimisation des couleurs
- **WebP** : Format moderne et léger
- **SVG** : Code optimisé

#### **CDN et Cache**
- **Distribution** : Géographique
- **Cache** : Navigateur et serveur
- **Compression** : GZIP/Brotli
- **Lazy Loading** : Chargement différé

### 🎯 Exemples d'Images

#### **Logo AutoLoc Bénin**
```svg
<svg width="200" height="200" viewBox="0 0 200 200">
    <!-- Logo SVG personnalisé -->
</svg>
```

#### **Icône de Voiture**
```svg
<svg width="100" height="100" viewBox="0 0 100 100">
    <!-- Icône de voiture -->
</svg>
```

#### **Image de Véhicule**
```html
<img src="media/images/vehicles/citadine-economique.jpg" 
     alt="Citadine économique Toyota Yaris" 
     class="vehicle-img">
```

### 📝 Checklist des Images

- [ ] **Logo** créé en SVG
- [ ] **Images véhicules** haute qualité
- [ ] **Images services** professionnelles
- [ ] **Galerie** complète et variée
- [ ] **Optimisation** pour le web
- [ ] **Alt text** descriptif
- [ ] **Responsive** design
- [ ] **Lazy loading** implémenté

### 🚀 Conseils de Production

1. **Qualité** : Privilégiez la haute résolution
2. **Cohérence** : Style visuel uniforme
3. **Optimisation** : Taille et format adaptés
4. **Accessibilité** : Textes alternatifs
5. **Performance** : Chargement rapide
6. **Mobile** : Responsive design

---

## 🖼️ Exemples d'Images SVG

### **Logo AutoLoc Bénin**
```svg
<svg width="200" height="200" viewBox="0 0 200 200">
    <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <!-- Cercle de fond -->
    <circle cx="100" cy="100" r="90" fill="url(#logoGradient)" stroke="#1e40af" stroke-width="4"/>
    
    <!-- Voiture stylisée -->
    <rect x="40" y="120" width="120" height="40" rx="20" fill="white"/>
    <rect x="50" y="100" width="100" height="30" rx="15" fill="white"/>
    <rect x="70" y="80" width="60" height="25" rx="12" fill="white"/>
    
    <!-- Roues -->
    <circle cx="70" cy="160" r="18" fill="#1e40af"/>
    <circle cx="130" cy="160" r="18" fill="#1e40af"/>
    
    <!-- Phares -->
    <circle cx="60" cy="95" r="8" fill="#fbbf24"/>
    <circle cx="140" cy="95" r="8" fill="#fbbf24"/>
    
    <!-- Vitres -->
    <path d="M75 85 L125 85 L120 65 L80 65 Z" fill="#dbeafe"/>
</svg>
```

### **Icône de Service**
```svg
<svg width="100" height="100" viewBox="0 0 100 100">
    <!-- Icône de livraison -->
    <circle cx="50" cy="50" r="45" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/>
    
    <!-- Camion de livraison -->
    <rect x="25" y="60" width="50" height="25" rx="5" fill="#2563eb"/>
    <rect x="30" y="45" width="40" height="20" rx="3" fill="#3b82f6"/>
    
    <!-- Roues -->
    <circle cx="35" cy="85" r="8" fill="#1e40af"/>
    <circle cx="65" cy="85" r="8" fill="#1e40af"/>
    
    <!-- Phare -->
    <circle cx="70" cy="55" r="5" fill="#fbbf24"/>
</svg>
```

---

**Vos images feront de votre site une vitrine professionnelle et attrayante ! 🖼️✨**