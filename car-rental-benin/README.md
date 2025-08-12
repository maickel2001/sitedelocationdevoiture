# 🚗 Car Rental Bénin - Version Simple

Une plateforme simple de location de voitures au Bénin, sans complexité inutile.

## ✨ Fonctionnalités

- **Page d'accueil** avec moteur de recherche et affichage des voitures
- **Authentification simple** (inscription/connexion)
- **Gestion des voitures** avec images
- **Système de réservation** basique
- **Dashboard utilisateur** et **admin**
- **Base de données MySQL** simple

## 🛠️ Technologies

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: API Routes Next.js
- **Base de données**: MySQL via Prisma ORM
- **Authentification**: Sessions simples avec localStorage

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

### 3. Configuration
```bash
cp .env.example .env
```

Remplir le fichier `.env` :
```env
DATABASE_URL="mysql://user:password@localhost:3306/car_rental_benin"
MTN_MOMO_NUMBER="+229 VOTRE_NUMERO_MTN"
MOOV_MONEY_NUMBER="+229 VOTRE_NUMERO_MOOV"
```

### 4. Base de données
```sql
CREATE DATABASE car_rental_benin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Migrations et données de test
```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 6. Lancer l'application
```bash
npm run dev
```

## 👤 Comptes de test

Après le seeding :
- **Admin**: admin@carrentalbenin.com / admin123
- **Utilisateur**: user@test.com / user123

## 🌐 Déploiement sur Hostinger

### Option 1: VPS
1. Installer Node.js et MySQL sur le VPS
2. Cloner le projet et configurer l'environnement
3. Lancer avec PM2 : `pm2 start npm --name "car-rental" -- start`

### Option 2: Plan Node.js
1. Build : `npm run build`
2. Upload via le gestionnaire de fichiers Hostinger
3. Configurer les variables d'environnement

## 📱 Configuration Mobile Money

Mettre à jour les numéros dans `.env` :
```env
MTN_MOMO_NUMBER="+229 VOTRE_NUMERO_MTN"
MOOV_MONEY_NUMBER="+229 VOTRE_NUMERO_MOOV"
```

## 🔧 Structure du projet

```
src/
├── app/                    # Pages Next.js
│   ├── api/               # APIs simples
│   ├── login/             # Page de connexion
│   ├── register/          # Page d'inscription
│   └── page.tsx           # Page d'accueil
├── components/             # Composants React
├── lib/                    # Utilitaires
│   ├── auth-simple.ts     # Authentification simple
│   └── prisma.ts          # Client Prisma
└── prisma/
    ├── schema.prisma       # Schéma de base de données
    └── seed.ts            # Données de test
```

## 🎯 Prochaines étapes

- Ajouter la gestion des réservations
- Implémenter le système de paiement
- Créer le dashboard admin
- Ajouter la gestion des voitures

---

**🚀 Simple, efficace et prêt pour la production !**
