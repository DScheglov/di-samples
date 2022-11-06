import {
  CreatePayload, CreateResponse, GetAllResponse, GetByIdResponse, ServerResponse,
} from './Books.ServerTypes';
import type { IBooksApi, CreateBookData, Book } from './IBooksApi';
import type { IHttpClient, Response } from './IHttpClient';

export default class BooksApi implements IBooksApi {
  constructor(private readonly http: Pick<IHttpClient, 'get' | 'post'>) {}

  private static readDataFromBody <T>({ body }: Response<ServerResponse<T>>) {
    return body.data;
  }

  private static hasStatus({ status }: Response<any>, expectedStatus: number) {
    return status === expectedStatus;
  }

  private static rejectError(message: string, { status, statusText }: Response<any>) {
    return Promise.reject(new Error(`${message}: ${status} - ${statusText}`));
  }

  getAll(): Promise<Book[]> {
    return this
      .http
      .get<GetAllResponse>('/books')
      .then(response => (
        BooksApi.hasStatus(response, 200)
          ? BooksApi.readDataFromBody(response)
          : BooksApi.rejectError('Failed to fetch Books', response)
      ));
  }

  getById(bookId: string): Promise<Book | null> {
    return this
      .http
      .get<GetByIdResponse>(`/books/${bookId}`)
      .then(response => (
        BooksApi.hasStatus(response, 200) ? BooksApi.readDataFromBody(response) :
        BooksApi.hasStatus(response, 404) ? null :
        BooksApi.rejectError(`Failed to fetch Book<${bookId}>`, response)
      ));
  }

  create(bookData: CreateBookData): Promise<Book> {
    return this
      .http
      .post<CreateResponse, CreatePayload>('/books', bookData)
      .then(response => (
        BooksApi.hasStatus(response, 201)
          ? BooksApi.readDataFromBody(response)
          : BooksApi.rejectError(`Failed to Create Book<${bookData.isbn.join(', ')}>`, response)
      ));
  }
}
