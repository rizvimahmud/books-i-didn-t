import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-xl mx-auto pt-12 px-6 md:px-8">{children}</main>
    </div>
  );
};
