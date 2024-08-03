"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { IAPIResponse, IInfiniteScrollAPIResponse, IVideo } from "@/types";
import { useInView } from "react-intersection-observer";
import { addHTTPPrefix } from "@/utils/common";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { VideoCard, VideoCardAvatar } from "../ui/video-card";

import ShortVideoActions from "./short-video-actions";
import { apiRoutes } from "@/utils/routes";
import { usePost } from "@/utils/reactQuery";
import { useQueryClient } from "@tanstack/react-query";
import DeleteAlertModal from "../modals/delete-alert-modal";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useUserStore } from "@/zustand/useUserStore";
import ViewCount from "../videos/view-count";
import AddWatchHistory from "../videos/AddWatchHistory";
import { useParams, useRouter } from "next/navigation";
import UTagify from "../uptube/u-tagify";
import { FaCaretRight } from "react-icons/fa6";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { cn } from "@/lib/utils";
import { GoMute, GoUnmute } from "react-icons/go";
import ShortComments from "./short-comments";
import { useReactPlayerControler } from "../../hooks/useReactPlayerControler";
import ReactPlayer from "react-player";
import { useToast } from "../ui/use-toast";

type IPlayerSate = {
  muted: boolean;
  volume: number;
};
type Props = IVideo & {
  playerState: IPlayerSate;
  toggleMute: (state: boolean) => void;
  handleVolume: (value: string) => void;
  inViewRef?: (node?: Element | null) => void | undefined;
};
function ShortVideo({
  videoFile,
  title,
  owner,
  _id,
  isLiked,
  description,
  likes,
  toggleMute,
  playerState,
  handleVolume,
  inViewRef,
}: Props) {
  const { toast } = useToast();
  const videoRef = useRef<ReactPlayer | null>(null);
  const id = useParams()?.id as string;
  const setOpen = useAuthStore((state) => state.setOpen);
  const user = useUserStore((state) => state.user);
  const [playing, setPlaying] = useState(false);
  const { avatar, username, fullName, isVerified, watchHistory } = owner;
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const { ref, inView } = useInView({
    threshold: 1,
    delay: 100,
  });
  useEffect(() => {
    if (inView) setPlaying(true);
    else setPlaying(false);
  }, [inView]);

  const { mutateAsync: mutateFollowUnfollow } = usePost<
    IInfiniteScrollAPIResponse<IVideo[]> | undefined,
    { channelId: string; state: string }
  >(
    apiRoutes.follows.createFollowAndUnfollow,
    [apiRoutes.videos.getAllShorts, { id }],
    undefined,
    (oldData, data) => {
      if (!oldData) return;
      const pages = oldData?.pages;
      return {
        ...oldData,
        pages: pages?.map((shorts) => {
          if (!shorts?.data?.length) return shorts;
          return {
            ...shorts,
            data: shorts.data.map((short) => {
              if (short?.owner?._id !== data.channelId) return short;
              const isSubscribed = short?.owner?.isSubscribed;
              const subscribersCount = short?.owner?.subscribersCount;
              return {
                ...short,
                owner: {
                  ...short?.owner,
                  isSubscribed: !isSubscribed,
                  subscribersCount: isSubscribed
                    ? subscribersCount - (subscribersCount > 0 ? 1 : 0)
                    : subscribersCount + 1,
                },
              };
            }),
          };
        }),
      };
    },
  );

  const handleFollowUnfollow = async () => {
    try {
      await mutateFollowUnfollow({
        channelId: owner._id,
        state: owner.isSubscribed ? "unsubscribe" : "subscribe",
      });
    } catch (error: IAPIResponse<any> | any) {
      toast({
        title: `Failed to ${
          owner.isSubscribed ? "unfollow" : "follow"
        } channel`,
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };
  const { ProgressBar, progressHandler } = useReactPlayerControler(videoRef);

  return (
    <div
      ref={inViewRef}
      style={{ scrollSnapAlign: "start", scrollMarginTop: "70px" }}
      className="w-full h-[calc(100dvh-56px)] xs:h-[840px] lg:w-max flex justify-center relative"
    >
      <div className="flex items-end gap-3">
        <div
          className={cn(
            "w-full group/player h-full lg:w-[460px] shadow relative xs:rounded-2xl",
          )}
        >
          <div
            onClick={() => setPlaying((prev) => !prev)}
            className={cn(
              "w-full h-full overflow-hidden",
              openCommentBox
                ? "xs:rounded-2xl lg:rounded-none lg:rounded-tl-2xl lg:rounded-bl-2xl"
                : "xs:rounded-2xl",
            )}
          >
            <ReactPlayer
              loop
              width="100%"
              height="100%"
              url={addHTTPPrefix(videoFile)}
              playing={playing}
              muted={playerState?.muted}
              volume={playerState?.volume}
              onProgress={progressHandler}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              playsinline
              style={{ objectFit: "cover", scale: 1.5 }}
              ref={videoRef}
            />
          </div>
          <ProgressBar openCommentBox={openCommentBox} />
          <div
            className={cn(
              "absolute z-10 flex items-center gap-3 top-5 left-5 group-hover/player:opacity-100 opacity-100",
            )}
          >
            <Button
              onClick={() => {
                setPlaying(!playing);
              }}
              variant="icon"
              className="bg-black/40 hover:bg-black/60 text-white text-xl"
            >
              {playing ? <IoIosPause /> : <IoIosPlay />}
            </Button>
            <Button
              variant="icon"
              className="bg-black/40 hover:bg-black/60 text-xl text-white size-max hover:!pr-2.5 hover:w-[250px] gap-1 group/mute flex hover:justify-start"
            >
              <span
                onClick={() => toggleMute(!playerState?.muted)}
                className="flex-shrink-0 p-2.5"
              >
                {playerState?.muted ? <GoMute /> : <GoUnmute />}
              </span>
              <input
                value={playerState.volume * 100}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleVolume(event.target.value);
                }}
                min={0}
                max={100}
                type="range"
                className="hidden w-full accent-white group-hover/mute:block appearance-none bg-gray-500 h-1 rounded-sm"
              />
            </Button>
          </div>

          <div
            ref={ref}
            className="w-[calc(100%-40px)] absolute bottom-5 left-5 flex flex-col gap-3 justify-end"
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-3">
                <VideoCardAvatar.Avatar
                  src={avatar}
                  alt={fullName}
                  link={`/${username}`}
                />

                <VideoCard.VerifiedBadge
                  className="font-normal text-white"
                  channelName={username}
                  fullName={fullName}
                  isVerified={isVerified}
                />
              </div>
              <div>
                {owner.isSubscribed ? (
                  <DeleteAlertModal
                    trigger={
                      <Button className="bg-white text-xs h-max !text-black hover:bg-white">
                        Unfollow
                      </Button>
                    }
                    onDelete={handleFollowUnfollow}
                    text={fullName}
                    isFollow
                  />
                ) : (
                  <Button
                    className="bg-white text-xs h-max !text-black hover:bg-white"
                    onClick={() =>
                      !user ? setOpen(true) : handleFollowUnfollow()
                    }
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
            {title && (
              <Typography
                variant={"small"}
                className={cn(
                  "flex items-center gap-1 text-white leading-normal",
                  openCommentBox ? "w-[85%]" : "w-[85%] sm:w-full",
                )}
              >
                <FaCaretRight /> {title}
              </Typography>
            )}
            {description && (
              <UTagify
                text={description}
                className={cn(
                  "text-sm text-white line-clamp-3",
                  openCommentBox ? "w-[85%]" : "w-[85%] lg:w-full",
                )}
              />
            )}
          </div>
          <div
            className={cn(
              "absolute right-5 bottom-5 z-10",
              openCommentBox ? "block" : "block lg:hidden",
            )}
          >
            <ShortVideoActions
              openCommentBox={openCommentBox}
              onComment={() => setOpenCommentBox(true)}
              owner={owner}
              isLiked={isLiked}
              likes={likes}
              _id={_id}
            />
          </div>
        </div>
        <ShortVideoActions
          className={cn(!openCommentBox ? "hidden lg:flex" : "hidden")}
          onComment={() => setOpenCommentBox(true)}
          owner={owner}
          isLiked={isLiked}
          likes={likes}
          _id={_id}
        />
      </div>
      <ShortComments
        contentId={_id}
        onClose={() => setOpenCommentBox(false)}
        openCommentBox={openCommentBox}
      />
      {inView && (
        <>
          {user && !(watchHistory as string[])?.includes(_id) && (
            <AddWatchHistory videoId={_id} />
          )}
          {user?._id !== owner?._id && (
            <ViewCount
              revalidateQueryKey={apiRoutes.videos.getAllShorts}
              videoId={_id}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ShortVideo;
