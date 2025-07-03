<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Articles</h1>
          </div>
          <nav class="flex space-x-4">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 transition-colors">
              Accueil
            </NuxtLink>
            <NuxtLink to="/articles" class="text-blue-600 font-medium">
              Articles
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Tous nos articles</h1>
        <p class="text-lg text-gray-600">Découvrez nos derniers articles et actualités</p>
      </div>

      <!-- Articles Grid -->
      <div v-if="articles.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg mb-4">Aucun article publié pour le moment</p>
        <a
          href="http://127.0.0.1:8090/_/"
          target="_blank"
          class="text-blue-600 hover:text-blue-700 font-medium"
        >
          Créer votre premier article →
        </a>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <!-- Image de l'article -->
          <div v-if="article.Image" class="aspect-video bg-gray-200">
            <img
              :src="`http://127.0.0.1:8090/api/files/articles/${article.id}/${article.Image}`"
              :alt="article.Titre"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-500">
                {{ formatDate(article.created) }}
              </span>
            </div>

            <h2 class="text-xl font-semibold text-gray-900 mb-3">
              {{ article.Titre }}
            </h2>

            <div class="text-gray-600 mb-4 line-clamp-3 prose prose-sm">
              <div v-html="stripHtml(article.Contenu)"></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span v-if="article.Auteur" class="text-sm text-gray-500">
                  Par {{ article.Auteur }}
                </span>
              </div>

              <NuxtLink
                :to="`/articles/${article.id}`"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                Lire la suite →
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreArticles" class="text-center mt-12">
        <button
          @click="loadMoreArticles"
          :disabled="loading"
          class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ loading ? "Chargement..." : "Charger plus d'articles" }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
const { getPublishedArticles } = useArticles()

// État des articles
const articles = ref([])
const currentPage = ref(1)
const hasMoreArticles = ref(true)
const loading = ref(false)

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Fonction pour nettoyer le HTML et extraire le texte
const stripHtml = (html) => {
  if (!html) return ""
  // Créer un élément temporaire pour extraire le texte
  const temp = document.createElement("div")
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ""
}

// Charger les articles
const loadArticles = async (page = 1) => {
  try {
    loading.value = true
    const newArticles = await getPublishedArticles(page, 9)

    if (page === 1) {
      articles.value = newArticles
    } else {
      articles.value.push(...newArticles)
    }

    hasMoreArticles.value = newArticles.length === 9
    currentPage.value = page
  } catch (error) {
    console.error("Erreur lors du chargement des articles:", error)
  } finally {
    loading.value = false
  }
}

// Charger plus d'articles
const loadMoreArticles = () => {
  loadArticles(currentPage.value + 1)
}

// Charger les articles au montage
onMounted(() => {
  loadArticles()
})

// SEO
useHead({
  title: "Articles - Nuxt PocketBase Monorepo",
  meta: [
    {
      name: "description",
      content: "Découvrez tous nos articles et actualités",
    },
    {
      property: "og:title",
      content: "Articles - Nuxt PocketBase Monorepo",
    },
  ],
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
