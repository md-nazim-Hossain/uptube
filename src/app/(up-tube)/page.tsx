"use client";
import MoviesSlider from "@/components/movies-slider";
import { Typography } from "@/components/ui/typography";
import Videos from "@/components/videos";
import { youtubeVideos } from "@/data";

export default function Home() {
  return (
    <main className="cp-10">
      <div>
        <Typography variant={"h3"}>Videos</Typography>
        <Videos videos={youtubeVideos} />
      </div>
      <div>
        <Typography variant={"h3"}>Movies</Typography>
        <MoviesSlider movies={youtubeVideos} />
      </div>
    </main>
  );
}
