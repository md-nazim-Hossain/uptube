import React, { Suspense } from "react";
import Sidebar from "@/components/studio/layout/sidebar";
import StudioNavbar from "@/components/studio/layout/studio-navbar";

function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StudioNavbar />
      <div className="h-[calc(100vh-56px)] w-full flex overflow-hidden fixed">
        <Sidebar />
        <div className="flex-1">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
}

export default StudioRootLayout;
