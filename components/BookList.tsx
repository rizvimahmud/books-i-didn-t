import React from "react";
import { Book } from "types/Book";
import { BookCard } from "./BookCard";
import { DotIcon } from "./DotIcon";

interface BookListProps {
  books: Book[];
  listName: string;
}

export const BookList: React.FC<BookListProps> = ({ books, listName }) => {
  const TOTAL_BOOKS = books?.length;
  const booksPrefix = TOTAL_BOOKS > 1 ? "book's" : "book";

  return (
    <section className="my-12">
      <div className="mb-4">
        <div className="flex flex-row items-center gap-2 text-base text-gray-600">
          <span>{listName}</span>
          <span>
            <DotIcon />
          </span>
          <span>
            {TOTAL_BOOKS} {booksPrefix}{" "}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books?.map((book: any) => (
          <div
            key={book.id?.toString()}
            className="border border-gray-1 rounded-md"
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
};
