import axios from "axios";
import { NextApiRequest } from "next";
import { SigninPayload, UserDocument } from "types/Auth";
import { prisma } from "@lib/prisma";
import { Book } from "types/Book";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function createuser(user: UserDocument) {
  return prisma.user.create({
    data: user,
  });
}

export function signup(payload: UserDocument) {
  return api.post("/signup", payload);
}

export function signin(payload: SigninPayload) {
  return api.post("/signin", payload);
}

export function signout() {
  return api.get("/logout");
}

export function getMe() {
  return api.get("/me").then((res) => res.data);
}

export function getBooksByUser(): Promise<Book[]> {
  return api.get("/books").then((res) => res.data);
}
