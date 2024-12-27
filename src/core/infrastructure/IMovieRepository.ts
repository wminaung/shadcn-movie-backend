import { Movie } from "../entity/Movie";

export interface SearchOption {
  title?: string;
  category?: string;
}

export interface IMovieRepository {
  getAll(options?: SearchOption): Promise<Movie[]>;
  get(id: string): Promise<Movie | null>;
  create(data: Omit<Movie, "id">): Promise<Movie>;
  update(id: string, data: Partial<Omit<Movie, "id">>): Promise<Movie>;
  delete(id: string): Promise<Movie>;
}
