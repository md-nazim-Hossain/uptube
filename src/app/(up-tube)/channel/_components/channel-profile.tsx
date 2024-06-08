"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { cn } from "@/lib/utils";
import { VideoCardVerifiedBadge } from "../../../../components/ui/video-card";
import { Button } from "../../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { SocialIcons } from "@/data";
import Link from "next/link";
import UpTubeAvatarImage from "@/components/uptube/uptube-avatar-image";

interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  src?: string;
}
function ChannelProfile({ className, src, ...props }: CommentProps) {
  return (
    <div {...props} className={cn("flex flex-col gap-5 cp-5", className)}>
      <div className="max-w-2xl flex flex-col sm:flex-row items-center gap-10">
        <UpTubeAvatarImage
          alt={"Shadcn"}
          src={src ?? "https://github.com/shadcn.png"}
          className={"w-32 flex-shrink-0 md:w-40 h-32 md:h-40"}
          firstName="Shad"
          lastName="cn"
        />

        <div className="space-y-3 text-center sm:text-left">
          <div className="w-max mx-auto sm:mx-0">
            <VideoCardVerifiedBadge
              className="text-3xl font-bold"
              channelName="Shadcn"
              size={24}
              status="verified"
            />
          </div>
          <p className="text-slate-400 text-sm font-normal">
            Download & license original tracks directly from independent artists
            for your content. Support indie artists using our artist-first
            platform. Royalty Free Music for your next project.
          </p>
          <div className="pt-2 flex items-center gap-8 w-max mx-auto sm:mx-0">
            <Button className="text-destructive w-[100px]" variant={"outline"}>
              Follow
            </Button>
            <div className="flex items-center gap-3">
              {SocialIcons.map((icon) => {
                return (
                  <Link target="_blank" key={icon.url} href={icon.url}>
                    <icon.Icon size={20} />
                  </Link>
                );
              })}
            </div>
            <Popover>
              <PopoverTrigger>
                <BiDotsVerticalRounded size={18} className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-36 px-0 py-2">
                <Button variant={"flat"}>Share</Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelProfile;
