import React, { HTMLAttributes } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="w-full md:max-w-5xl px-9  mx-auto">{children}</main>
    </div>
  );
};
