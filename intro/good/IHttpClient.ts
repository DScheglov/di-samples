export type Headers = Record<string, string>;

export type Response = {
  status: number;
  statusText: string;
  headers: Headers;
  body: unknown;
}

export interface IHttpClient {
  get(path: string, headers?: HeadersInit): Promise<Response>;
  post(path: string, body: any, headers?: HeadersInit): Promise<Response>;
  put(path: string, body: any, headers?: HeadersInit): Promise<Response>;
  patch(path: string, body: any, headers?: HeadersInit): Promise<Response>;
  delete(path: string, headers?: HeadersInit): Promise<Response>;
}

export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_NOT_FOUND = 404;
