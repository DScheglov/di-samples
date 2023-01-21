import JsonApiClient, { HttpError } from './JsonApiClient';

export type Book = {
  id: string;
  title: string;
  publishingYear: number;
  authors: string[];
  isbn: string[];
}

export type CreateBookData = Omit<Book, 'id'>;

export default class BooksApiClient extends JsonApiClient {
  constructor(baseUrl: string, token: string) {
    super(baseUrl, {
      Authorization: `Bearer ${token}`,
    });
  }

  async getAll(): Promise<Book[]> {
    const body = await this.get('/books');
    return body.data;
  }

  async getById(bookId: string): Promise<Book | null> {
    try {
      const body = await this.get(`/books/${bookId}`);
      return body.data;
    } catch (error) {
      if (error instanceof HttpError && error.response.status === 404) return null;
      throw error;
    }
  }

  async create(bookData: CreateBookData): Promise<Book> {
    const body = await this.post('/books', bookData);
    return body.data;
  }
}
