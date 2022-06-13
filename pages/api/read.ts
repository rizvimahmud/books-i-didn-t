import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { verifyAuth } from "@lib/middleware";
import { StatusCodes } from "http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(StatusCodes.BAD_REQUEST);
    return;
  }

  try {
    const books = await prisma.list.findMany({
      where: {
        userId: {
          equals: req.locals.uid,
        },
      },
      include: {
        books: {
          include: {
            authors: true,
          },
        },
      },
    });
    res.status(StatusCodes.OK).json(books);
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export default verifyAuth(handler);
