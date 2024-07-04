import { cn } from "@/lib/utils";
import { IPlayList } from "@/types";
import React from "react";
import { PiPlaylistLight } from "react-icons/pi";
import UpTubeImage from "../uptube/uptube-image";
import { Typography } from "../ui/typography";
import { addHTTPPrefix } from "@/utils/common";

type Props = IPlayList & {
  className?: string;
};
function ChannelPlaylist({ className, videos, name }: Props) {
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full aspect-video relative overflow-hidden rounded-2xl">
        <div className="absolute flex justify-center items-center top-0 right-0 z-10 w-1/2 h-full bg-black/70">
          <Typography variant={"h5"} className="text-center">
            {videos?.length}
            <PiPlaylistLight size={24} />
          </Typography>
        </div>
        <UpTubeImage src={addHTTPPrefix(videos?.[0]?.thumbnail)} alt={name} />
      </div>
    </div>
  );
}

export default ChannelPlaylist;
