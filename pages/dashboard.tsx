import React from "react";
import { useQuery } from "react-query";
import { BookCard } from "@components/BookCard";
import { Layout } from "@components/Layout";
import { getBooksByUser } from "@lib/api";
import { withUser } from "@lib/with_user";
import { UserDocumentWithoutPassword } from "types/Auth";
import { QueryKeys } from "types/Query";
import useUser from "@context/user-context";

interface DashboardProps {
  user?: UserDocumentWithoutPassword;
}

const DashboardPage: React.FC<DashboardProps> = () => {
  const { data: books, isLoading } = useQuery(QueryKeys.BOOKS, getBooksByUser);

  if (isLoading && !books) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section className="pt-8">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books?.map((book) => (
              <div
                key={book.id?.toString()}
                className="border border-gray-1 rounded-md"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps = withUser();

export default DashboardPage;
