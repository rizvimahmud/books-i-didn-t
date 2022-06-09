import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { createuser, getUserByEmail } from "@lib/api";
import { hashPassword, setCookie, signAccessToken } from "@utils/auth_utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, email, password } = req.body;
  const isNotValidRequest =
    req.method !== "POST" || !email || !password || !username;
  if (isNotValidRequest) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  try {
    const userExists = await getUserByEmail(email);

    if (userExists) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createuser({
      username,
      email,
      password: hashedPassword,
    });
    const token = signAccessToken({ uid: user.id });
    setCookie(res, token);
    return res.status(StatusCodes.CREATED).json({ data: token });
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
}
