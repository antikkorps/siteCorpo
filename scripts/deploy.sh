#!/bin/bash

# Script de déploiement pour Fly.io
# Ce script déploie le backend et le frontend sur Fly.io

set -e

echo "🚀 Déploiement du monorepo Nuxt/Strapi sur Fly.io"

# Vérifier si flyctl est installé
if ! command -v flyctl &> /dev/null; then
    echo "❌ flyctl n'est pas installé. Installez-le d'abord: https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
fi

# Vérifier si l'utilisateur est connecté
if ! flyctl auth whoami &> /dev/null; then
    echo "❌ Vous n'êtes pas connecté à Fly.io. Connectez-vous avec: flyctl auth login"
    exit 1
fi

# Fonction pour déployer le backend
deploy_backend() {
    echo "📦 Déploiement du backend Strapi..."
    
    # Vérifier si l'app existe
    if flyctl apps list | grep -q "your-app-backend"; then
        echo "✅ L'app backend existe déjà"
    else
        echo "🆕 Création de l'app backend..."
        flyctl apps create your-app-backend
        
        # Créer la base de données PostgreSQL
        echo "🗄️ Création de la base de données PostgreSQL..."
        flyctl postgres create --name your-app-backend-db --region cdg
        
        # Attacher la base de données
        echo "🔗 Attachement de la base de données..."
        flyctl postgres attach --app your-app-backend your-app-backend-db
        
        # Créer le volume pour les uploads
        echo "💾 Création du volume pour les uploads..."
        flyctl volumes create strapi_uploads --size 1 --app your-app-backend
    fi
    
    # Déployer
    flyctl deploy --config fly.backend.toml --app your-app-backend
    
    echo "✅ Backend déployé avec succès!"
}

# Fonction pour déployer le frontend
deploy_frontend() {
    echo "🌐 Déploiement du frontend Nuxt..."
    
    # Vérifier si l'app existe
    if flyctl apps list | grep -q "your-app-frontend"; then
        echo "✅ L'app frontend existe déjà"
    else
        echo "🆕 Création de l'app frontend..."
        flyctl apps create your-app-frontend
    fi
    
    # Définir les variables d'environnement
    echo "🔧 Configuration des variables d'environnement..."
    flyctl secrets set STRAPI_URL=https://your-app-backend.fly.dev --app your-app-frontend
    flyctl secrets set API_BASE_URL=https://your-app-backend.fly.dev/api --app your-app-frontend
    
    # Déployer
    flyctl deploy --config fly.frontend.toml --app your-app-frontend
    
    echo "✅ Frontend déployé avec succès!"
}

# Menu principal
echo "Que voulez-vous déployer ?"
echo "1. Backend seulement"
echo "2. Frontend seulement"
echo "3. Backend et Frontend"
echo "4. Annuler"

read -p "Choisissez une option (1-4): " choice

case $choice in
    1)
        deploy_backend
        ;;
    2)
        deploy_frontend
        ;;
    3)
        deploy_backend
        deploy_frontend
        ;;
    4)
        echo "Déploiement annulé."
        exit 0
        ;;
    *)
        echo "Option invalide."
        exit 1
        ;;
esac

echo "🎉 Déploiement terminé!"
echo "📱 Frontend: https://your-app-frontend.fly.dev"
echo "🔧 Backend: https://your-app-backend.fly.dev"
echo "📊 Admin Strapi: https://your-app-backend.fly.dev/admin" 