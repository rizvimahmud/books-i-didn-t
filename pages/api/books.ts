import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404).json({ message: "Bad Request" });
    return;
  }

  const books = await prisma.book.findMany({
    include: {
      authors: true,
    },
  });
  res.status(StatusCodes.OK).json(books);
};

export default handler;
