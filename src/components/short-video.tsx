"use client";
import React, { useEffect } from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { IYoutubeVideo } from "@/types";
import { Button } from "./ui/button";
import { FaHeart } from "react-icons/fa6";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { RiChat1Line } from "react-icons/ri";
import { useAuthStore } from "@/zustand/useAuthStore";
import { Typography } from "./ui/typography";
import dynamic from "next/dynamic";
import { VideoCard, VideoCardAvatar } from "./ui/video-card";
import { useInView } from "react-intersection-observer";
import { Pause, Play } from "lucide-react";

type Props = IYoutubeVideo & {
  className?: string;
};
function ShortVideo({ url, songName, className }: Props) {
  const [play, setPlay] = React.useState(false);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) setPlay(true);
    else setPlay(false);
  }, [inView]);
  return (
    <div
      style={{ scrollSnapAlign: "start", scrollMarginTop: "56px" }}
      className="container w-full sm:w-max flex items-end gap-3"
    >
      <div className="w-full h-[90vh] group/player max-h-[850px] sm:w-[460px] rounded-2xl overflow-hidden relative">
        <ReactPlayer
          width="100%"
          height="100%"
          url={url}
          playing={play}
          playsinline
          style={{ objectFit: "cover" }}
        />
        <div
          ref={ref}
          className="absolute opacity-0 group-hover/player:opacity-100 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Button
            onClick={() => {
              setPlay(!play);
            }}
            variant="icon"
            className="text-lg dark:text-black rounded-full hover:bg-white duration-200 p-0 bg-white shadow drop-shadow"
          >
            {play ? <Pause /> : <Play />}
          </Button>
        </div>
        <div className="w-[calc(100% - 40px)] absolute bottom-5 left-5 right-5 flex flex-col gap-5 justify-end">
          <Typography variant={"small"} className="text-white">
            {songName}
          </Typography>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <VideoCardAvatar.Avatar
                src="https://github.com/shadcn.png"
                alt="Shadcn"
                link="/channel/shadcn"
              />

              <VideoCard.VerifiedBadge
                className="text-white font-normal"
                channelName="Shadcn"
              >
                Verified
              </VideoCard.VerifiedBadge>
            </div>
            <Button className="bg-white text-xs h-max text-black hover:bg-white">
              Follow
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => setOpen(true)}
          variant="icon"
          className="sm:size-12 sm:text-xl rounded-full p-0 bg-primary/10"
        >
          <FaHeart />
        </Button>
        <Button
          onClick={() => setOpen(true)}
          variant="icon"
          className="sm:size-12 sm:text-xl rounded-full p-0 bg-primary/10"
        >
          <RiChat1Line />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="icon"
              className="sm:size-12 sm:text-xl rounded-full p-0 bg-primary/10"
            >
              <BiDotsVerticalRounded />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className={cn("w-36 px-0 py-2", className)}
          >
            <Button variant={"flat"}>Add to playlist</Button>
            <Button variant={"flat"}>Share</Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default ShortVideo;
