import LikeVideos from "@/components/feed/like-videos";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = generateClientMetadata({
  title: "Like Videos",
});
function page() {
  return <LikeVideos />;
}

export default page;
