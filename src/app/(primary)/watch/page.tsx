import React from "react";
import WatchVideoPage from "@/components/videos/watch-video-page";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { getVideoById } from "@/actions/getVideoById";
import FullViewVideo from "@/components/videos/full-view-video";
import WatchPageSkeletons from "@/components/skeletons/watch-page-skeletons";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const id = searchParams?.v;
  if (!id)
    return generateClientMetadata({
      title: "UPTube",
    });
  const video = await getVideoById(id as string);
  if (!video)
    return generateClientMetadata({
      title: "UPTube",
    });
  return generateClientMetadata({
    title: video?.title || "UPTube",
    descriptions: video?.description,
    keywords: [video?.title ?? "", video?.description ?? ""],
  });
}

async function WatchPage({ searchParams }: Props) {
  const { v } = searchParams;
  if (!v) redirect("/");
  const video = await getVideoById(v as string);
  if (!video) return notFound();
  return <FullViewVideo video={video} />;
}

export default WatchPage;
