const BACKEND_URL = "http://localhost:5000/api";

export interface ApiClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: unknown): Promise<T>;
  put<T>(path: string, body: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

export const createApiClient = (): ApiClient => {
  const baseFetch = async <T>(
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown,
  ): Promise<T> => {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    if (res.status === 204) {
      return undefined as T;
    }

    const text = await res.text();

    if (!text) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
  };

  return {
    get: <T>(path: string) => baseFetch<T>(path, "GET"),
    post: <T>(path: string, body: unknown) => baseFetch<T>(path, "POST", body),
    put: <T>(path: string, body: unknown) => baseFetch<T>(path, "PUT", body),
    delete: <T>(path: string) => baseFetch<T>(path, "DELETE"),
  };
};
