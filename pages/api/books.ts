import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(404).json({ message: "Bad Request" });
    return;
  }
  const books = await prisma.book.findMany();
  console.log("here");
  console.log({ books });
  res.status(200).json(books);
}
