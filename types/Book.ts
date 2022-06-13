import { Prisma } from "@prisma/client";

export type Author = {
  id: number;
  name: string;
  image_url: string;
};

export type Book = {
  id?: number;
  title: string;
  subtitle: string;
  authors: Author[];
  publishedAt: Date | string;
  image_url?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ReadListResponse = {
  id?: string;
  name: string;
  books?: Book[];
};
