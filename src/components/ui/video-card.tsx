"use client";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { IoPlay } from "react-icons/io5";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { VscVerifiedFilled } from "react-icons/vsc";
import Link from "next/link";
import { convertMillisecondsToTime, viewsFormat } from "@/utils/video";
interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const VideoCard = ({ className, children, ...props }: VideoCardProps) => {
  return (
    <div
      {...props}
      className={cn("w-full max-w-md h-full rounded-2xl", className)}
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
}
const VideoCardPlayer = ({
  className,
  url,

  autoPlay,
  videoDuration,
  thumbnail,
}: VideoCardVideoProps) => {
  const [duration, setDuration] = React.useState(videoDuration ?? 0);
  const [autoPlayState, setAutoPlayState] = React.useState(autoPlay);
  const ref: React.MutableRefObject<ReactPlayer | null> = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) {
      setDuration(ref.current?.getDuration() ?? 0);
    }
  }, [ref]);
  return (
    <div
      className={cn(
        "w-full aspect-video rounded-2xl relative overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute text-white text-xs bottom-3 right-3 rounded-sm bg-black/80 px-1 py-[1px]",
          autoPlayState ? "hidden" : "block",
        )}
      >
        {convertMillisecondsToTime(duration ?? 0)}
      </div>
      <ReactPlayer
        light={
          // eslint-disable-next-line @next/next/no-img-element
          thumbnail ? <img src={thumbnail} alt="Thumbnail" /> : true
        }
        width="100%"
        height="100%"
        url={url}
        controls
        playing={autoPlayState}
        playsinline
        ref={ref}
        onDuration={(d) => setDuration(d)}
        onPlay={() => setAutoPlayState(true)}
        onPause={() => setAutoPlayState(false)}
      />
    </div>
  );
};

VideoCard.Player = VideoCardPlayer;
VideoCard.displayName = "VideoCardPlayer";

interface VideoCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
const VideoCardFooter = ({ className, ...props }: VideoCardFooterProps) => {
  return (
    <div {...props} className={cn("w-full flex py-3 gap-3", className)}>
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
      className={cn("w-9 h-9 inline-block rounded-full", className)}
    >
      <Avatar className={"w-full h-full"}>
        <AvatarImage src={src ?? "https://github.com/shadcn.png"} alt={alt} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
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
  status?: "verified" | "unverified";
}
const VideoCardVerifiedBadge = ({
  className,
  size = 13,
  channelName,
  children,
  status,
}: VideoCardVerifiedBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="flex items-center gap-1">
          <span className="text-sm font-light">{channelName}</span>
          <TooltipTrigger>
            <VscVerifiedFilled className="text-slate-400" size={size} />
          </TooltipTrigger>
        </div>
        <TooltipContent className={cn("w-max", className)}>
          <p className="capitalize">{status ? status : children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
        "inline-block hover:opacity-80 w-11/12 text-base",
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
  createdAt?: Date | string | number;
}

const VideoDetails = ({
  className,
  ref,
  views = 0,
  createdAt = new Date(),
  ...props
}: VideoDetailsProps) => {
  return (
    <div
      className={cn(
        "w-full mt-0.5 text-xs text-slate-400 flex items-center gap-x-2",
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
      <span> - </span>
      <p className="font-light ">{"14 years ago"}</p>
    </div>
  );
};

VideoCard.Details = VideoDetails;
VideoDetails.displayName = "VideoDetails";

export {
  VideoCard,
  VideoCardPlayer,
  VideoCardFooter,
  VideoCardAvatar,
  VideoCardVerifiedBadge,
  VideoCardLink,
  VideoDetails,
};
