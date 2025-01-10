import { CategoryState } from "./types";
import { create } from "zustand";
import {
  createNewCat,
  getAllCategory,
  getCategoriesByMovieId,
} from "./categoryActions";
export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  setCategories: (categories) => set({ categories }),
  createNewCategory: async (newCat) => {
    if (!newCat.name) return;
    const createdCat = await createNewCat(newCat);
    if (!createdCat) return;
    set((state) => ({ categories: [...state.categories, createdCat] }));
  },
  filterCategories: async (searchParam) => {
    if (searchParam?.movieId) {
      return await getCategoriesByMovieId(searchParam.movieId);
    }
    return [];
  },
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const categories = await getAllCategory();
      set({ categories, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch categories", loading: false });
    }
  },
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}));
