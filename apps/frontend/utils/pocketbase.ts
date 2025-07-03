const POCKETBASE_URL = "http://127.0.0.1:8090"

export interface Article {
  id: string
  Titre: string
  Contenu: string
  Auteur: string
  Image: string
  created: string
  updated: string
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  created: string
  updated: string
}

// Fonction utilitaire pour les requêtes API
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${POCKETBASE_URL}/api/collections/${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Erreur API PocketBase (${endpoint}):`, response.status, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Erreur API PocketBase (${endpoint}):`, error)
    throw error
  }
}

// Articles
export const articlesApi = {
  // Récupérer tous les articles
  getAll: async (filters?: any) => {
    let url = "articles/records"
    if (filters) {
      const params = new URLSearchParams(filters)
      url += `?${params}`
    }
    return apiRequest(url)
  },

  // Récupérer un article par ID
  getById: async (id: string) => {
    return apiRequest(`articles/records/${id}`)
  },

  // Récupérer les articles (tous pour l'instant)
  getPublished: async (page = 1, perPage = 10) => {
    return apiRequest(`articles/records?page=${page}&perPage=${perPage}&sort=-created`)
  },

  // Récupérer les articles récents
  getFeatured: async (limit = 3) => {
    return apiRequest(`articles/records?perPage=${limit}&sort=-created`)
  },

  // Créer un article
  create: async (data: Partial<Article>) => {
    return apiRequest("articles/records", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Mettre à jour un article
  update: async (id: string, data: Partial<Article>) => {
    return apiRequest(`articles/records/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  // Supprimer un article
  delete: async (id: string) => {
    return apiRequest(`articles/records/${id}`, {
      method: "DELETE",
    })
  },
}

// Catégories
export const categoriesApi = {
  // Récupérer toutes les catégories
  getAll: async () => {
    return apiRequest("categories/records?sort=name")
  },

  // Récupérer une catégorie par slug
  getBySlug: async (slug: string) => {
    return apiRequest(`categories/records?filter=(slug='${slug}')`)
  },

  // Créer une catégorie
  create: async (data: Partial<Category>) => {
    return apiRequest("categories/records", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Mettre à jour une catégorie
  update: async (id: string, data: Partial<Category>) => {
    return apiRequest(`categories/records/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  // Supprimer une catégorie
  delete: async (id: string) => {
    return apiRequest(`categories/records/${id}`, {
      method: "DELETE",
    })
  },
}
