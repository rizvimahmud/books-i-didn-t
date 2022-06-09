import * as jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { CookieSerializeOptions } from "next/dist/server/web/types";
import {
  BASE_DOMAIN,
  IS_PRODUCTION,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from "./constants";
import nookies from "nookies";
import argon2 from "argon2";
import { AccessTokenPayload, Cookies } from "types/Auth";

enum CookieExpiration {
  Access = 7 * 24 * 60 * 60,
}

export function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET!);
}

const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  sameSite: IS_PRODUCTION ? "strict" : "lax",
  secure: IS_PRODUCTION,
  domain: BASE_DOMAIN,
  path: "/",
  maxAge: CookieExpiration.Access,
};

export function setCookie(res: NextApiResponse, access: string) {
  nookies.set({ res }, Cookies.AccessToken, access, cookieOptions);
}

export function hashPassword(password: string) {
  return argon2.hash(password);
}

export function verifyHash(hash: string, password: string) {
  return argon2.verify(hash, password);
}

export function clearCookie(res: NextApiResponse) {
  nookies.destroy({ res }, Cookies.AccessToken, {
    ...cookieOptions,
    maxAge: 0,
  });
}
