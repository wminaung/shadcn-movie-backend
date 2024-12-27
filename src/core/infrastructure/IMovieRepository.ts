import { Movie } from "@/core/entity/Movie";

export interface SearchOption {
  title?: string;
  category?: string;
}

export interface CreateMoviePayload extends Omit<Movie, "id"> {}
export interface UpdateMoviePayload extends CreateMoviePayload {}
export interface IMovieRepository {
  getAll(options?: SearchOption): Promise<Movie[]>;
  get(id: string): Promise<Movie | null>;
  create(data: Omit<Movie, "id">): Promise<Movie>;
  update(id: string, data: Partial<Omit<Movie, "id">>): Promise<Movie>;
  delete(id: string): Promise<Movie>;
}
