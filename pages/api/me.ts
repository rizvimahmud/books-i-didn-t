import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { verifyAuth } from "@lib/middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(StatusCodes.BAD_REQUEST);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.locals.uid,
      },
      select: {
        id: true,
        username: true,
        role: true,
        email: true,
      },
    });

    return res.status(StatusCodes.OK).json({ data: user });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export default verifyAuth(handler);
