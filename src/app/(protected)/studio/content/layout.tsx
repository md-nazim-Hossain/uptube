import { Typography } from "@/components/ui/typography";
import UPTubeTabs from "@/components/uptube/uptube-tabs";
import React from "react";

function ContentRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Typography variant={"h3"} className="studio-container py-5">
        Channel Content
      </Typography>
      <UPTubeTabs
        tabs={[
          { href: "/studio/content/videos", label: "Videos" },
          { href: "/studio/content/shorts", label: "Shorts" },
          { href: "/studio/content/posts", label: "Posts" },
          { href: "/studio/content/playlists", label: "Playlists" },
        ]}
      />
      <div className="py-5 h-[calc(100vh-177px)] scroll overflow-y-auto">
        {children}
      </div>
    </>
  );
}

export default ContentRootLayout;
