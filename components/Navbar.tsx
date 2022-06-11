import useUser from "@context/user-context";
import { signout } from "@lib/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Button } from "./Button";

export const Navbar = () => {
  const { user, setUser } = useUser();
  const signoutMutation = useMutation(signout);
  const router = useRouter();
  const handleSignout = () => {
    router.replace("/signin");
    setUser(null!);
    signoutMutation.mutate();
  };

  return (
    <nav>
      <div className="flex flex-row justify-between items-center max-w-4xl px-4 md:px-8 lg:px-0 mx-auto py-7 ">
        <Link href={`/`}>
          <a className="inline-block text-base font-semibold text-black tracking-wide">
            Books I Didn&apos;t
          </a>
        </Link>
        <ul className="flex items-center gap-4">
          <li className="text-base font-regular text-gray-500 capitalize">
            {user?.username}
          </li>
          <li>
            <Button className="py-3" onClick={handleSignout}>
              Sign Out
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
