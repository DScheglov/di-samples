export default class HttpError extends Error {
  constructor(
    public readonly request: Request,
    public readonly response: Response,
  ) {
    const { method, url } = request;
    const { status, statusText } = response;
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
