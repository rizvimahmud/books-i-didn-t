import { NextLink } from "@components/NextLink";
import useUser from "@context/user-context";

import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user]);

  return (
    <main className="max-w-lg mx-auto pt-9">
      <section className="min-h-screen px-8 md:px-0">
        <div className="mt-8">
          <h1 className="text-4xl font-bold tracking-wider text-center leading-tight text-black">
            Record your reading goals
          </h1>
          <div className="flex flex-col items-center mt-8">
            <NextLink
              href="/signup"
              className="px-4 py-3 bg-black rounded-md text-base text-white hover:opacity-75"
            >
              Create a free account
            </NextLink>
            <span className="my-2 text-gray-500 text-sm">Or</span>
            <p className="text-base text-gray-500">
              <NextLink href={"/signin"} className="underline">
                Sign In
              </NextLink>{" "}
              to your account
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
