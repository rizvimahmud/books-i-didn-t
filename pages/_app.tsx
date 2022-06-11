import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "context/user-context";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider initialUser={pageProps?.user}>
        <Component {...pageProps} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
