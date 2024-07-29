"use client";
import { cn } from "@/lib/utils";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { IoPlay } from "react-icons/io5";
import * as React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MyTooltip } from "./tooltip";
import { VscVerifiedFilled } from "react-icons/vsc";
import Link from "next/link";
import {
  convertMillisecondsToTime,
  getCreationDateDifference,
  viewsFormat,
} from "@/utils/video";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import dynamic from "next/dynamic";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { Typography } from "./typography";
import { addHTTPPrefix } from "@/utils/common";
import UpTubeImage from "../uptube/uptube-image";
import { SiYoutubeshorts } from "react-icons/si";
import { Button } from "./button";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { GoMute, GoUnmute } from "react-icons/go";
interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const VideoCard = ({ className, children, ...props }: VideoCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full relative group/video sm:max-w-md h-full rounded-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
};
VideoCard.displayName = "VideoCard";

interface VideoCardVideoProps {
  url: string;
  className?: string;
  autoPlay?: boolean;
  thumbnail?: string;
  videoDuration?: number;
  fullPreview?: boolean;
  showDuration?: boolean;
  _id?: string;
  showType?: boolean;
  type?: "short" | "video";
  durationClassName?: string;
  controls?: boolean;
}
const VideoCardPlayer = React.forwardRef<HTMLDivElement, VideoCardVideoProps>(
  (
    {
      className,
      url,
      autoPlay,
      videoDuration,
      _id,
      thumbnail,
      fullPreview = false,
      showDuration = true,
      showType = false,
      type = "video",
      durationClassName,
      controls = false,
    },
    ref,
  ) => {
    const [duration, setDuration] = React.useState(videoDuration ?? 0);
    const [autoPlayState, setAutoPlayState] = React.useState(autoPlay);

    return (
      <>
        {fullPreview ? (
          <div
            ref={ref}
            className={cn("w-full aspect-video max-h-[80vh]", className)}
          >
            <ReactPlayer
              width="100%"
              height="100%"
              url={addHTTPPrefix(url)}
              controls
              playing={true}
              playsinline
              ref={ref}
              onDuration={(d) => setDuration(d)}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <Link
            onMouseEnter={() => setAutoPlayState(true)}
            onMouseLeave={() => setAutoPlayState(false)}
            href={(type === "short" ? "/shorts/" : "/watch?v=") + _id}
            className={cn(
              "w-full aspect-video block group/player cursor-pointer rounded-2xl relative overflow-hidden",
              className,
            )}
          >
            {showDuration && (
              <span
                className={cn(
                  "absolute z-20 text-white text-xs bottom-3 right-3 rounded-sm bg-black/80 px-1 py-[1px]",
                  autoPlayState ? "hidden" : "block",
                  durationClassName,
                )}
              >
                {convertMillisecondsToTime(duration ?? 0)}
              </span>
            )}
            {showType && !autoPlayState && (
              <span className="absolute bottom-1 text-white text-xs z-20 capitalize flex items-center gap-1 right-1 bg-black/80 p-1 rounded">
                <SiYoutubeshorts />
                SHORTS
              </span>
            )}

            {!autoPlayState ? (
              <UpTubeImage
                className={"z-10"}
                alt=""
                src={addHTTPPrefix(thumbnail!)}
              />
            ) : (
              <ReactPlayer
                light={!thumbnail}
                width="100%"
                height="100%"
                url={addHTTPPrefix(url)}
                playing={autoPlayState}
                controls={controls}
                playsinline
                onDuration={(d) => setDuration(d)}
                onPlay={() => setAutoPlayState(true)}
                onPause={() => setAutoPlayState(false)}
                style={{
                  objectFit: "cover",
                  scale: type && type === "short" ? 4 : 1,
                }}
              />
            )}
          </Link>
        )}
      </>
    );
  },
);

VideoCardPlayer.displayName = "VideoCardPlayer";
VideoCard.Player = VideoCardPlayer;

interface VideoCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
const VideoCardFooter = ({ className, ...props }: VideoCardFooterProps) => {
  return (
    <div
      {...props}
      className={cn("w-full flex justify-between py-3 gap-1", className)}
    >
      {props.children}
    </div>
  );
};

