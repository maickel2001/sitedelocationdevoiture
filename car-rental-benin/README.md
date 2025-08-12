# 🚗 Car Rental Bénin - Plateforme de Location de Voitures

Une plateforme complète de location de voitures adaptée au marché béninois, avec système de paiement Mobile Money manuel et gestion administrative complète.

## ✨ Fonctionnalités

### 🏠 Page d'accueil
- Moteur de recherche avancé (ville, dates, type de voiture, prix)
- Affichage des véhicules disponibles avec filtres
- Design responsive et moderne

### 🚙 Gestion des véhicules
- Catalogue complet avec photos multiples
- Détails détaillés et informations techniques
- Système de disponibilité en temps réel

### 📅 Système de réservation
- Sélection de dates avec validation
- Calcul automatique des prix
- Gestion des conflits de réservation

### 💰 Paiement Mobile Money
- Support MTN MoMo et Moov Money
- Upload de preuves de paiement (images/PDF)
- Validation manuelle par l'administrateur
- Envoi automatique d'emails de confirmation/refus

### 👨‍💼 Dashboard Administrateur
- Gestion des réservations et paiements
- Validation/refus des preuves de paiement
- Statistiques et rapports
- Interface intuitive et sécurisée

### 🔐 Authentification
- Connexion par email et Google OAuth
- Gestion des rôles (USER/ADMIN)
- Sessions sécurisées

## 🛠️ Technologies utilisées

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: API Routes Next.js (server components)
- **Base de données**: MySQL via Prisma ORM
- **Stockage fichiers**: Cloudinary
- **Authentification**: NextAuth.js
- **Emails**: SendGrid
- **UI Components**: Lucide React Icons

## 📋 Prérequis

- Node.js 18+ 
- MySQL 8.0+
- Compte Cloudinary
- Compte SendGrid (optionnel)

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone <repository-url>
cd car-rental-benin
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration des variables d'environnement
```bash
cp .env.example .env
```

Remplir le fichier `.env` avec vos informations :

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/car_rental_benin"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# SendGrid (pour les emails)
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"

# Mobile Money Numbers (à personnaliser)
MTN_MOMO_NUMBER="+229 XX XX XX XX"
MOOV_MONEY_NUMBER="+229 YY YY YY YY"
```

### 4. Configuration de la base de données

#### Créer la base de données MySQL
```sql
CREATE DATABASE car_rental_benin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Générer et appliquer les migrations Prisma
```bash
npx prisma migrate dev --name init
```

#### Générer le client Prisma
```bash
npx prisma generate
```

#### Ajouter des données de test (optionnel)
```bash
npm run db:seed
```

### 5. Lancer l'application
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🌐 Déploiement sur Hostinger

### Option 1: VPS Hostinger

#### 1. Préparer le serveur
```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js et npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer MySQL
sudo apt install mysql-server -y

# Installer PM2 pour la gestion des processus
sudo npm install -g pm2
```

#### 2. Configuration MySQL
```bash
sudo mysql_secure_installation
sudo mysql -u root -p

# Dans MySQL
CREATE DATABASE car_rental_benin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'carrental'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON car_rental_benin.* TO 'carrental'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Déployer l'application
```bash
# Cloner le projet
git clone <repository-url>
cd car-rental-benin

# Installer les dépendances
npm install

# Build de production
npm run build

# Configurer les variables d'environnement
nano .env
# Mettre à jour DATABASE_URL et autres variables

# Appliquer les migrations
npx prisma migrate deploy

# Lancer avec PM2
pm2 start npm --name "car-rental" -- start
pm2 startup
pm2 save
```

#### 4. Configuration Nginx (optionnel)
```bash
sudo apt install nginx -y

# Créer la configuration
sudo nano /etc/nginx/sites-available/car-rental

# Contenu de la configuration
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Activer le site
sudo ln -s /etc/nginx/sites-available/car-rental /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option 2: Plan Node.js Hostinger

#### 1. Préparer l'application
```bash
# Build de production
npm run build

# Créer un fichier .htaccess pour la redirection
echo "RewriteEngine On
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]" > .htaccess
```

#### 2. Upload sur Hostinger
- Compresser le dossier `car-rental-benin`
- Uploader via le gestionnaire de fichiers Hostinger
- Extraire dans le dossier racine

#### 3. Configuration
- Configurer les variables d'environnement dans le panneau Hostinger
- Démarrer l'application via le panneau de contrôle

## 🔧 Configuration des services

### Google OAuth
1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet
3. Activer l'API Google+ 
4. Créer des identifiants OAuth 2.0
5. Ajouter les URIs de redirection autorisés

### Cloudinary
1. Créer un compte sur [Cloudinary](https://cloudinary.com/)
2. Récupérer les clés API dans le dashboard
3. Configurer les dossiers pour les images et preuves de paiement

### SendGrid
1. Créer un compte sur [SendGrid](https://sendgrid.com/)
2. Vérifier votre domaine d'expédition
3. Créer une clé API

## 📱 Configuration Mobile Money

### Mettre à jour les numéros
Dans le fichier `.env`, mettre à jour :
```env
MTN_MOMO_NUMBER="+229 VOTRE_NUMERO_MTN"
MOOV_MONEY_NUMBER="+229 VOTRE_NUMERO_MOOV"
```

### Personnaliser les instructions
Modifier les composants `PaymentProofForm` et `BookingPage` pour adapter les instructions selon vos besoins.

## 🚨 Sécurité

- Toutes les routes API sont protégées par authentification
- Validation côté serveur pour tous les uploads
- Gestion des rôles et permissions
- Protection CSRF intégrée
- Validation des types MIME pour les fichiers

## 📊 Maintenance

### Nettoyage automatique des fichiers rejetés
Configurer un cron job pour supprimer les fichiers Cloudinary des paiements refusés après 7 jours :

```bash
# Ajouter au crontab
0 2 * * * curl -X POST https://yourdomain.com/api/cleanup-rejected-files
```

### Sauvegarde de la base de données
```bash
# Script de sauvegarde automatique
mysqldump -u carrental -p car_rental_benin > backup_$(date +%Y%m%d_%H%M%S).sql
```

## 🐛 Dépannage

### Problèmes courants

#### Erreur de connexion à la base de données
- Vérifier les informations de connexion MySQL
- S'assurer que le service MySQL est démarré
- Vérifier les permissions de l'utilisateur

#### Erreur d'upload Cloudinary
- Vérifier les clés API Cloudinary
- S'assurer que le compte a suffisamment d'espace
- Vérifier la connectivité internet

#### Problèmes d'authentification
- Vérifier la configuration NextAuth
- S'assurer que les variables d'environnement sont correctes
- Vérifier la configuration Google OAuth

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation technique

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

---

**Car Rental Bénin** - Simplifiez la location de voitures au Bénin ! 🚗🇧🇯
