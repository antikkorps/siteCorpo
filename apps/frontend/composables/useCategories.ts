import { categoriesApi, type Category } from "../utils/pocketbase"

export const useCategories = () => {
  // Récupérer toutes les catégories
  const getCategories = async () => {
    try {
      const response = await categoriesApi.getAll()
      return response.items || []
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error)
      throw error
    }
  }

  // Récupérer une catégorie par slug
  const getCategoryBySlug = async (slug: string) => {
    try {
      const response = await categoriesApi.getBySlug(slug)
      return response.items?.[0] || null
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie:", error)
      throw error
    }
  }

  // Créer une catégorie
  const createCategory = async (data: Partial<Category>) => {
    try {
      return await categoriesApi.create(data)
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie:", error)
      throw error
    }
  }

  // Mettre à jour une catégorie
  const updateCategory = async (id: string, data: Partial<Category>) => {
    try {
      return await categoriesApi.update(id, data)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error)
      throw error
    }
  }

  // Supprimer une catégorie
  const deleteCategory = async (id: string) => {
    try {
      return await categoriesApi.delete(id)
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error)
      throw error
    }
  }

  return {
    getCategories,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
