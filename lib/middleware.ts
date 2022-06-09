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

    const decoded = verifyAccessToken(token);

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED);
    }

    return await handler(req, res);
  };
