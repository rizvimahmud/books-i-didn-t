import { Params } from "./with_user";
import { prisma } from "@lib/prisma";

export const getProps = async ({ context, user }: Params) => {
  const books = await prisma.book.findMany({
    include: {
      authors: true,
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(books)),
      user,
    },
  };
};
