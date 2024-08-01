import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import UptubeSidebar from "@/components/layout/uptube-sidebar";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import React from "react";

function PrimaryLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const [, pathname] =
    fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];
  const isShorts = pathname?.startsWith("/shorts");
  return (
    <>
      <Navbar />
      <div className="mt-14 min-h-[calc(100vh-56px)] flex flex-col justify-between">
        <div
          className={cn("flex gap-5", isShorts ? "xs:container" : "container")}
        >
          <UptubeSidebar />
          <div className="flex-1">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PrimaryLayout;
