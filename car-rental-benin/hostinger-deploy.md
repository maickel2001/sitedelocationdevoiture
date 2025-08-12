# 🚀 Guide de Déploiement Hostinger - Car Rental Bénin

Ce guide détaille le processus de déploiement de la plateforme Car Rental Bénin sur Hostinger, avec deux options principales : VPS ou plan Node.js.

## 📋 Prérequis Hostinger

- Compte Hostinger actif
- Accès au panneau de contrôle Hostinger
- Domaine configuré (optionnel mais recommandé)
- Connaissances de base en ligne de commande (pour VPS)

## 🌐 Option 1: Déploiement sur VPS Hostinger

### Étape 1: Accéder au VPS
1. Connectez-vous à votre panneau Hostinger
2. Allez dans la section "VPS"
3. Cliquez sur "Terminal" ou utilisez SSH
4. Connectez-vous avec vos identifiants

### Étape 2: Préparation du serveur
```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérification de l'installation
node --version
npm --version

# Installation de MySQL
sudo apt install mysql-server -y

# Installation de PM2 pour la gestion des processus
sudo npm install -g pm2

# Installation de Nginx (optionnel)
sudo apt install nginx -y
```

### Étape 3: Configuration MySQL
```bash
# Sécurisation de MySQL
sudo mysql_secure_installation

# Connexion à MySQL
sudo mysql -u root -p

# Création de la base de données et de l'utilisateur
CREATE DATABASE car_rental_benin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'carrental'@'localhost' IDENTIFIED BY 'VotreMotDePasseSecurise123!';
GRANT ALL PRIVILEGES ON car_rental_benin.* TO 'carrental'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Étape 4: Déploiement de l'application
```bash
# Cloner le projet (remplacez par votre URL)
git clone https://github.com/votre-username/car-rental-benin.git
cd car-rental-benin

# Installation des dépendances
npm install

# Build de production
npm run build

# Configuration des variables d'environnement
nano .env
```

**Contenu du fichier .env pour production :**
```env
# Database
DATABASE_URL="mysql://carrental:VotreMotDePasseSecurise123!@localhost:3306/car_rental_benin"

# NextAuth
NEXTAUTH_URL="https://votre-domaine.com"
NEXTAUTH_SECRET="votre-secret-tres-long-et-aleatoire"

# Google OAuth
GOOGLE_CLIENT_ID="votre-google-client-id"
GOOGLE_CLIENT_SECRET="votre-google-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"

# SendGrid
SENDGRID_API_KEY="votre-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@votre-domaine.com"

# Mobile Money Numbers
MTN_MOMO_NUMBER="+229 VOTRE_NUMERO_MTN"
MOOV_MONEY_NUMBER="+229 VOTRE_NUMERO_MOOV"
```

### Étape 5: Configuration de la base de données
```bash
# Génération du client Prisma
npx prisma generate

# Application des migrations
npx prisma migrate deploy

# Ajout de données de test (optionnel)
npm run db:seed
```

### Étape 6: Lancement de l'application
```bash
# Démarrage avec PM2
pm2 start npm --name "car-rental" -- start

# Configuration du démarrage automatique
pm2 startup
pm2 save

# Vérification du statut
pm2 status
pm2 logs car-rental
```

### Étape 7: Configuration Nginx (recommandé)
```bash
# Création de la configuration
sudo nano /etc/nginx/sites-available/car-rental

# Contenu de la configuration
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    # Redirection HTTPS (optionnel)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gestion des fichiers statiques
    location /_next/static {
        alias /home/ubuntu/car-rental-benin/.next/static;
        expires 365d;
        access_log off;
    }
}

# Activation du site
sudo ln -s /etc/nginx/sites-available/car-rental /etc/nginx/sites-enabled/

# Test de la configuration
sudo nginx -t

# Redémarrage de Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Étape 8: Configuration du pare-feu
```bash
# Installation d'UFW
sudo apt install ufw -y

# Configuration des règles
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000

# Activation du pare-feu
sudo ufw enable
```

## 🌐 Option 2: Déploiement sur Plan Node.js Hostinger

### Étape 1: Préparation de l'application
```bash
# Dans votre environnement de développement
npm run build

# Création du fichier .htaccess
echo "RewriteEngine On
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]" > .htaccess

# Création d'un fichier de configuration PM2
echo '{
  "name": "car-rental",
  "script": "npm",
  "args": "start",
  "cwd": "/home/username/public_html",
  "env": {
    "NODE_ENV": "production"
  }
}' > ecosystem.config.js
```

### Étape 2: Upload sur Hostinger
1. **Compression du projet :**
   ```bash
   # Exclure les dossiers non nécessaires
   tar --exclude='node_modules' --exclude='.git' --exclude='.next' -czf car-rental-benin.tar.gz car-rental-benin/
   ```

2. **Upload via le gestionnaire de fichiers :**
   - Connectez-vous à votre panneau Hostinger
   - Allez dans "Gestionnaire de fichiers"
   - Naviguez vers `public_html`
   - Uploadez le fichier `car-rental-benin.tar.gz`
   - Extrayez le contenu

