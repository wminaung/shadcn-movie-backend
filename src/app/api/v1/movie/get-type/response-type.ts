import { Category } from "@/core/entity/Category";
import { Movie } from "@/core/entity/Movie";

export interface MovieResponse extends Movie {
  categories: Array<{ category: Category }>;
}
