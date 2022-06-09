import { Layout } from "@components/Layout";
import { Book } from "types/Book";
import { BookCard } from "@components/BookCard";
import { withUser } from "@lib/with_user";
import { UserDocument, UserDocumentWithoutPassword } from "types/Auth";
import { getProps } from "@lib/get_props";

const Index = ({
  data: books,
  user,
}: {
  data: Book[];
  user: UserDocumentWithoutPassword;
}) => {
  return (
    <Layout>
      <section className="pt-8">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.map((book) => (
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

export const getServerSideProps = withUser(getProps);

export default Index;
