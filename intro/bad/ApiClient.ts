import RequestError from './RequestError';

type RequestParams = [string, RequestInit];

export default class ApiClient {
  constructor(
    private readonly _baseUrl: string,
    private readonly _headers: HeadersInit,
  ) { }

  private _request(
    method: string,
    path: string,
    body?: string | null,
    headers?: HeadersInit,
  ): RequestParams {
    return [
      new URL(path, this._baseUrl).href,
      {
        method,
        headers: { ...this._headers, ...headers },
        body,
      },
    ];
  }

  private async _send([url, requestInit]: RequestParams): Promise<any> {
    const response = await fetch(url, requestInit);

    if (response.ok) return response.json();

    throw new RequestError(url, requestInit.method, response);
  }

  protected readBody(body: any) {
    return body;
  }

  protected async get(path: string, headers?: HeadersInit) {
    const body = await this._send(
      this._request('GET', path, undefined, headers),
    );
    return this.readBody(body);
  }

  protected async post(path: string, body: any, headers?: HeadersInit) {
    const responseBody = await this._send(
      this._request('POST', path, body && JSON.stringify(body), headers),
    );
    return this.readBody(responseBody);
  }

  protected async put(path: string, body: any, headers?: HeadersInit) {
    const responseBody = await this._send(
      this._request('PUT', path, body && JSON.stringify(body), headers),
    );
    return this.readBody(responseBody);
  }

  protected async patch(path: string, body: any, headers?: HeadersInit) {
    const responseBody = await this._send(
      this._request('PATCH', path, body && JSON.stringify(body), headers),
    );
    return this.readBody(responseBody);
  }

  protected async delete(path: string, headers?: HeadersInit) {
    const responseBody = await this._send(
      this._request('DELETE', path, undefined, headers),
    );
    return this.readBody(responseBody);
  }
}
