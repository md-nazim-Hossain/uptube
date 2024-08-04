import { getContentByType } from "@/_actions/video/getContentByType";
import DiscoverFavorites from "@/components/discover-favorites";
import ShortsSlider from "@/components/slider/shorts-slider";
import TopFans from "@/components/top-fans";
import { Typography } from "@/components/ui/typography";
import SingleVideoCard from "@/components/videos/single-video-card";
import Videos from "@/components/videos/videos";
import { IVideo } from "@/types";

export const revalidate = 60 * 5;
async function Home() {
  const videos = await getContentByType();
  const shorts = await getContentByType("?type=short&limit=10");

  return (
    <main className="container pt-2">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <DiscoverFavorites />

          {/* load initial videos */}
          {videos?.data?.length && (
            <>
              <Typography variant={"h3"}>Videos</Typography>
              <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos.data.map((video: IVideo, index: number) => (
                  <SingleVideoCard key={index} {...video} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="basis-[200px] pb-5">
          <TopFans />
        </div>
      </div>

      <div>
        {shorts?.data?.length && (
          <>
            <Typography variant={"h3"}>Shorts</Typography>
            <ShortsSlider shorts={shorts?.data} />
          </>
        )}
        {videos?.data?.length && (
          <>
            <Typography variant={"h3"}>Feed</Typography>
            <Videos initialData={videos} />
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
