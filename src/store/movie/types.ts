import { Movie } from "@/core/entity/Movie";

interface SearchParam {
  categoryId?: string;
  title?: string;
  category?: string;
}
export interface MovieState {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  error: string | null;

  fetchMovies: () => Promise<void>;
  filterMovies: (SearchParam: SearchParam) => void;
  setFilteredMovies: (filteredMovies: Movie[]) => void;
  filteredMoviesByCatId: (catId: string) => Promise<Movie[]>;
  setMovies: (movies: Movie[]) => void;
  addMovie: (newMovie: Movie) => void;
  editMovie: (movie: Movie) => void;
  removeMovie: (movie: Movie) => void;
}
