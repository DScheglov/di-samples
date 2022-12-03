import ApiClient from './ApiClient';
import { isRequestError } from './RequestError';

export type ServerBookModel = {
  id: string;
  title: string;
  publishingYear: number;
  authors: string[];
  isbn: string[];
}

export type ServerCreateBookData = Omit<ServerBookModel, 'id'>;

export default class BooksApi extends ApiClient {
  constructor(baseUrl: string, token: string) {
    super(baseUrl, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  protected readBody(body: any) {
    return body.data;
  }

  getAll(): Promise<ServerBookModel[]> {
    return this.get('/books');
  }

  async getById(bookId: string): Promise<ServerBookModel | null> {
    try {
      return await this.get(`/books/${bookId}`);
    } catch (error) {
      if (isRequestError(error) && error.isNotFound) return null;
      throw error;
    }
  }

  create(bookData: ServerCreateBookData): Promise<ServerBookModel> {
    return this.post('/books', bookData);
  }
}
