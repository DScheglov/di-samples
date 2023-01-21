export type Book = {
  id: string;
  title: string;
  publishingYear: number;
  authors: string[];
  isbn: string[];
};

export type CreateBookData = Omit<Book, 'id'>;

export interface IBooksApiClient {
  getAll(): Promise<Book[]>;
  getById(bookId: string): Promise<Book | null>;
  create(bookData: CreateBookData): Promise<Book>;
}
