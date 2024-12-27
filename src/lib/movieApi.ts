import { nextPublicApiUrl } from "@/constants/constants";
import { Movie } from "@prisma/client";

// Declare the class first

export class MovieApi {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async getMovieById({ id }: MovieApi.GetMovieByIdParam) {
    const endpoint = this.buildEndpoint(`/movie/${id}`);
    return await this.fetchData<Movie>({ url: endpoint });
  }

  public async postMovie({ data }: MovieApi.PostMovieParam) {
    const endpoint = this.buildEndpoint(`/admin/movie`);
    return await this.fetchData<Movie>({
      url: endpoint,
      method: MovieApi.HttpMethod.POST,
      options: {
        body: JSON.stringify(data),
      },
    });
  }

  public async deleteMovieById({ id }: MovieApi.DeleteMovieByIdParam) {
    const endpoint = this.buildEndpoint(`/admin/movie/${id}`);
    return await this.fetchData<Movie>({
      url: endpoint,
      method: MovieApi.HttpMethod.DELETE,
    });
  }

  public async putMovieById({ id, data }: MovieApi.PutMovieByIdParam) {
    const endpoint = this.buildEndpoint(`/admin/movie/${id}`);
    return await this.fetchData<Movie>({
      url: endpoint,
      method: MovieApi.HttpMethod.PUT,
      options: {
        body: JSON.stringify(data),
      },
    });
  }

  private createQueryString(
    params: Record<string, string | undefined>
  ): string {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value || ""}`)
      .join("&");
  }

  private constructMoviesUrl(searchParam: MovieApi.GetMoviesParam): string {
    const queryString = this.createQueryString({
      title: searchParam.title,
      category: searchParam.category,
    });
    return `/movie?${queryString}`;
  }
  public async getMovies(searchParam: MovieApi.GetMoviesParam) {
    const path = this.constructMoviesUrl(searchParam);
    const endpoint = this.buildEndpoint(path);
    console.log(endpoint, "endporint");
    return await this.fetchData<Movie[]>({ url: endpoint });
  }

  private buildEndpoint(path: string): string {
    return `${this.apiUrl}${path}`;
  }

  private createRequestConfig(
    method: MovieApi.HttpMethod,
    contentType: MovieApi.ContentType,
    options?: RequestInit
  ): RequestInit {
    return {
      method,
      headers: {
        "Content-Type": contentType,
        ...options?.headers,
      },
      ...options,
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error("Invalid JSON response");
    }
  }

  private logError(error: unknown): void {
    if (error instanceof Error) {
      console.error(`API Error ():`, error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }

  public async fetchData<T extends object>({
    url,
    method = MovieApi.HttpMethod.GET,
    contentType = MovieApi.ContentType.JSON,
    options,
  }: MovieApi.FetchDataParam): Promise<T> {
    try {
      const config = this.createRequestConfig(method, contentType, options);
      console.log("config", config, url);
      const response = await fetch(url, config);
      // return await this.handleResponse<T>(response);
      return await response.json();
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }
}

// Declare the namespace after the class
export namespace MovieApi {
  export interface BaseParam {
    id: string;
  }

  export interface GetMoviesParam {
    title?: string;
    category?: string;
  }
  export interface GetMovieByIdParam extends BaseParam {}
  export interface DeleteMovieByIdParam extends BaseParam {}

  export interface MoviePayload extends Omit<Movie, "id"> {}
  export interface PostMovieParam {
    data: MoviePayload;
  }
  export interface PutMovieByIdParam extends BaseParam {
    data: MoviePayload;
  }

  export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }

  export enum ContentType {
    JSON = "application/json",
    TEXT = "text/plain",
    FORM = "application/x-www-form-urlencoded",
  }

  export interface FetchDataParam {
    url: string;
    method?: HttpMethod;
    contentType?: ContentType;
    options?: RequestInit;
  }

  // Export the instance type
  export type Instance = MovieApi;
}

// Create an instance of the service
const movieApi = new MovieApi(nextPublicApiUrl);

export default movieApi;
export type MovieApiInstance = MovieApi.Instance;