### Étape 3: Configuration dans le panneau Hostinger
1. **Variables d'environnement :**
   - Allez dans "Node.js" dans votre panneau
   - Configurez les variables d'environnement
   - Assurez-vous que `NODE_ENV=production`

2. **Démarrage de l'application :**
   - Dans la section Node.js, configurez le point d'entrée
   - Démarrez l'application
   - Vérifiez les logs pour détecter d'éventuelles erreurs

## 🔧 Configuration des services tiers

### Google OAuth
1. **Google Cloud Console :**
   - Créez un projet
   - Activez l'API Google+ 
   - Créez des identifiants OAuth 2.0
   - Ajoutez les URIs de redirection :
     ```
     https://votre-domaine.com/api/auth/callback/google
     ```

### Cloudinary
1. **Configuration Cloudinary :**
   - Créez un compte
   - Récupérez vos clés API
   - Configurez les dossiers :
     - `car-rental` pour les images de voitures
     - `payment-proofs` pour les preuves de paiement

### SendGrid
1. **Configuration SendGrid :**
   - Créez un compte
   - Vérifiez votre domaine d'expédition
   - Créez une clé API
   - Testez l'envoi d'emails

## 📱 Configuration Mobile Money

### Mise à jour des numéros
Dans votre fichier `.env` de production :
```env
MTN_MOMO_NUMBER="+229 VOTRE_NUMERO_MTN_REEL"
MOOV_MONEY_NUMBER="+229 VOTRE_NUMERO_MOOV_REEL"
```

### Personnalisation des instructions
Modifiez les composants suivants selon vos besoins :
- `PaymentProofForm` : Instructions de paiement
- `BookingPage` : Affichage des numéros
- Emails de confirmation

## 🚨 Sécurité et Maintenance

### Certificat SSL
```bash
# Installation de Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtention du certificat
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Renouvellement automatique
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

### Sauvegarde automatique
```bash
# Script de sauvegarde
nano /home/ubuntu/backup.sh

# Contenu du script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR

# Sauvegarde de la base de données
mysqldump -u carrental -p'VotreMotDePasseSecurise123!' car_rental_benin > $BACKUP_DIR/db_backup_$DATE.sql

# Sauvegarde des fichiers
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /home/ubuntu/car-rental-benin

# Suppression des sauvegardes anciennes (garder 7 jours)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Sauvegarde terminée : $DATE" >> $BACKUP_DIR/backup.log

# Rendre le script exécutable
chmod +x /home/ubuntu/backup.sh

# Ajouter au crontab (sauvegarde quotidienne à 2h du matin)
crontab -e
# Ajouter : 0 2 * * * /home/ubuntu/backup.sh
```

### Monitoring et logs
```bash
# Configuration des logs PM2
pm2 install pm2-logrotate

# Vérification des logs
pm2 logs car-rental --lines 100

# Monitoring en temps réel
pm2 monit
```

## 🐛 Dépannage

### Problèmes courants

#### Application ne démarre pas
```bash
# Vérifier les logs
pm2 logs car-rental

# Vérifier les variables d'environnement
pm2 env car-rental

# Redémarrer l'application
pm2 restart car-rental
```

#### Erreur de base de données
```bash
# Tester la connexion
mysql -u carrental -p car_rental_benin

# Vérifier le statut MySQL
sudo systemctl status mysql

# Redémarrer MySQL si nécessaire
sudo systemctl restart mysql
```

#### Problèmes de permissions
```bash
# Vérifier les permissions des fichiers
ls -la /home/ubuntu/car-rental-benin/

# Corriger les permissions si nécessaire
chmod -R 755 /home/ubuntu/car-rental-benin/
chown -R ubuntu:ubuntu /home/ubuntu/car-rental-benin/
```

## 📊 Tests post-déploiement

### Checklist de vérification
- [ ] L'application est accessible sur votre domaine
- [ ] L'authentification fonctionne (Google OAuth)
- [ ] Les images s'affichent correctement
- [ ] Le système de réservation fonctionne
- [ ] L'upload de preuves de paiement fonctionne
- [ ] Les emails sont envoyés correctement
- [ ] Le dashboard admin est accessible
- [ ] La base de données est fonctionnelle

### Tests de charge (optionnel)
```bash
# Installation d'Apache Bench
sudo apt install apache2-utils -y

# Test de charge basique
ab -n 100 -c 10 https://votre-domaine.com/
```

## 📞 Support Hostinger

En cas de problème avec l'hébergement :
- **Support technique :** Via le panneau de contrôle
- **Documentation :** [help.hostinger.com](https://help.hostinger.com)
- **Chat en direct :** Disponible 24/7

## 🎯 Prochaines étapes

Après le déploiement réussi :
1. **Configuration du domaine :** Pointage vers votre serveur
2. **Mise en place du monitoring :** Alertes et notifications
3. **Optimisation des performances :** Cache, CDN, etc.
4. **Sauvegarde et maintenance :** Automatisation des tâches
5. **Analytics et tracking :** Suivi des utilisateurs

---

**🚀 Votre plateforme Car Rental Bénin est maintenant prête pour la production !**

Pour toute question technique, consultez le README principal ou créez une issue sur GitHub.