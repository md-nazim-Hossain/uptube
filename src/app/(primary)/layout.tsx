import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import UptubeSidebar from "@/components/layout/uptube-sidebar";
import React from "react";

function PrimaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mt-14 min-h-[calc(100vh-56px)] flex flex-col justify-between">
        <div className="flex gap-5 container">
          <UptubeSidebar />
          <div className="flex-1">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PrimaryLayout;
