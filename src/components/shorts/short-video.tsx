"use client";
import React, { useEffect, useState } from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { IVideo } from "@/types";
import dynamic from "next/dynamic";
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
import { useRouter } from "next/navigation";
import UTagify from "../uptube/u-tagify";
import { FaCaretRight } from "react-icons/fa6";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { cn } from "@/lib/utils";
import { GoMute, GoUnmute } from "react-icons/go";
import ShortComments from "./short-comments";
import { MyTooltip } from "../ui/tooltip";

type Props = IVideo & {
  nextShortId?: string;
};
function ShortVideo({
  videoFile,
  title,
  owner,
  _id,
  isLiked,
  description,
  likes,
  nextShortId,
}: Props) {
  const router = useRouter();
  const setOpen = useAuthStore((state) => state.setOpen);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const { avatar, username, fullName, isVerified } = owner;
  const [play, setPlay] = useState(false);
  const [mute, setMute] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const { ref, inView } = useInView({
    threshold: 1,
    delay: 100,
  });
  useEffect(() => {
    if (inView) setPlay(true);
    else setPlay(false);
  }, [inView]);

  const { mutateAsync: mutateFollowUnfollow } = usePost<any, any>(
    apiRoutes.follows.createFollowAndUnfollow,
    apiRoutes.videos.getAllShorts,
    undefined,
    (oldData, data) => {
      if (!oldData) return;
      return {
        ...oldData,
        data: oldData?.data?.map((short: IVideo) => {
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
    },
  );

  const handleFollowUnfollow = async () => {
    try {
      await mutateFollowUnfollow({
        channelId: owner._id,
        state: owner.isSubscribed ? "unsubscribe" : "subscribe",
      });
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.videos.getAllShorts, undefined],
      });
    } catch (error) {}
  };

  return (
    <div
      style={{ scrollSnapAlign: "start", scrollMarginTop: "70px" }}
      className="container w-full h-[840px] sm:w-max flex relative"
    >
      <div className="flex items-end gap-3">
        <div
          className={cn(
            "w-full group/player h-full sm:w-[460px] shadow relative",
          )}
        >
          <div
            onClick={() => setPlay(!play)}
            className={cn(
              "w-full h-full overflow-hidden",
              openCommentBox ? "rounded-tl-2xl rounded-bl-2xl" : "rounded-2xl",
            )}
          >
            <ReactPlayer
              loop
              width="100%"
              height="100%"
              url={addHTTPPrefix(videoFile)}
              playing={play}
              muted={mute}
              onPlay={() => setPlay(true)}
              onPause={() => setPlay(false)}
              playsinline
              style={{ objectFit: "cover", scale: 1.5 }}
            />
          </div>

          <div
            className={cn(
              "absolute z-10 flex items-center gap-3 top-5 left-5 group-hover/player:opacity-100 opacity-0",
            )}
          >
            <Button
              onClick={() => {
                setPlay(!play);
              }}
              variant="icon"
              className="bg-black/50 hover:bg-black/45 text-white text-xl"
            >
              {play ? <IoIosPause /> : <IoIosPlay />}
            </Button>
            <Button
              onClick={() => setMute((prev) => !prev)}
              variant="icon"
              className="bg-black/50 hover:bg-black/45 text-xl text-white"
            >
              {mute ? <GoMute /> : <GoUnmute />}
            </Button>
          </div>

          <div
            ref={ref}
            className="w-[calc(100% - 40px)] absolute bottom-5 left-5 flex flex-col gap-3 justify-end"
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
            <Typography
              variant={"small"}
              className="flex items-center gap-1 text-white"
            >
              <FaCaretRight /> {title}
            </Typography>
            <MyTooltip align="start" content={description}>
              <UTagify
                text={description}
                className="text-sm text-white line-clamp-3"
              />
            </MyTooltip>
          </div>
          {openCommentBox && (
            <div className="absolute right-5 bottom-5 z-10">
              <ShortVideoActions
                openCommentBox={openCommentBox}
                owner={owner}
                isLiked={isLiked}
                likes={likes}
                _id={_id}
              />
            </div>
          )}
        </div>
        {!openCommentBox && (
          <ShortVideoActions
            onComment={() => setOpenCommentBox(true)}
            owner={owner}
            isLiked={isLiked}
            likes={likes}
            _id={_id}
          />
        )}
      </div>
      <ShortComments
        contentId={_id}
        onClose={() => setOpenCommentBox(false)}
        openCommentBox={openCommentBox}
      />
      {inView && (
        <>
          {user && <AddWatchHistory videoId={_id} />}
          <ViewCount
            revalidateQueryKey={apiRoutes.videos.getAllShorts}
            videoId={_id}
          />
        </>
      )}
    </div>
  );
}

export default ShortVideo;
