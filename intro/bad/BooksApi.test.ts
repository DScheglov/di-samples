import BooksApi from './BooksApi';

const nativeFetch = globalThis.fetch;

const FakeResponse = (status: number, body: any) => ({
  ok: status >= 200 && status < 300,
  status,
  statusText:
    status >= 200 && status < 300 ? 'Ok' :
    status === 401 ? 'Not Authorized' :
    status === 403 ? 'Not Permitted' :
    status === 409 ? 'Conflict' :
    status === 422 ? 'Unprocessible Entity' :
    status === 500 ? 'Internal Server Error' :
    `${status}`,
  json: () => Promise.resolve(body),
});

describe('BooksApi', () => {
  const books = new BooksApi('http://test', 'secret-token');

  afterEach(() => {
    globalThis.fetch = nativeFetch;
  });

  describe('getAll', () => {
    it('calls GET <baseUrl>/books with correct headers', async () => {
      expect.assertions(1);

      globalThis.fetch = jest.fn().mockResolvedValueOnce(
        FakeResponse(200, { data: [] }),
      );

      await books.getAll();

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://test/books',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer secret-token',
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('reads data from response body', async () => {
      expect.assertions(1);

      globalThis.fetch = jest.fn().mockResolvedValueOnce(
        FakeResponse(200, { data: [] }),
      );

      expect(await books.getAll()).toEqual([]);
    });
  });
});
