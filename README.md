# 🚗 AutoLoc Bénin - Site de Location de Voitures

Un site web moderne et responsive pour la location de voitures au Bénin, conçu pour être déployé sur Hostinger.

## ✨ Caractéristiques

- **Design moderne et responsive** - S'adapte à tous les appareils
- **Images générées en interne** - Utilise des SVG et CSS pour les illustrations
- **Animations fluides** - Effets visuels attrayants et performants
- **Formulaire de contact fonctionnel** - Gestion des réservations
- **Navigation fluide** - Défilement automatique entre sections
- **Optimisé pour Hostinger** - Compatible avec tous les hébergeurs web
- **Interface en français** - Adaptée au marché béninois

## 🚀 Technologies utilisées

- **HTML5** - Structure sémantique moderne
- **CSS3** - Styles avancés avec animations et transitions
- **JavaScript vanilla** - Interactivité sans framework
- **SVG** - Images vectorielles générées en interne
- **Responsive Design** - Mobile-first approach

## 📁 Structure du projet

```
autoloc-benin/
├── index.html          # Page principale
├── styles.css          # Styles et animations
├── script.js           # Fonctionnalités JavaScript
├── README.md           # Documentation
└── .gitignore          # Fichiers à ignorer
```

## 🛠️ Installation

### Option 1 : Déploiement direct sur Hostinger

1. **Téléchargez les fichiers** depuis ce repository
2. **Connectez-vous à votre panneau Hostinger**
3. **Accédez au gestionnaire de fichiers** ou utilisez FTP
4. **Uploadez tous les fichiers** dans le dossier `public_html`
5. **Votre site sera accessible** immédiatement

### Option 2 : Développement local

1. **Clonez le repository**
   ```bash
   git clone [url-du-repo]
   cd autoloc-benin
   ```

2. **Ouvrez le projet** dans votre éditeur de code

3. **Lancez un serveur local**
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js
   npx serve .
   
   # Avec PHP
   php -S localhost:8000
   ```

4. **Ouvrez votre navigateur** sur `http://localhost:8000`

## 🌐 Déploiement sur Hostinger

### Étapes détaillées

1. **Préparation des fichiers**
   - Assurez-vous que tous les fichiers sont dans le bon dossier
   - Vérifiez que `index.html` est à la racine

2. **Upload via cPanel**
   - Connectez-vous à votre cPanel Hostinger
   - Ouvrez le **Gestionnaire de fichiers**
   - Naviguez vers `public_html`
   - Uploadez tous les fichiers

3. **Upload via FTP**
   - Utilisez un client FTP (FileZilla, WinSCP)
   - Connectez-vous avec vos identifiants Hostinger
   - Uploadez les fichiers dans le dossier racine

4. **Vérification**
   - Votre site sera accessible sur votre nom de domaine
   - Testez sur mobile et desktop
   - Vérifiez que toutes les fonctionnalités marchent

### Configuration recommandée

- **Nom de domaine** : `autoloc-benin.bj` ou similaire
- **SSL** : Activez le certificat SSL gratuit Hostinger
- **Cache** : Activez le cache du navigateur
- **Compression** : Activez la compression GZIP

## 🎨 Personnalisation

### Modifier les couleurs

Dans `styles.css`, modifiez les variables CSS :

```css
:root {
    --primary-color: #2563eb;      /* Couleur principale */
    --secondary-color: #1e40af;    /* Couleur secondaire */
    --accent-color: #10b981;       /* Couleur d'accent */
    --text-color: #1e293b;         /* Couleur du texte */
}
```

### Modifier le contenu

1. **Informations de contact** : Modifiez `index.html`
2. **Prix des véhicules** : Mettez à jour les tarifs
3. **Images SVG** : Personnalisez les illustrations
4. **Texte** : Adaptez le contenu à votre entreprise

### Ajouter des véhicules

Dans `index.html`, dupliquez la section `vehicle-card` :

```html
<div class="vehicle-card">
    <div class="vehicle-image">
        <!-- Votre SVG personnalisé -->
    </div>
    <div class="vehicle-info">
        <h3>Nom du véhicule</h3>
        <!-- Autres informations -->
    </div>
</div>
```

## 📱 Responsive Design

Le site est optimisé pour :
- **Desktop** : 1200px et plus
- **Tablet** : 768px - 1199px
- **Mobile** : 320px - 767px

## 🚀 Optimisations

### Performance
- Images SVG légères
- CSS et JS minifiés
- Animations optimisées
- Lazy loading des éléments

### SEO
- Balises meta optimisées
- Structure HTML sémantique
- Images avec attributs alt
- URLs propres et descriptives

### Accessibilité
- Navigation au clavier
- Attributs ARIA
- Contraste des couleurs
- Textes alternatifs

## 🔧 Maintenance

### Mises à jour régulières
- Vérifiez les liens
- Testez le formulaire
- Mettez à jour les prix
- Ajoutez de nouveaux véhicules

### Monitoring
- Utilisez Google Analytics
- Surveillez les performances
- Testez sur différents navigateurs
- Vérifiez la compatibilité mobile

## 📞 Support

Pour toute question ou assistance :
- **Email** : contact@autoloc-benin.bj
- **Téléphone** : +229 21 30 12 34
- **Documentation** : Consultez ce README

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

## 🎯 Fonctionnalités futures

- **Système de réservation en ligne**
- **Gestion des disponibilités**
- **Paiement en ligne**
- **Application mobile**
- **Gestion des clients**
- **Rapports et statistiques**

---

**AutoLoc Bénin** - Votre partenaire de confiance pour la location de véhicules au Bénin 🚗✨