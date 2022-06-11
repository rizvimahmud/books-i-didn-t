import Link, { LinkProps } from "next/link";
import { FC } from "react";
import { ReactNode } from "react";

interface NextLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export const NextLink: FC<NextLinkProps> = ({ href, children, className }) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};
