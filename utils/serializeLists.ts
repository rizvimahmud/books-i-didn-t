import { ReadListResponse } from "types/Book";

export const serializeList = (lists: ReadListResponse[]) => {
  return lists.reduce((acc, val) => {
    acc[val.name] = { books: val.books, name: val.name };
    return acc;
  }, {} as Record<string, Omit<ReadListResponse, "id">>);
};
