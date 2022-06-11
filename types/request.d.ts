import { IncomingMessage } from "http";
import { NextApiRequest } from "next";

declare module "next" {
  export interface NextApiRequest extends IncomingMessage {
    locals: {
      uid: number;
    };
  }
}
