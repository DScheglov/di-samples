import type { Book, CreateBookData, IBooksApi } from './IBooksApi';
import { CreateResponseBody, GetAllResponseBody, GetByIdResponseBody } from './Books.ServerTypes';
import {
  HTTP_CREATED, HTTP_NOT_FOUND, HTTP_OK, IHttpClient,
} from './IHttpClient';
import { throwError } from './throwError';

export default class BooksApi implements IBooksApi {
  constructor(private readonly http: Pick<IHttpClient, 'get' | 'post'>) {}

  getAll(): Promise<Book[]> {
    return this.http.get('/books').then(
      ({ status, statusText, body }) => (
        status === HTTP_OK
          ? (body as GetAllResponseBody).data
          : throwError(`Failed to fetch books: ${status} - ${statusText}`)
      ),
    );
  }

  getById(bookId: string): Promise<Book | null> {
    return this.http.get(`/books/${bookId}`).then(
      ({ status, statusText, body }) => (
        status === HTTP_OK ? (body as GetByIdResponseBody).data :
        status === HTTP_NOT_FOUND ? null :
        throwError(`Failed to fetch Book<${bookId}>: ${status} - ${statusText}`)
      ),
    );
  }

  create(bookData: CreateBookData): Promise<Book> {
    return this.http.post('/books', bookData).then(
      ({ status, statusText, body }) => (
        status === HTTP_CREATED
          ? (body as CreateResponseBody).data
          : throwError(`Failed to create Book<${bookData.isbn.join(', ')}>: ${status} - ${statusText}`)
      ),
    );
  }
}
