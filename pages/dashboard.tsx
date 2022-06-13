import React from "react";
import { useQuery } from "react-query";
import { Layout } from "@components/Layout";
import { getUsersBookLists } from "@lib/api";
import { withUser } from "@lib/with_user";
import { UserDocumentWithoutPassword } from "types/Auth";
import { QueryKeys } from "types/Query";
import { LoadingState } from "@components/LoadingState";
import { serializeList } from "@utils/serializeLists";
import { BookList } from "@components/BookList";
import { NextLink } from "@components/NextLink";

interface DashboardProps {
  user?: UserDocumentWithoutPassword;
}

const DashboardPage: React.FC<DashboardProps> = ({ user }) => {
  const { data, isLoading } = useQuery(QueryKeys.BOOKS, getUsersBookLists);

  if (isLoading && !data) {
    return <LoadingState />;
  }

  const USER_NAME = user?.username.split(" ")[0];

  if (data?.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center pt-32">
          <h1 className="text-2xl tracking-wider text-black font-semibold">
            <span className="inline-block mr-3">Welcome</span>
            <span className="inline-block">{USER_NAME}</span>
          </h1>
          <div className="mt-6">
            <NextLink
              href={"/explore"}
              className="px-4 py-3 rounded-md bg-white border border-gray-300 hover:border-gray-500 transition-colors duration-150"
            >
              Find something to read
            </NextLink>
          </div>
        </div>
      </Layout>
    );
  }

  const { read, to_read } = serializeList(data!);
  const readList = read?.books;
  const toReadList = to_read?.books;

  return (
    <Layout>
      <BookList books={readList!} listName={"Read"} />
      <BookList books={toReadList!} listName={"To Read"} />
    </Layout>
  );
};

export const getServerSideProps = withUser();

export default DashboardPage;
