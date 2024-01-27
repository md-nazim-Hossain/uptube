import Navbar from "@/components/layout/navbar";
import React from "react";

function UpTubeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default UpTubeLayout;
