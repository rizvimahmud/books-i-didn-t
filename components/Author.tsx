import type { Author } from "types/Book";

interface AuthorsProps {
  authors: Author[];
}

export const Authors: React.FC<AuthorsProps> = ({ authors }) => {
  return <p className="text-xs text-gray-4">by {authors[0].name}</p>;
};
