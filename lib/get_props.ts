import { Params } from "./with_user";
import { prisma } from "@lib/prisma";

export const getAllBooks = async ({ user }: Params) => {
  const books = await prisma.book.findMany({
    include: {
      authors: true,
    },
  });

  return {
    props: {
      books: JSON.parse(JSON.stringify(books)),
      user,
    },
  };
};
