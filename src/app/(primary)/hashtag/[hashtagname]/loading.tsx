import { VideoCardSkeletons } from "@/components/skeletons/video-card-skeleton";
import React from "react";

function loading() {
  return <VideoCardSkeletons size={8} />;
}

export default loading;
