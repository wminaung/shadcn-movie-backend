import { Movie } from "@/core/entity/Movie";
import { SearchOption } from "@/core/infrastructure/IMovieRepository";

export interface MovieState {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  error: string | null;
  filterMovies: (searchOption?: SearchOption) => void;
  setMovies: (movies: Movie[]) => void;
  addMovie: (newMovie: Movie) => void;
  editMovie: (movie: Movie) => void;
  removeMovie: (movie: Movie) => void;
}
