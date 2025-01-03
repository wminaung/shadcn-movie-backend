import { Category } from "@/core/entity/Category";

interface SearchParam {
  movieId?: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  filterCategories: (SearchParam?: SearchParam) => Promise<Category[]>;
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
}
