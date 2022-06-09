import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="">
      <div className="flex flex-row max-w-4xl mx-auto py-7 ">
        <Link href={`/`}>
          <a className="inline-block text-base font-semibold text-black tracking-wide">
            Books I Didn&apos;t
          </a>
        </Link>
      </div>
    </nav>
  );
};
