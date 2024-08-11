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
import { IVideo } from "@/types";
import { cn } from "@/lib/utils";
import SingleVideoCard from "../videos/single-video-card";
import { VideoCardPlayer } from "../ui/video-card";
import { addHTTPPrefix } from "@/utils/common";
import { useLayoutStore } from "@/zustand/useLayoutStore";

type Props = {
  shorts: IVideo[];
  className?: string;
};
function ShortsSlider({ shorts, className }: Props) {
  const openUPTubeSidebar = useLayoutStore((state) => state.openUPTubeSidebar);
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
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
        {shorts.map((short: IVideo, index: number) => (
          <CarouselItem
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
            key={index}
          >
            <VideoCardPlayer
              type={"short"}
              className={cn(
                "w-full aspect-auto",
                openUPTubeSidebar ? "h-[445px]" : "h-[500px]",
              )}
              url={addHTTPPrefix(short.videoFile)}
              _id={short._id}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {canScrollPrev && (
        <CarouselPrevious
          iconClassName="xl:size-6"
          className={cn(
            "size-8 xl:size-10 z-10 absolute invisible shadow group-hover:visible top-[35%] text-black bg-white border-none drop-shadow hover:bg-white hover:text-black translate-y-1/2 -left-5 ",
          )}
        />
      )}
      {canScrollNext && (
        <CarouselNext
          iconClassName="xl:size-6"
          className={cn(
            "size-8 xl:size-10 z-10 absolute invisible shadow group-hover:visible top-[35%] text-black bg-white border-none drop-shadow hover:bg-white hover:text-black translate-y-1/2 -right-5 ",
          )}
        />
      )}
    </Carousel>
  );
}

export default ShortsSlider;
