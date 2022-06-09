import React, { HTMLAttributes } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="h-screen mx-auto">
      <Navbar />
      <main className="w-full md:max-w-3xl px-9 md:px-4 mx-auto">
        {children}
      </main>
    </div>
  );
};
