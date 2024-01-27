import React from "react";
import FullViewVideo from "./_components/full-view-video";

function page({ searchParams: { v } }: { searchParams: { v: string } }) {
  return (
    <div>
      <FullViewVideo url={v} />
    </div>
  );
}

export default page;
