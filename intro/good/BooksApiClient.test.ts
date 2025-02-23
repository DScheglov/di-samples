import BooksApiClient from './BooksApiClient';
import { IHttpClient } from './IHttpClient';

describe('BooksApiClient (good)', () => {
  type Get = IHttpClient['get'];
  type Post = IHttpClient['post']

  const get = jest.fn<ReturnType<Get>, Parameters<Get>>();
  const post = jest.fn<ReturnType<Post>, Parameters<Post>>();

  const books = new BooksApiClient({ get, post });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('calls GET /books', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'Ok',
        headers: {},
        body: { data: [] },
      });

      await books.getAll();

      expect(get).toHaveBeenCalledWith('/books');
    });

    it('reads data from response body', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'Ok',
        headers: {},
        body: { data: [] },
      });

      expect(await books.getAll()).toEqual([]);
    });

    it('throws an error if response status is not equal to 200', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
        ok: false,
        status: 405,
        statusText: 'Not Supported',
        headers: {},
        body: { data: [] },
      });

      await expect(books.getAll())
        .rejects
        .toThrowError('Failed to fetch books: 405 - Not Supported');
    });
  });

  describe('getById', () => {
    it('calls GET /books/:bookId', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'Ok',
        headers: {},
        body: { data: {} },
      });

      await books.getById('book-1');

      expect(get).toHaveBeenCalledWith('/books/book-1');
    });

    it('reads data from response body', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'Ok',
        headers: {},
        body: {
          data: {
            id: 'book-1',
            title: 'Book #1',
            publishingYear: 2022,
            authors: ['Test'],
            isbn: 'isbn-1',
          },
        },
      });

      expect(await books.getById('book-1')).toEqual({
        id: 'book-1',
        title: 'Book #1',
        publishingYear: 2022,
        authors: ['Test'],
        isbn: 'isbn-1',
      });
    });

    it('returns null if response status is 404', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: {},
        body: { error: 'Book is not found' },
      });

      await expect(books.getById('book-1')).resolves.toBeNull();
    });

    it('throws an error if response status is not equal to 200 or 404', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
        ok: true,
        status: 405,
        statusText: 'Not Supported',
        headers: {},
        body: { data: [] },
      });

      await expect(books.getAll())
        .rejects
        .toThrowError('Failed to fetch books: 405 - Not Supported');
    });
  });
});
