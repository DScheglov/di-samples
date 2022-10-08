import { isRequestError } from '../common/RequestError';
import {
  CreatePayload, CreateResponse, GetAllResponse, GetByIdResponse,
} from './Books.ServerTypes';
import type { IBooksApi, CreateBookData, Book } from './IBooksApi';
import type { IHttpClient } from './IHttpClient';

const readDataFromBody = <T>(body: { data: T }) => body.data;

export default class BooksApi implements IBooksApi {
  constructor(private readonly http: Pick<IHttpClient, 'get' | 'post'>) {}

  getAll(): Promise<Book[]> {
    return this.http.get<GetAllResponse>('/books').then(readDataFromBody);
  }

  getById(bookId: string): Promise<Book | null> {
    return this.http.get<GetByIdResponse>(`/books/${bookId}`).then(
      readDataFromBody,
      error => (
        isRequestError(error) && error.isNotFound
          ? null
          : Promise.reject(error)
      ),
    );
  }

  create(bookData: CreateBookData): Promise<Book> {
    return this.http.post<CreateResponse, CreatePayload>('/books', bookData).then(readDataFromBody);
  }
}
