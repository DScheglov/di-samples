export interface IHttpClient {
  get<T>(path: string, headers?: HeadersInit): Promise<T>;
  post<T, P>(path: string, body: P, headers?: HeadersInit): Promise<T>;
  put<T, P>(path: string, body: P, headers?: HeadersInit): Promise<T>;
  patch<T, P>(path: string, body: P, headers?: HeadersInit): Promise<T>;
  delete<T>(path: string, headers?: HeadersInit): Promise<T>;
}
