/**
 * Automaticaly generated file (from books.swagger)
 */

export type ServerBookModel = {
  id: string;
  title: string;
  publishingYear: number;
  authors: string[];
  isbn: string[];
};

export type ServerResponse<T> = { data: T; };

export type GetAllResponse = ServerResponse<ServerBookModel[]>;

export type GetByIdResponse = ServerResponse<ServerBookModel>;

export type CreatePayload = {
  title: string;
  publishingYear: number;
  authors: string[];
  isbn: string[];
}

export type CreateResponse = ServerResponse<ServerBookModel>;
