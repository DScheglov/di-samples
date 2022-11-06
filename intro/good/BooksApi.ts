import type { Book, CreateBookData, IBooksApi } from './IBooksApi';
import * as Server from './Books.ServerTypes';
import * as Http from './IHttpClient';

export default class BooksApi implements IBooksApi {
  constructor(private readonly http: Pick<Http.IHttpClient, 'get' | 'post'>) {}

  async getAll(): Promise<Book[]> {
    const { status, statusText, body } = await this
      .http
      .get<Server.GetAllResponse>('/books');

    if (status !== Http.HTTP_OK) {
      throw new Error(`Failed to fetch books: ${status} - ${statusText}`);
    }

    return body.data;
  }

  async getById(bookId: string): Promise<Book | null> {
    const { status, statusText, body } = await this
      .http
      .get<Server.GetByIdResponse>(`/books/${bookId}`);

    if (status === Http.HTTP_NOT_FOUND) return null;

    if (status !== Http.HTTP_OK) {
      throw new Error(`Failed to fetch Book<${bookId}>: ${status} - ${statusText}`);
    }

    return body.data;
  }

  async create(bookData: CreateBookData): Promise<Book> {
    const { status, statusText, body } = await this
      .http
      .post<Server.CreateResponse, Server.CreatePayload>('/books', bookData);

    if (status !== Http.HTTP_CREATE_OK) {
      throw new Error(
        `Failed to Create Book<${bookData.isbn.join(', ')}>: ${status} - ${statusText}`,
      );
    }

    return body.data;
  }
}
