import ContentTabs from "@/components/studio/content/content-tabs";
import { Typography } from "@/components/ui/typography";
import React from "react";

function ContentRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Typography variant={"h3"} className="studio-container py-5">
        Channel Content
      </Typography>
      <ContentTabs />
      <div className="py-5 h-[calc(100vh-177px)] scroll overflow-y-auto">
        {children}
      </div>
    </>
  );
}

export default ContentRootLayout;
