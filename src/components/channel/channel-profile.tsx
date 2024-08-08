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
import { IChannelProfile } from "@/types";
import { useUserStore } from "@/zustand/useUserStore";
import FollowUnfollow from "./follow-unfollow";
import { revalidatePath } from "@/_actions/revalidate-actions";
import ChannelProfileSkeleton from "../skeletons/channel-profile-skeletons";

interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  channel: IChannelProfile;
}
function ChannelProfile({ className, channel, ...props }: CommentProps) {
  const user = useUserStore((state) => state.user);
  const {
    avatar,
    channelSubscribedToCount,
    coverImage,
    createdAt,
    fullName,
    username,
    description,
    email,
    isSubscribed,
    totalViews,
    isVerified,
    subscribersCount,
    totalVideos,
  } = channel;
  const isMyChannel = user?.username === channel?.username;

  return (
    <div {...props} className={cn("flex flex-col gap-24 md:gap-5", className)}>
      <div className="w-full h-full relative">
        <div className="relative h-[200px] sm:h-[300px] rounded-2xl overflow-hidden">
          <UpTubeImage alt={`cover image of ${username}`} src={coverImage} />
        </div>
        <div className="size-40 ring-4 ring-background flex justify-center items-center rounded-full absolute -bottom-20 left-5 md:hidden ">
          <UpTubeAvatarImage
            alt={`profile of ${username}`}
            src={avatar}
            className={"size-40"}
            name={fullName}
          />
        </div>
      </div>
      <div className="max-w-2xl flex flex-col sm:flex-row items-center gap-5 md:gap-10">
        <UpTubeAvatarImage
          alt={`profile of ${username}`}
          src={avatar}
          className={"hidden md:block flex-shrink-0 size-40"}
          name={fullName}
        />

        <div className="space-y-3">
          <div className="w-max">
            <VideoCardVerifiedBadge
              className="text-3xl font-bold"
              channelName={username}
              fullName={fullName}
              size={24}
              isVerified={isVerified}
              isLink={false}
            />
          </div>
          <AboutMyChannelModal
            channel={{
              fullName,
              username,
              country: "USA",
              description,
              createdAt,
              email,
              totalVideos,
              totalViews,
              avatar,
              subscriber: subscribersCount,
            }}
            trigger={
              <Typography className="text-slate-400 space-x-1 cursor-pointer text-sm text-start font-normal">
                {description}
                <FiChevronRight size={20} className="inline" />
              </Typography>
            }
          />
          {!isMyChannel && (
            <div className="pt-2 flex items-center gap-8 w-max mx-auto sm:mx-0">
              <FollowUnfollow
                channelId={channel?._id}
                channelName={fullName}
                isFollow={isSubscribed}
                onSuccess={() => revalidatePath(`/${username}`)}
              />
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
                      fullName,
                      avatar,
                      subscriber: subscribersCount,
                    }}
                    shareLink={`/${username}`}
                    trigger={<Button variant={"flat"}>Share</Button>}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {isMyChannel && (
            <div className="pt-2 space-x-5">
              <Link
                href={`/studio`}
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
                href={`/studio/content/videos`}
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
