"use client";

import SingleVideoCard from "@/components/single-video-card";
import { youtubeVideos } from "@/data";
import { IYoutubeVideo } from "@/types";

export default function Home() {
  return (
    <main className="cp-5 py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {youtubeVideos.map((url: IYoutubeVideo) => (
        <SingleVideoCard key={url.songName} {...url} />
      ))}
    </main>
  );
}
