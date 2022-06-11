import { verifyAuth } from "@lib/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404).json({ message: "Bad Request" });
    return;
  }

  const books = await prisma.book.findMany({
    where: {
      users: {
        some: {
          id: req.locals.uid,
        },
      },
    },
    include: {
      authors: true,
    },
  });
  res.status(200).json(books);
};

export default verifyAuth(handler);
