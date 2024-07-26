import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";

function ChannelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mt-16 min-h-[calc(100vh-56px)] flex flex-col justify-between">
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
}

export default ChannelLayout;