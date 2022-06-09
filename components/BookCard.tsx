import { Book } from "types/Book";
import React from "react";
import { Authors } from "./Author";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { title, authors, publishedAt } = book;
  return (
    <div className="px-6 py-6 bg-accent-1 rounded-md cursor-pointer hover:bg-accent-2 transition-colors duration-100">
      <h2 className="text-gray-6 text-base mb-2">{title}</h2>
      <Authors authors={authors} />
    </div>
  );
};
