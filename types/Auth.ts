import { Prisma } from "@prisma/client";

export type AccessTokenPayload = {
  uid: number;
};

export type UserDocument = Prisma.UserCreateInput;

export type SigninPayload = Pick<UserDocument, "email" | "password">;
export type UserDocumentWithoutPassword = Omit<UserDocument, "password">;
export enum Cookies {
  AccessToken = "access",
}
