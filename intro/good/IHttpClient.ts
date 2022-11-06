export type Headers = Record<string, string>;

export type Response<T = unknown> = {
  status: number;
  statusText: string;
  headers: Headers;
  body: T;
}

export type DefferedResponse<T> = Promise<Response<T>>;

export interface IHttpClient {
  get<T>(path: string, headers?: HeadersInit): DefferedResponse<T>;
  post<T, P>(path: string, body: P, headers?: HeadersInit): DefferedResponse<T>;
  put<T, P>(path: string, body: P, headers?: HeadersInit): DefferedResponse<T>;
  patch<T, P>(path: string, body: P, headers?: HeadersInit): DefferedResponse<T>;
  delete<T>(path: string, headers?: HeadersInit): DefferedResponse<T>;
}

export const HTTP_OK = 200;
export const HTTP_CREATE_OK = 201;
export const HTTP_NOT_FOUND = 404;
