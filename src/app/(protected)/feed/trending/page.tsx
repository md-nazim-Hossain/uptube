"use client";
import TrendingMusic from "@/components/feed/trending-music";
import TrendingNow from "@/components/feed/trending-now";
import TrendingTabs from "@/components/feed/trending-tabs";
import { Typography } from "@/components/ui/typography";
import UpTubeImage from "@/components/uptube/uptube-image";
import { useSearchParams } from "next/navigation";
import React from "react";

function TrendingPage() {
  const currentTab = useSearchParams().get("type") || "now";
  return (
    <div className="py-5 space-y-5">
      <div className="max-w-4xl mx-auto flex items-center gap-5 ">
        <span className="size-[72px] rounded-full relative overflow-hidden">
          <UpTubeImage
            src={"/assets/images/trending.png"}
            alt="Trending image logo"
          />
        </span>
        <Typography variant={"h2"}>Trending</Typography>
      </div>
      <TrendingTabs />
      <div className="max-w-4xl mx-auto">
        {currentTab === "now" && <TrendingNow />}
        {currentTab === "music" && <TrendingMusic />}
      </div>
    </div>
  );
}

export default TrendingPage;
