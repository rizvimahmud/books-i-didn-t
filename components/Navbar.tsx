import useUser from "@context/user-context";
import { signout } from "@lib/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Button } from "./Button";
import cn from "clsx";

export const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user, setUser } = useUser();
  const signoutMutation = useMutation(signout);
  const router = useRouter();
  const handleSignout = () => {
    router.replace("/signin");
    setUser(null!);
    signoutMutation.mutate();
  };

  useEffect(() => {
    const handleScroll = () => {
      let offset = 0;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-20 bg-white border border-bottom border-gray-1 transition-all duration-200",
        {
          "shadow-sm": hasScrolled,
        }
      )}
    >
      <div className="flex flex-row justify-between items-center px-4 md:px-8 lg:px-14 py-5">
        <Link href={`/`}>
          <a className="inline-block text-base font-semibold text-black tracking-wide">
            Books I Didn&apos;t
          </a>
        </Link>
        <ul className="flex items-center gap-6">
          <li className="text-base font-regular text-gray-500 capitalize">
            {user?.username}
          </li>
          <li>
            <Button variant={"ghost"} onClick={handleSignout}>
              Sign Out
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
