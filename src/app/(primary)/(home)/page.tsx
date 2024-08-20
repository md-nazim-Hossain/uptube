import { getContentByType } from "@/_actions/video/getContentByType";
import DiscoverFavorites from "@/components/discover-favorites";
import Posts from "@/components/posts/posts";
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
  const notFeedVideos = videos?.data?.slice(0, 8) || [];
  return (
    <main className="container pt-2">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <DiscoverFavorites />

          {/* load initial videos */}
          {!!notFeedVideos?.length && (
            <>
              <Typography variant={"h3"}>Videos</Typography>
              <div className="py-5 grid gap-3 md:gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {notFeedVideos?.map((video: IVideo, index: number) => (
                  <SingleVideoCard
                    className="w-full sm:max-w-max lg:max-w-md"
                    key={index}
                    {...video}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="basis-[200px] pb-3 h-full overflow-y-auto scroll max-h-[1000px]">
          <TopFans />
        </div>
      </div>

      <div>
        {!!shorts?.data?.length && (
          <>
            <Typography variant={"h3"}>Shorts</Typography>
            <ShortsSlider shorts={shorts?.data} />
          </>
        )}
        <Posts />
        {!!videos?.data?.length && (
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
