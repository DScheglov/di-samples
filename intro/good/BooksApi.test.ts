import BooksApi from './BooksApi';

describe('BooksApi', () => {
  const get = jest.fn();
  const post = jest.fn();
  const books = new BooksApi({ get, post });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('calls GET /books', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({
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
        status: 405,
        statusText: 'Not Supported',
        headers: {},
        body: { data: [] },
      });

      await expect(books.getAll())
        .rejects
        .toThrowError('Failed to fetch Books: 405 - Not Supported');
    });
  });
});
