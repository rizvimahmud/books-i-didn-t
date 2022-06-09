import { verifyAuth } from "@lib/middleware";
import { clearCookie } from "@utils/auth_utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    clearCookie(res);
    res.end();
  }
};

export default verifyAuth(handler);
