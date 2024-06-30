import React from "react";
import StudioNavbar from "../../components/studio/studio-navbar";
import Sidebar from "@/components/studio/sidebar";

function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StudioNavbar />
      <div className="min-h-[calc(100vh-56px)] w-full flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export default StudioRootLayout;
