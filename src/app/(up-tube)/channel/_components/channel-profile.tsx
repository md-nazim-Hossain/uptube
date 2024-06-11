"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { VideoCardVerifiedBadge } from "@/components/ui/video-card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { SocialIcons } from "@/data";
import Link from "next/link";
import UpTubeAvatarImage from "@/components/uptube/uptube-avatar-image";
import ShareModal from "@/components/modals/share-modal";
import { Typography } from "@/components/ui/typography";
import AboutMyChannelModal from "@/components/modals/about-my-channel-modal";
import { FiChevronRight } from "react-icons/fi";
import UpTubeImage from "@/components/uptube/uptube-image";

interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  src?: string;
  isMyChannel?: boolean;
}
function ChannelProfile({
  className,
  src,
  isMyChannel = false,
  ...props
}: CommentProps) {
  return (
    <div {...props} className={cn("flex flex-col gap-5 container", className)}>
      <div className="relative h-[200px] sm:h-[300px] rounded-2xl overflow-hidden">
        <UpTubeImage alt="placeholder" src={"/assets/images/placeholder.svg"} />
      </div>
      <div className="max-w-2xl flex flex-col sm:flex-row items-center gap-10">
        <UpTubeAvatarImage
          alt={"Shadcn"}
          src={src ?? "https://github.com/shadcn.png"}
          className={"w-32 flex-shrink-0 md:w-40 h-32 md:h-40"}
          name="Shadcn"
        />

        <div className="space-y-3 text-center sm:text-left">
          <div className="w-max mx-auto sm:mx-0">
            <VideoCardVerifiedBadge
              className="text-3xl font-bold"
              channelName="@shadcn"
              fullName="Shadcn"
              size={24}
              status="verified"
            />
          </div>
          {!isMyChannel && (
            <Typography className="text-slate-400 text-sm font-normal">
              Download & license original tracks directly from independent
              artists for your content. Support indie artists using our
              artist-first platform. Royalty Free Music for your next project.
            </Typography>
          )}
          {isMyChannel && (
            <AboutMyChannelModal
              channel={{
                username: "shadcn",
                country: "USA",
                description: ` Download & license original tracks directly from independent
                  artists for your content. Support indie artists using our
                  artist-first platform. Royalty Free Music for your next
                  project.`,
                createdAt: new Date().toDateString(),
                email: "nazimhossaindpi@gmail.com",
                totalVideos: 0,
                totalViews: 0,
              }}
              trigger={
                <Typography className="text-slate-400 space-x-1 cursor-pointer text-sm text-start font-normal">
                  Download & license original tracks directly from independent
                  artists for your content. Support indie artists using our
                  artist-first platform. Royalty Free Music for your next
                  project.
                  <FiChevronRight size={20} className="inline" />
                </Typography>
              }
            />
          )}
          {!isMyChannel && (
            <div className="pt-2 flex items-center gap-8 w-max mx-auto sm:mx-0">
              <Button
                className="text-destructive w-[100px]"
                variant={"outline"}
              >
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
                  <ShareModal
                    user={{
                      fullName: "shadcn",
                      src: "https://github.com/shadcn.png",
                      followers: 10000,
                    }}
                    shareLink="/@shadcn"
                    trigger={<Button variant={"flat"}>Share</Button>}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {isMyChannel && (
            <div className="pt-2 space-x-5">
              <Link
                href={`/studio/@${"shadcn"}`}
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className: "border hover:no-underline",
                  }),
                )}
              >
                Customize Channel
              </Link>
              <Link
                href={`/studio/@${"shadcn"}/content`}
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className: "border hover:no-underline",
                  }),
                )}
              >
                Manage Videos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelProfile;
