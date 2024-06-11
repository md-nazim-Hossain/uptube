import React from "react";
import FullViewVideo from "./_components/full-view-video";
import { redirect } from "next/navigation";

function page({ searchParams: { v } }: { searchParams: { v: string } }) {
  if (!v) redirect("/");
  return (
    <div>
      <FullViewVideo url={v} />
    </div>
  );
}

export default page;
