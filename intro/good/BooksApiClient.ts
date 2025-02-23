import type { Book, CreateBookData, IBooksApiClient } from './IBooksApiClient';
import { BooksApi } from './BooksApiProvider.types';
import { HTTP_STATUS, IHttpClient } from './IHttpClient';
import { throwError } from './throwError';

export default class BooksApiClient implements IBooksApiClient {
  constructor(
    private readonly http: Pick<IHttpClient, 'get' | 'post'>,
  ) {}

  async getAll(): Promise<Book[]> {
    const {
      status,
      statusText,
      body,
    } = await this.http.get('/books');

    return (
      status === HTTP_STATUS.OK ? (body as BooksApi.GetAllResponseBody).data :
      throwError(`Failed to fetch books: ${status} - ${statusText}`)
    );
  }

  async getById(bookId: string): Promise<Book | null> {
    const {
      status,
      statusText,
      body,
    } = await this.http.get(`/books/${bookId}`);

    return (
      status === HTTP_STATUS.OK ? (body as BooksApi.GetByIdResponseBody).data :
      status === HTTP_STATUS.NOT_FOUND ? null :
      throwError(`Failed to fetch Book<${bookId}>: ${status} - ${statusText}`)
    );
  }

  async create(bookData: CreateBookData): Promise<Book> {
    const {
      status,
      statusText,
      body,
    } = await this.http.post('/books', bookData);

    return (
      status === HTTP_STATUS.CREATED ? (body as BooksApi.CreateResponseBody).data :
      throwError(`Failed to create Book<${bookData.isbn.join(', ')}>: ${status} - ${statusText}`)
    );
  }
}
