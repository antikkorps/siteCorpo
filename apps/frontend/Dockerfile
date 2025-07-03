# Dockerfile pour Nuxt Frontend
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache libc6-compat

# Copier les fichiers de configuration des dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm install --only=production && npm cache clean --force

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

# Changer la propriété des fichiers
RUN chown -R nuxt:nodejs /app
USER nuxt

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Commande par défaut
CMD ["npm", "start"] 