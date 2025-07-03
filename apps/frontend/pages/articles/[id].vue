<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Article</h1>
          </div>
          <nav class="flex space-x-4">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 transition-colors">
              Accueil
            </NuxtLink>
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
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Chargement de l'article...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg
            class="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Article non trouvé</h2>
        <p class="text-gray-600 mb-4">L'article que vous recherchez n'existe pas.</p>
        <NuxtLink to="/articles" class="text-blue-600 hover:text-blue-700 font-medium">
          Retour aux articles
        </NuxtLink>
      </div>

      <!-- Article Content -->
      <article v-else-if="article" class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Article Header -->
        <div class="p-8 border-b border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-gray-500">
              {{ formatDate(article.created) }}
            </span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ article.Titre }}</h1>

          <div class="flex items-center justify-between text-sm text-gray-500">
            <span v-if="article.Auteur">Par {{ article.Auteur }}</span>
            <div class="flex items-center space-x-4">
              <span>Créé le {{ formatDate(article.created) }}</span>
            </div>
          </div>
        </div>

        <!-- Article Body -->
        <div class="p-8">
          <!-- Image de l'article -->
          <div v-if="article.Image" class="mb-8">
            <img
              :src="`http://127.0.0.1:8090/api/files/articles/${article.id}/${article.Image}`"
              :alt="article.Titre"
              class="w-full h-auto rounded-lg"
            />
          </div>

          <div v-if="article.Contenu" class="prose prose-lg max-w-none">
            <div v-html="article.Contenu"></div>
          </div>

          <div v-else class="text-gray-500 text-center py-8">
            <p>Aucun contenu disponible pour cet article.</p>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const { getArticleById } = useArticles()

// Récupération de l'article
const {
  data: article,
  pending,
  error,
} = await useLazyAsyncData(`article-${route.params.id}`, () =>
  getArticleById(route.params.id)
)

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// SEO dynamique
useHead(() => ({
  title: article.value
    ? `${article.value.Titre} - Nuxt PocketBase Monorepo`
    : "Article - Nuxt PocketBase Monorepo",
  meta: [
    {
      name: "description",
      content: article.value?.Contenu || "Article du blog",
    },
  ],
}))
</script>
