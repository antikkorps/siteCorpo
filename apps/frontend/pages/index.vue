<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Nuxt + PocketBase</h1>
          </div>
          <nav class="flex space-x-4">
            <NuxtLink to="/" class="text-blue-600 font-medium"> Accueil </NuxtLink>
            <NuxtLink
              to="/articles"
              class="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Articles
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Bienvenue sur votre site</h1>
        <p class="text-lg text-gray-600 mb-8">
          Un monorepo moderne avec Nuxt 3 et PocketBase, prêt pour le déploiement sur
          Fly.io
        </p>
        <div class="flex justify-center space-x-4">
          <NuxtLink
            to="/articles"
            class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voir les articles
          </NuxtLink>
          <a
            href="http://127.0.0.1:8090/_/"
            target="_blank"
            class="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Interface Admin
          </a>
        </div>
      </div>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900">Nuxt 3</h3>
          <p class="text-gray-600 mt-2">
            Framework Vue.js moderne avec SSR, SSG et développement ultra-rapide
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900">PocketBase</h3>
          <p class="text-gray-600 mt-2">
            Backend moderne avec interface admin intégrée et API REST performante
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900">Monorepo</h3>
          <p class="text-gray-600 mt-2">
            Architecture modulaire avec gestion centralisée des dépendances
          </p>
        </div>
      </div>

      <!-- Recent Articles -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Articles récents</h2>
        <div v-if="articles.length === 0" class="text-center py-8">
          <p class="text-gray-500">Aucun article publié pour le moment</p>
          <a
            href="http://127.0.0.1:8090/_/"
            target="_blank"
            class="text-blue-600 hover:text-blue-700 mt-2 inline-block"
          >
            Créer votre premier article →
          </a>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="article in articles"
            :key="article.id"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ article.title }}
              </h3>
              <p class="text-gray-600 mb-4">{{ article.description }}</p>
              <NuxtLink
                :to="`/articles/${article.slug}`"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                Lire la suite →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { getPublishedArticles } = useArticles()

// Récupérer les articles publiés
const articles = ref([])

onMounted(async () => {
  try {
    articles.value = await getPublishedArticles(1, 6)
  } catch (error) {
    console.error("Erreur lors du chargement des articles:", error)
  }
})

// SEO
useHead({
  title: "Accueil - Nuxt PocketBase Monorepo",
  meta: [
    {
      name: "description",
      content:
        "Un starter monorepo avec Nuxt 3 et PocketBase, prêt pour le déploiement sur Fly.io",
    },
    {
      property: "og:title",
      content: "Nuxt PocketBase Monorepo",
    },
    {
      property: "og:description",
      content: "Un starter monorepo avec Nuxt 3 et PocketBase",
    },
  ],
})
</script>
