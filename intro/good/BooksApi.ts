import {
  CreatePayload, CreateResponse, GetAllResponse, GetByIdResponse,
} from './Books.ServerTypes';
import { hasStatus, readDataFromBody, rejectError } from './helpers';
import type { IBooksApi, CreateBookData, Book } from './IBooksApi';
import type { IHttpClient } from './IHttpClient';

export default class BooksApi implements IBooksApi {
  constructor(private readonly http: Pick<IHttpClient, 'get' | 'post'>) {}

  getAll(): Promise<Book[]> {
    return this
      .http
      .get<GetAllResponse>('/books')
      .then(response => (
        hasStatus(response, 200)
          ? readDataFromBody(response)
          : rejectError('Failed to fetch Books', response)
      ));
  }

  getById(bookId: string): Promise<Book | null> {
    return this
      .http
      .get<GetByIdResponse>(`/books/${bookId}`)
      .then(response => (
        hasStatus(response, 200) ? readDataFromBody(response) :
        hasStatus(response, 404) ? null :
        rejectError(`Failed to fetch Book<${bookId}>`, response)
      ));
  }

  create(bookData: CreateBookData): Promise<Book> {
    return this
      .http
      .post<CreateResponse, CreatePayload>('/books', bookData)
      .then(response => (
        hasStatus(response, 201)
          ? readDataFromBody(response)
          : rejectError(`Failed to Create Book<${bookData.isbn.join(', ')}>`, response)
      ));
  }
}
