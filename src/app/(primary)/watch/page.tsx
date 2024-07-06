import React from "react";
import WatchVideoPage from "@/components/videos/watch-video-page";
import { redirect } from "next/navigation";

function WatchPage({ searchParams }: { searchParams: { v: string } }) {
  const { v } = searchParams;
  if (!v) redirect("/");
  return <WatchVideoPage videoId={v} />;
}

export default WatchPage;
