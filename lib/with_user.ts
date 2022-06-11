import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import nookies from "nookies";
import { prisma } from "@lib/prisma";
import {
  AccessTokenPayload,
  UserDocumentWithoutPassword,
  Cookies,
} from "types/Auth";
import { verifyAccessToken } from "@utils/auth_utils";

export interface Params {
  context: GetServerSidePropsContext;
  user: UserDocumentWithoutPassword;
}

export const withUser = <T>(
  cb?: (params: Params) => Promise<GetServerSidePropsResult<T>>
) => {
  const getServerSideProps: GetServerSideProps<T> = async (context) => {
    const defaultReturnObject = {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

    try {
      const cookies = nookies.get(context);
      const token = cookies[Cookies.AccessToken] || "";
      const verifiedToken = verifyAccessToken(token) as AccessTokenPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: verifiedToken?.uid,
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      });
      if (!token || !verifiedToken || !user) {
        return defaultReturnObject;
      }

      const response = cb ? await cb({ context, user }) : {};
      const props = (response as any).props || {};
      return {
        ...response,
        props: {
          ...props,
          user,
        },
      };
    } catch (error) {
      console.error(error);
      return defaultReturnObject;
    }
  };

  return getServerSideProps;
};
