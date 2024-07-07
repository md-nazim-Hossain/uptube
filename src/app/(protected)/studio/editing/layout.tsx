import { Typography } from "@/components/ui/typography";
import React from "react";

function EditingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Typography variant={"h3"} className="studio-container py-5">
        Channel Customisation
      </Typography>
      {children}
    </>
  );
}

export default EditingLayout;
