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

      get.mockResolvedValueOnce({ data: [] });

      await books.getAll();

      expect(get).toHaveBeenCalledWith('/books');
    });

    it('reads data from response body', async () => {
      expect.assertions(1);

      get.mockResolvedValueOnce({ data: [] });

      expect(await books.getAll()).toEqual([]);
    });
  });
});
