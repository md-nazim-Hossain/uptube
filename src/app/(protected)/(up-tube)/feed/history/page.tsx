import WatchHistory from "@/components/feed/watch-history";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = generateClientMetadata({
  title: "Watch history",
});
function page() {
  return <WatchHistory />;
}

export default page;
