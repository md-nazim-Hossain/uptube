import DiscoverSlider from "@/components/slider/discover-slider";
import MoviesSlider from "@/components/slider/movies-slider";
import TopFans from "@/components/top-fans";
import { Typography } from "@/components/ui/typography";
import Videos from "@/components/videos";
import { youtubeVideos } from "@/data";

export default function Home() {
  return (
    <main className="cp-10 pt-5">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <Typography variant={"h3"}>Discover your favorites</Typography>
          <DiscoverSlider favorites={youtubeVideos.slice(0, 4)} />
          <Typography variant={"h3"}>Videos</Typography>
          <Videos videos={youtubeVideos} />
        </div>
        <div className="basis-[200px] pb-5">
          <TopFans />
        </div>
      </div>

      <div>
        <Typography variant={"h3"}>Movies</Typography>
        <MoviesSlider movies={youtubeVideos} />
      </div>
    </main>
  );
}
