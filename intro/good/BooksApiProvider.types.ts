/**
 * Automaticaly generated file (from books.swagger)
 */

type ResponseBody<T> = { data: T };

export namespace BooksApi {
  export type Book = {
    id: string;
    title: string;
    publishingYear: number;
    authors: string[];
    isbn: string[];
  }

  export type GetAllResponseBody = ResponseBody<Book[]>;

  export type GetByIdResponseBody = ResponseBody<Book>;

  export type CreateResponseBody = ResponseBody<Book>;
}