VideoCard.Footer = VideoCardFooter;
VideoCardFooter.displayName = "VideoCardFooter";

interface VideoCardAvatarProps {
  className?: string;
  src: string;
  alt: string;
  fallbackText?: string;
  ref?: React.Ref<HTMLDivElement>;
  link: string;
}

const VideoCardAvatar = ({
  className,
  alt,
  src,
  link,
  ref,
  fallbackText = "CN",
}: VideoCardAvatarProps) => {
  return (
    <Link
      href={link}
      className={cn(
        "w-9 h-9 flex-shrink-0 inline-block rounded-full cursor-pointer",
        className,
      )}
    >
      <UpTubeAvatarImage
        name={fallbackText}
        alt={alt}
        src={src}
        className={"w-full h-full"}
      />
    </Link>
  );
};
VideoCardAvatar.displayName = "VideoCardAvatar";
VideoCardAvatar.Avatar = VideoCardAvatar;

interface VideoCardVerifiedBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  size?: number;
  channelName: string;
  isVerified: boolean;
  fullName: string;
  isLink?: boolean;
}
const VideoCardVerifiedBadge = ({
  className,
  size = 13,
  channelName,
  fullName,
  isVerified,
  isLink = true,
}: VideoCardVerifiedBadgeProps) => {
  return (
    <div className="flex items-center gap-1">
      <MyTooltip content={fullName}>
        {isLink ? (
          <Link
            href={`/${channelName}`}
            className={cn(
              "text-sm cursor-pointer line-clamp-1 font-light",
              className,
            )}
          >
            {fullName}
          </Link>
        ) : (
          <Typography
            className={cn("text-sm font-light line-clamp-1", className)}
          >
            {fullName}
          </Typography>
        )}
      </MyTooltip>
      <MyTooltip content={isVerified ? "verified" : "unverified"}>
        <VscVerifiedFilled
          className={cn(isVerified ? "text-blue-600" : "text-secondary")}
          size={size}
        />
      </MyTooltip>
    </div>
  );
};

VideoCardVerifiedBadge.displayName = "VideoCardVerifiedBadge";
VideoCard.VerifiedBadge = VideoCardVerifiedBadge;

interface VideoCardLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}
const VideoCardLink = ({
  className,
  children,
  href,
  ...props
}: VideoCardLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block line-clamp-2 hover:opacity-80 text-base cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

VideoCardLink.displayName = "VideoCardLink";
VideoCard.Link = VideoCardLink;

interface VideoDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  views?: number;
  createdAt?: Date;
  showDate?: boolean;
}

const VideoDetails = ({
  className,
  ref,
  views = 0,
  createdAt = new Date(),
  showDate = true,
  ...props
}: VideoDetailsProps) => {
  return (
    <div
      className={cn(
        "w-full mt-0.5 text-xs text-slate-400 flex items-center gap-1 sm:gap-x-2",
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="flex items-center gap-1">
        <IoPlay size={10} className="text-slate-300" />
        <span>
          {viewsFormat(views)} {views > 1 ? "views" : "view"}
        </span>
      </div>
      {showDate && (
        <>
          <span> - </span>
          <span>{getCreationDateDifference(createdAt)}</span>
        </>
      )}
    </div>
  );
};

VideoCard.Details = VideoDetails;
VideoDetails.displayName = "VideoDetails";

interface VideoActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  show?: boolean;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const VideoActions = ({
  className,
  show = false,
  children,
  onOpenChange,
  open,
}: VideoActionsProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        className={cn(
          "cursor-pointer h-max",
          show
            ? ""
            : "invisible opacity-0 group-hover/video:visible group-hover/video:opacity-100 data-[state=open]:opacity-100 data-[state=open]:visible",
        )}
      >
        <BiDotsVerticalRounded />
      </PopoverTrigger>
      <PopoverContent align="end" className={cn("w-36 px-0 py-2", className)}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

VideoCard.VideoActions = VideoActions;
VideoActions.displayName = "VideoActions";

export {
  VideoCard,
  VideoCardPlayer,
  VideoCardFooter,
  VideoCardAvatar,
  VideoCardVerifiedBadge,
  VideoCardLink,
  VideoDetails,
  VideoActions,
};
