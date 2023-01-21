import type { Book, CreateBookData, IBooksApiClient } from './IBooksApiClient';
import { BooksApi } from './BooksApiProvider.types';
import {
  HTTP_STATUS,
  IHttpClient,
} from './IHttpClient';
import { throwError } from './throwError';

export default class BooksApiClient implements IBooksApiClient {
  constructor(private readonly http: Pick<IHttpClient, 'get' | 'post'>) {}

  async getAll(): Promise<Book[]> {
    const {
      status,
      statusText,
      body,
    } = await this.http.get<BooksApi.GetAllResponseBody>('/books');

    return (
      status === HTTP_STATUS.OK ? body.data :
      throwError(`Failed to fetch books: ${status} - ${statusText}`)
    );
  }

  async getById(bookId: string): Promise<Book | null> {
    const {
      status,
      statusText,
      body,
    } = await this.http.get<BooksApi.GetByIdResponseBody>(`/books/${bookId}`);

    return (
      status === HTTP_STATUS.OK ? body.data :
      status === HTTP_STATUS.NOT_FOUND ? null :
      throwError(`Failed to fetch Book<${bookId}>: ${status} - ${statusText}`)
    );
  }

  async create(bookData: CreateBookData): Promise<Book> {
    const {
      status,
      statusText,
      body,
    } = await this.http.post<BooksApi.CreateResponseBody>('/books', bookData);

    return (
      status === HTTP_STATUS.CREATED ? body.data :
      throwError(`Failed to create Book<${bookData.isbn.join(', ')}>: ${status} - ${statusText}`)
    );
  }
}
