import axios from "axios";
import { SigninPayload, UserDocument } from "types/Auth";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function getBooks() {
  return api.get("/books");
}

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

export default function signin(payload: SigninPayload) {
  return api.post("/signin", payload);
}
