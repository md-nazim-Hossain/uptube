import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";

function TermsAndPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-56px)] flex flex-col justify-between">
        <div className="container">{children}</div>
        <Footer />
      </div>
    </>
  );
}

export default TermsAndPolicyLayout;
