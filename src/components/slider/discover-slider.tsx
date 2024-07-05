"use client";

import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { IUserFavoriteVideo, IVideo } from "@/types";
import { cn } from "@/lib/utils";
import { VideoCardPlayer, VideoDetails } from "../ui/video-card";
import { Typography } from "../ui/typography";
import Link from "next/link";

type Props = {
  favorites: IUserFavoriteVideo[];
  className?: string;
};
function DiscoverSlider({ favorites, className }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
      }}
      className={cn("w-full py-5 group", className)}
    >
      <CarouselContent>
        {favorites.map((favorite: IUserFavoriteVideo, index: number) => {
          const video = favorite?.video as IVideo;
          return (
            <CarouselItem
              className="basis-full relative h-[450px] lg:h-[650px] rounded-2xl overflow-hidden"
              key={index}
            >
              <VideoCardPlayer
                className="w-full h-full aspect-auto"
                url={video?.videoFile}
                thumbnail={video?.thumbnail}
                videoDuration={video?.duration}
                _id={video?._id}
              />
              <div className="absolute bottom-10 left-10 space-y-5">
                <Typography variant={"h1"} className="text-white">
                  {video?.title}
                </Typography>
                <VideoDetails
                  createdAt={new Date(video?.createdAt)}
                  className="text-secondary-foreground"
                  views={video?.views}
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="absolute px-3 left-1/2 space-x-5 -translate-x-1/2 bottom-10 z-10">
        {Array.from({ length: favorites.length }).map((_, index) => (
          <span
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "inline-block cursor-pointer rounded-full bg-white",
              current === index
                ? "size-2.5 bg-opacity-100"
                : "size-2 bg-opacity-50",
            )}
            key={index}
          ></span>
        ))}
      </div>
      {canScrollPrev && (
        <CarouselPrevious
          iconClassName="xl:size-6"
          className={cn(
            "size-8 xl:size-10 z-10 absolute invisible shadow group-hover:visible top-1/2 text-black bg-white border-none drop-shadow hover:bg-white hover:text-black -translate-y-1/2 -left-5 ",
          )}
        />
      )}
      {canScrollNext && (
        <CarouselNext
          iconClassName="xl:size-6"
          className={cn(
            "size-8 xl:size-10 z-10 absolute invisible shadow group-hover:visible top-1/2 -translate-y-1/2 text-black bg-white border-none drop-shadow hover:bg-white hover:text-black -right-5 ",
          )}
        />
      )}
    </Carousel>
  );
}

export default DiscoverSlider;
