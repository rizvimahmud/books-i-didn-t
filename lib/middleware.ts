import { verifyAccessToken } from "@utils/auth_utils";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "types/Auth";

export const verifyAuth =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[Cookies.AccessToken];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Not Authorized" });
    }

    const { uid } = verifyAccessToken(token) as {
      uid: number;
      iat: number;
      exp: number;
    };

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED);
    }

    req.locals = { uid };

    return await handler(req, res);
  };
