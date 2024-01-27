import Navbar from "@/components/layout/navbar";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="w-[calc(100vw-40px)] mx-auto h-[calc(100vh-56px)] flex justify-center items-center">
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </>
  );
}

export default AuthLayout;
