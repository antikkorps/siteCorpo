# 🚀 Monorepo Nuxt + Strapi 5

Un starter monorepo moderne avec **Nuxt 3** et **Strapi 5**, optimisé pour le déploiement sur **Fly.io**.

## 📋 Table des matières

- [🏗️ Architecture](#️-architecture)
- [🚀 Démarrage rapide](#-démarrage-rapide)
- [🐳 Développement avec Docker](#-développement-avec-docker)
- [🌐 Déploiement sur Fly.io](#-déploiement-sur-flyio)
- [📁 Structure du projet](#-structure-du-projet)
- [🔧 Configuration](#-configuration)
- [📚 Documentation](#-documentation)

## 🏗️ Architecture

- **Frontend** : Nuxt 3 avec Tailwind CSS et Pinia
- **Backend** : Strapi 5 avec PostgreSQL
- **Développement** : Docker Compose
- **Production** : Fly.io avec PostgreSQL

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20+
- npm 8+
- Docker et Docker Compose (optionnel)

### Installation locale

```bash
# Cloner le projet
git clone <votre-repo>
cd nuxt-strapi-monorepo

# 🚀 Installation automatique (tout en une commande)
npm run install:all

# Ou installation manuelle étape par étape
npm install
npm run install:frontend
npm run install:backend
npm run setup:env
```

### Démarrage en mode développement

```bash
# Démarrer les deux services
npm run dev

# Ou individuellement
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:1337
```

## 🐳 Développement avec Docker

### Démarrage rapide

```bash
# Démarrer tous les services (Frontend, Backend, PostgreSQL)
npm run docker:dev

# Ou avec docker-compose directement
docker-compose up --build
```

### Services disponibles

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:1337
- **Admin Strapi** : http://localhost:1337/admin
- **PostgreSQL** : localhost:5432

### Commandes utiles

```bash
# Démarrer avec logs visibles
npm run docker:dev

# Démarrer en arrière-plan
npm run docker:dev:bg

# Voir les logs
npm run docker:logs

# Arrêter tous les services
npm run docker:stop

# Nettoyer complètement
npm run docker:clean
```

### 🐛 Débogage Docker

Si les services ne démarrent pas correctement :

```bash
# 1. Vérifier le statut des conteneurs
docker compose ps

# 2. Voir les logs d'un service spécifique
docker compose logs backend
docker compose logs frontend

# 3. Redémarrer un service
docker compose restart backend

# 4. Nettoyer et redémarrer
npm run docker:clean
npm run docker:dev

# 5. Accéder au conteneur pour déboguer
docker compose exec backend sh
docker compose exec frontend sh
```

## 🌐 Déploiement sur Fly.io

### Prérequis

1. Installer [flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2. Créer un compte sur [Fly.io](https://fly.io/)
3. Se connecter : `flyctl auth login`

### Déploiement automatique

```bash
# Utiliser le script de déploiement
./scripts/deploy.sh
```

### Déploiement manuel

#### 1. Backend (Strapi)

```bash
# Créer l'app backend
flyctl apps create your-app-backend

# Créer la base de données
flyctl postgres create --name your-app-backend-db --region cdg

# Attacher la base de données
flyctl postgres attach --app your-app-backend your-app-backend-db

# Créer un volume pour les uploads
flyctl volumes create strapi_uploads --size 1 --app your-app-backend

# Déployer
flyctl deploy --config fly.backend.toml --app your-app-backend
```

#### 2. Frontend (Nuxt)

```bash
# Créer l'app frontend
flyctl apps create your-app-frontend

# Configurer les variables d'environnement
flyctl secrets set STRAPI_URL=https://your-app-backend.fly.dev --app your-app-frontend
flyctl secrets set API_BASE_URL=https://your-app-backend.fly.dev/api --app your-app-frontend

# Déployer
flyctl deploy --config fly.frontend.toml --app your-app-frontend
```

## 📁 Structure du projet

```
nuxt-strapi-monorepo/
├── apps/
│   ├── frontend/                # Application Nuxt 3
│   │   ├── components/         # Composants Vue
│   │   ├── pages/              # Pages/routes
│   │   ├── server/api/         # API routes
│   │   ├── assets/             # Assets (CSS, images)
│   │   ├── nuxt.config.ts      # Configuration Nuxt
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── backend/                # Application Strapi 5
│       ├── src/api/            # Content Types
│       ├── config/             # Configuration Strapi
│       ├── package.json
│       ├── env.example
│       └── Dockerfile
│
├── scripts/
│   └── deploy.sh               # Script de déploiement Fly.io
│
├── docker-compose.yml          # Configuration Docker
├── fly.backend.toml            # Configuration Fly.io backend
├── fly.frontend.toml           # Configuration Fly.io frontend
├── package.json                # Configuration monorepo
└── README.md
```

## 🔧 Configuration

### Variables d'environnement

#### Backend (Strapi)

Copiez `apps/backend/env.example` vers `apps/backend/.env` et configurez :

```env
# Base de données
DATABASE_CLIENT=sqlite              # ou postgres pour la production
DATABASE_FILENAME=.tmp/data.db     # pour SQLite

# Sécurité
APP_KEYS="key1,key2"
API_TOKEN_SALT=random_string
ADMIN_JWT_SECRET=random_string

# URLs
PUBLIC_URL=http://localhost:1337
FRONTEND_URL=http://localhost:3000
```

#### Frontend (Nuxt)

Les variables sont configurées dans `apps/frontend/nuxt.config.ts` :

```typescript
runtimeConfig: {
  public: {
    apiBase: process.env.API_BASE_URL || 'http://localhost:1337/api',
    strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337'
  }
}
```

### Content Types Strapi

Le projet inclut deux content types par défaut :

1. **Article** : titre, description, contenu, image, slug, catégorie
2. **Category** : nom, description, slug, couleur

### Personnalisation

#### Ajouter un nouveau content type

1. Créer le schéma dans `apps/backend/src/api/[nom]/content-types/[nom]/schema.json`
2. Redémarrer Strapi
3. Configurer les permissions dans l'admin

#### Modifier le frontend

- Composants : `apps/frontend/components/`
- Pages : `apps/frontend/pages/`
- Styles : `apps/frontend/assets/css/`
- API : `apps/frontend/server/api/`

## 📚 Documentation

### Technologies utilisées

- **[Nuxt 3](https://nuxt.com/)** - Framework Vue.js
- **[Strapi 5](https://strapi.io/)** - CMS Headless
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS
- **[Pinia](https://pinia.vuejs.org/)** - Store pour Vue
- **[PostgreSQL](https://www.postgresql.org/)** - Base de données
- **[Fly.io](https://fly.io/)** - Plateforme de déploiement

### Commandes utiles

```bash
# Installation
npm run install:all           # Installer toutes les dépendances d'un coup
npm run install:frontend      # Installer les dépendances du frontend
npm run install:backend       # Installer les dépendances du backend
npm run setup:env             # Copier les fichiers d'environnement

# Développement
npm run dev                   # Démarrer les deux services
npm run dev:frontend         # Frontend seulement
npm run dev:backend          # Backend seulement

# Build
npm run build                # Build les deux services
npm run build:frontend       # Build frontend seulement
npm run build:backend        # Build backend seulement

# Docker
npm run docker:dev           # Démarrer avec Docker
npm run docker:prod          # Build production avec Docker

# Nettoyage
npm run clean                # Supprimer tous les node_modules
npm run clean:build          # Supprimer les dossiers de build

# Déploiement
./scripts/deploy.sh          # Déploiement interactif sur Fly.io
```

### Ports par défaut

- Frontend : `3000`
- Backend : `1337`
- PostgreSQL : `5432`

### Premiers pas avec Strapi

1. Aller sur http://localhost:1337/admin
2. Créer un compte administrateur
3. Créer du contenu dans les Content Types
4. Configurer les permissions publiques dans Settings > Users & Permissions > Public

## 🤝 Contributing

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ par votre équipe**
