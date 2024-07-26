import Navbar from "@/components/layout/navbar";
import React from "react";

function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-56px)] overflow-y-auto scroll">
        <div className="container">{children}</div>
      </div>
    </>
  );
}

export default FeedLayout;
