import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { getUserByEmail } from "@lib/api";
import { setCookie, signAccessToken, verifyHash } from "@utils/auth_utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const isNotValidRequest = req.method !== "POST" || !email || !password;
  if (isNotValidRequest) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  try {
    const userExists = await getUserByEmail(email);

    if (!userExists) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }
    const verifiedPassword = await verifyHash(userExists?.password, password);
    if (!verifiedPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }

    const token = signAccessToken({ uid: userExists.id });
    setCookie(res, token);
    return res.status(StatusCodes.OK).json({ data: token });
  } catch (error: any) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
