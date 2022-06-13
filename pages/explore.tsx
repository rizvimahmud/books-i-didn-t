import { Authors } from "@components/Author";
import { Layout } from "@components/Layout";
import { NextLink } from "@components/NextLink";
import { getAllBooks } from "@lib/get_props";
import { withUser } from "@lib/with_user";
import React from "react";
import { Book } from "types/Book";

interface ExplorePageProps {
  books: Book[];
}

const ExplorePage: React.FC<ExplorePageProps> = ({ books }) => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-8">
        {books.map((book) => {
          return (
            <NextLink key={book.id?.toString()} href={`/book/${book.id}`}>
              <article className="px-8 py-6 bg-white border border-accent-3 rounded-lg hover:bg-accent-1 transition-colors duration-150">
                <h3 className="text-base text-gray-500 leading-5 mb-2">
                  {book.title}
                </h3>
                <Authors authors={book.authors} />
              </article>
            </NextLink>
          );
        })}
      </div>
    </Layout>
  );
};

export const getServerSideProps = withUser(getAllBooks);

export default ExplorePage;
