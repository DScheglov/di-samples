export default class RequestError extends Error {
  hasStatus(status: number) {
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
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(
      `Request [${method ?? 'GET'} ${url}] Failed: ` +
      `${status} - ${statusText}`,
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
