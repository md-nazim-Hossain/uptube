import React from "react";
import WatchVideoPage from "@/components/videos/watch-video-page";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { IAPIResponse, IVideo } from "@/types";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const id = searchParams?.v;
  const data = (await axios
    .get(apiRoutes.videos.getVideoById + id)
    .then((res) => res.data)) as IAPIResponse<IVideo>;
  const video = data?.data;
  return generateClientMetadata({
    title: video?.title || "UPTube",
    descriptions: video?.description,
    keywords: [video?.title ?? "", video?.description ?? ""],
  });
}

function WatchPage({ searchParams }: { searchParams: { v: string } }) {
  const { v } = searchParams;
  if (!v) redirect("/");

  return <WatchVideoPage videoId={v} />;
}

export default WatchPage;
