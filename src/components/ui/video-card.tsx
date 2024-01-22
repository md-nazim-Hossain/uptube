"use client";
import { cn } from "@/lib/utils";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { VscVerifiedFilled } from "react-icons/vsc";
import { PlaneIcon } from "lucide-react";
import Link from "next/link";
interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const VideoCard = ({ className, children, ...props }: VideoCardProps) => {
  return (
    <div {...props} className={cn("w-full h-full rounded-2xl", className)}>
      {children}
    </div>
  );
};
VideoCard.displayName = "VideoCard";

interface VideoCardVideoProps {
  url: string;
  playIcon?: JSX.Element;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  thumbnail?: string;
}
const VideoCardPlayer = ({
  className,
  url,
  playIcon,
  loop,
  muted,
  autoPlay,
  thumbnail,
}: VideoCardVideoProps) => {
  return (
    <div
      className={cn(
        "w-full h-full max-h-[290px] aspect-video rounded-2xl relative overflow-hidden",
        className,
      )}
    >
      <ReactPlayer
        light={
          // eslint-disable-next-line @next/next/no-img-element
          thumbnail ? <img src={thumbnail} alt="Thumbnail" /> : true
        }
        width="100%"
        height="100%"
        url={url}
        controls
        loop={loop}
        muted={muted}
        playing={autoPlay}
        playsinline
        playIcon={playIcon}
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
}

const VideoCardAvatar = ({
  className,
  alt,
  src,
  fallbackText = "CN",
}: VideoCardAvatarProps) => {
  return (
    <Avatar className={cn("w-9 h-9 rounded-full", className)}>
      <AvatarImage src={src ?? "https://github.com/shadcn.png"} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
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
      className={cn("inline-block w-11/12 text-base", className)}
      {...props}
    >
      {children}
    </Link>
  );
};

VideoCardLink.displayName = "VideoCardLink";
VideoCard.Link = VideoCardLink;

export {
  VideoCard,
  VideoCardPlayer,
  VideoCardFooter,
  VideoCardAvatar,
  VideoCardVerifiedBadge,
  VideoCardLink,
};
