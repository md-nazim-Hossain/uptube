import ContentTabs from "@/components/studio/content/content-tabs";
import { Typography } from "@/components/ui/typography";
import React from "react";

function ContentRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Typography variant={"h3"} className="studio-container py-5">
        Channel Content
      </Typography>
      <ContentTabs />
      {children}
    </div>
  );
}

export default ContentRootLayout;
