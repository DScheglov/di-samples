export type HeadersRecord = Record<string, string>

export type Response = {
  ok: boolean;
  status: number;
  statusText: string;
  headers: HeadersRecord;
  body: unknown;
}

export interface IHttpClient {
  get(path: string, headers?: HeadersRecord): Promise<Response>;
  post(path: string, body: any, headers?: HeadersRecord): Promise<Response>;
  put(path: string, body: any, headers?: HeadersRecord): Promise<Response>;
  patch(path: string, body: any, headers?: HeadersRecord): Promise<Response>;
  delete(path: string, headers?: HeadersRecord): Promise<Response>;
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
