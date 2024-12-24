import { nextPublicApiUrl } from "@/constants/constants";

// Declare the class first
export class ApiService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async fetchData<T extends object>({
    url,
    method = ApiService.HttpMethod.GET,
    contentType = ApiService.ContentType.JSON,
    options,
  }: ApiService.FetchDataParam): Promise<T> {
    try {
      const response = await fetch(`${this.apiUrl}${url}`, {
        method,
        headers: {
          "Content-Type": contentType,
          ...options?.headers,
        },
        ...options,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}

// Declare the namespace after the class
export namespace ApiService {
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
  export type Instance = ApiService;
}

// Create an instance of the service
const apiService = new ApiService(nextPublicApiUrl);

export default apiService;
export type ApiServiceInstance = ApiService.Instance;
