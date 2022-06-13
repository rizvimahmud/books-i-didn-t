import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "context/user-context";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <UserProvider initialUser={pageProps?.user}>
          <Component {...pageProps} />
        </UserProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
