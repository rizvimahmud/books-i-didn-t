import { Layout } from "./Layout";
import { Spinner } from "./Spinner";

export const LoadingState = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <Spinner width={"48px"} />
      </div>
    </Layout>
  );
};
