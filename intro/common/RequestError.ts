export default class RequestError extends Error {
  public get status() {
    return this._response.status;
  }

  public get statusText() {
    return this._response.statusText;
  }

  hasStatus(status: Response['status']) {
    return this.status === status;
  }

  get isNotAuthorized() {
    return this.hasStatus(401);
  }

  get isNotPermitted() {
    return this.hasStatus(403);
  }

  get isNotFound() {
    return this.hasStatus(404);
  }

  get isConflict() {
    return this.hasStatus(409);
  }

  get isUnprocessibleEntite() {
    return this.hasStatus(422);
  }

  get isServerError() {
    return this.hasStatus(500);
  }

  constructor(
    url: string,
    method: string | undefined,
    private readonly _response: Pick<Response, 'status' | 'statusText'>,
  ) {
    super(
      `Request [${method ?? 'GET'} ${url}] Failed: ` +
      `${_response.status} - ${_response.statusText}`,
    );

    Object.defineProperty(this, 'name', {
      value: 'RequestError',
      writable: false,
      configurable: false,
    });
  }
}

export const isRequestError = (error: any): error is RequestError =>
  error instanceof RequestError;
