"use client";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { IoPlay } from "react-icons/io5";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { VscVerifiedFilled } from "react-icons/vsc";
import Link from "next/link";
import { convertMillisecondsToTime, viewsFormat } from "@/utils/video";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Separator } from "./separator";
interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const VideoCard = ({ className, children, ...props }: VideoCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full relative group sm:max-w-md h-full rounded-2xl",
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
}
const VideoCardPlayer = ({
  className,
  url,
  autoPlay,
  videoDuration,
  thumbnail,
  fullPreview = false,
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
    <>
      {fullPreview ? (
        <div className={cn("w-full aspect-video max-h-[80vh]", className)}>
          <ReactPlayer
            width="100%"
            height="100%"
            url={url}
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
          href={"/watch?v=" + url}
          className={cn(
            "w-full aspect-video block cursor-pointer rounded-2xl relative overflow-hidden",
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
            style={{ objectFit: "cover" }}
          />
        </Link>
      )}
    </>
  );
};

VideoCard.Player = VideoCardPlayer;
VideoCard.displayName = "VideoCardPlayer";

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
          <Link
            href={`/channel/${channelName}`}
            className={cn("text-sm cursor-pointer font-light", className)}
          >
            {channelName}
          </Link>
          <TooltipTrigger>
            <VscVerifiedFilled className="text-secondary" size={size} />
          </TooltipTrigger>
        </div>
        <TooltipContent className="w-max">
          <p className="capitalize text-sm">{status ? status : children}</p>
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
        "inline-block line-clamp-2 hover:opacity-80 w-11/12 text-base cursor-pointer",
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

interface VideoActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  views?: number;
  createdAt?: Date | string | number;
  showDate?: boolean;
}

const VideoDetails = ({
  className,
  ref,
  views = 0,
  createdAt = new Date(),
  showDate = true,
  ...props
}: VideoActionsProps) => {
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
          <span>{"14 years ago"}</span>
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
}

const VideoCardActions = ({ className, show = false }: VideoActionsProps) => {
  return (
    <Popover>
      <PopoverTrigger className="h-max">
        <BiDotsVerticalRounded
          className={cn(
            "cursor-pointer ",
            show
              ? ""
              : "invisible opacity-0 group-hover:visible group-hover:opacity-100",
          )}
        />
      </PopoverTrigger>
      <PopoverContent className={cn("w-36 px-0 py-2", className)}>
        <Button variant={"flat"}>Add to playlist</Button>
        <Button variant={"flat"}>Next to play</Button>
        <Button variant={"flat"}>Add to queue</Button>
        <Button variant={"flat"}>Share</Button>

        <Separator />
        <Button variant={"flat"}>Play</Button>
      </PopoverContent>
    </Popover>
  );
};

VideoCard.Actions = VideoCardActions;
VideoCardActions.displayName = "VideoCardActions";

export {
  VideoCard,
  VideoCardPlayer,
  VideoCardFooter,
  VideoCardAvatar,
  VideoCardVerifiedBadge,
  VideoCardLink,
  VideoDetails,
  VideoCardActions,
};
