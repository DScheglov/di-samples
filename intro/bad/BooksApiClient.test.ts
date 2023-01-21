import BooksApiClient from './BooksApiClient';

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
}) as Response;

describe('BooksApiClient (bad)', () => {
  type Fetch = typeof fetch;

  const books = new BooksApiClient('http://test', 'secret-token');

  afterEach(() => {
    globalThis.fetch = nativeFetch;
  });

  describe('getAll', () => {
    it('sends GET <baseUrl>/books with correct headers', async () => {
      expect.assertions(4);

      const mockedFetch = jest.fn<ReturnType<Fetch>, Parameters<Fetch>>();

      mockedFetch.mockResolvedValueOnce(
        FakeResponse(200, { data: [] }),
      );

      globalThis.fetch = mockedFetch;

      await books.getAll();

      const { url, method, headers } = mockedFetch.mock.calls[0][0] as Request;

      expect(url).toBe('http://test/books');
      expect(method).toBe('GET');
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('Authorization')).toBe('Bearer secret-token');
    });

    it('reads data from response body', async () => {
      expect.assertions(1);

      const mockedFetch = jest.fn<ReturnType<Fetch>, Parameters<Fetch>>();

      mockedFetch.mockResolvedValueOnce(
        FakeResponse(200, { data: [] }),
      );

      globalThis.fetch = mockedFetch;

      expect(await books.getAll()).toEqual([]);
    });
  });

  describe('getById', () => {
    it('sends GET <baseUrl>/books/:id with correct headers', async () => {
      expect.assertions(4);

      const mockedFetch = jest.fn<ReturnType<Fetch>, Parameters<Fetch>>();

      mockedFetch.mockResolvedValueOnce(
        FakeResponse(200, { data: {} }),
      );

      globalThis.fetch = mockedFetch;

      await books.getById('book-1');

      const { url, method, headers } = mockedFetch.mock.calls[0][0] as Request;

      expect(url).toBe('http://test/books/book-1');
      expect(method).toBe('GET');
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('Authorization')).toBe('Bearer secret-token');
    });

    it('reads data from response body', async () => {
      expect.assertions(1);

      const mockedFetch = jest.fn<ReturnType<Fetch>, Parameters<Fetch>>();

      mockedFetch.mockResolvedValueOnce(
        FakeResponse(200, {
          data: {
            id: 'book-1',
            title: 'Book #1',
            publishingYear: 2022,
            authors: ['Test'],
            isbn: 'isbn-1',
          },
        }),
      );

      globalThis.fetch = mockedFetch;

      expect(await books.getById('book-1')).toEqual({
        id: 'book-1',
        title: 'Book #1',
        publishingYear: 2022,
        authors: ['Test'],
        isbn: 'isbn-1',
      });
    });

    it('returns null if book is not found', async () => {
      expect.assertions(1);

      const mockedFetch = jest.fn<ReturnType<Fetch>, Parameters<Fetch>>();

      mockedFetch.mockResolvedValueOnce(
        FakeResponse(404, { error: 'Book is not found' }),
      );

      globalThis.fetch = mockedFetch;

      expect(await books.getById('book-1')).toBeNull();
    });
  });
});
