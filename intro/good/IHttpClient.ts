export type HeadersRecord = Record<string, string>

export type Response<T> = {
  ok: boolean;
  status: number;
  statusText: string;
  headers: HeadersRecord;
  body: T;
}

export interface IHttpClient {
  get<T = unknown>(path: string, headers?: HeadersRecord): Promise<Response<T>>;
  post<T = unknown>(path: string, body: any, headers?: HeadersRecord): Promise<Response<T>>;
  put<T = unknown>(path: string, body: any, headers?: HeadersRecord): Promise<Response<T>>;
  patch<T = unknown>(path: string, body: any, headers?: HeadersRecord): Promise<Response<T>>;
  delete<T = unknown>(path: string, headers?: HeadersRecord): Promise<Response<T>>;
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  NOT_PERMITTED: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_INTERNAL_ERROR: 500,
} as const;
