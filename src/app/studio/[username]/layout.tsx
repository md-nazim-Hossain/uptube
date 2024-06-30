import React from "react";
import StudioNavbar from "../../../components/studio/studio-navbar";

function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StudioNavbar />
      <div className="min-h-[calc(100vh-56px)] w-full">{children}</div>
    </>
  );
}

export default StudioRootLayout;
