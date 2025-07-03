import { articlesApi, type Article } from "../utils/pocketbase"

export const useArticles = () => {
  // Récupérer tous les articles
  const getArticles = async (filters?: any) => {
    try {
      const response = await articlesApi.getAll(filters)
      return response.items || []
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error)
      throw error
    }
  }

  // Récupérer un article par ID
  const getArticleById = async (id: string) => {
    try {
      const response = await articlesApi.getById(id)
      return response || null
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article:", error)
      throw error
    }
  }

  // Récupérer les articles avec pagination
  const getPublishedArticles = async (page = 1, perPage = 10) => {
    try {
      const response = await articlesApi.getPublished(page, perPage)
      return response.items || []
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error)
      throw error
    }
  }

  // Récupérer les articles récents
  const getFeaturedArticles = async (limit = 3) => {
    try {
      const response = await articlesApi.getFeatured(limit)
      return response.items || []
    } catch (error) {
      console.error("Erreur lors de la récupération des articles récents:", error)
      throw error
    }
  }

  // Créer un article
  const createArticle = async (data: Partial<Article>) => {
    try {
      return await articlesApi.create(data)
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error)
      throw error
    }
  }

  // Mettre à jour un article
  const updateArticle = async (id: string, data: Partial<Article>) => {
    try {
      return await articlesApi.update(id, data)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article:", error)
      throw error
    }
  }

  // Supprimer un article
  const deleteArticle = async (id: string) => {
    try {
      return await articlesApi.delete(id)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error)
      throw error
    }
  }

  return {
    getArticles,
    getArticleById,
    getPublishedArticles,
    getFeaturedArticles,
    createArticle,
    updateArticle,
    deleteArticle,
  }
}
