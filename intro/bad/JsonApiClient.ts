import HttpError from './HttpError';
import { mergeHeaders } from './helpers';

export { HttpError };

export default class JsonApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly headers: HeadersInit,
  ) { }

  private _request(
    method: string,
    path: string,
    body?: any,
    headers?: HeadersInit,
  ): Request {
    return new Request(
      new URL(path, this.baseUrl).href,
      {
        method,
        headers: mergeHeaders(
          { 'content-type': 'application/json' },
          this.headers,
          headers ?? {},
        ),
        body: body != null ? JSON.stringify(body) : undefined,
      },
    );
  }

  private async _send(request: Request): Promise<any> {
    const response = await fetch(request);

    if (response.ok) return response.json();

    throw new HttpError(request, response);
  }

  protected get(path: string, headers?: HeadersInit) {
    return this._send(
      this._request('GET', path, undefined, headers),
    );
  }

  protected post(path: string, body: any, headers?: HeadersInit) {
    return this._send(
      this._request('POST', path, body, headers),
    );
  }

  protected put(path: string, body: any, headers?: HeadersInit) {
    return this._send(
      this._request('PUT', path, body, headers),
    );
  }

  protected patch(path: string, body: any, headers?: HeadersInit) {
    return this._send(
      this._request('PATCH', path, body, headers),
    );
  }

  protected delete(path: string, headers?: HeadersInit) {
    return this._send(
      this._request('DELETE', path, undefined, headers),
    );
  }
}
