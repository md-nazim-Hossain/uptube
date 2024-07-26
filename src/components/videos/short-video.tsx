"use client";
import React, { useEffect } from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { IVideo } from "@/types";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { Pause, Play } from "lucide-react";
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
import ViewCount from "./view-count";
import AddWatchHistory from "./AddWatchHistory";

type Props = IVideo & {
  className?: string;
};
function ShortVideo({
  thumbnail,
  videoFile,
  title,
  owner,
  _id,
  isLiked,
  className,
}: Props) {
  const setOpen = useAuthStore((state) => state.setOpen);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const { avatar, username, fullName, isVerified } = owner;
  const [play, setPlay] = React.useState(false);
  const { ref, inView } = useInView();
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
      style={{ scrollSnapAlign: "start", scrollMarginTop: "56px" }}
      className="container w-full sm:w-max flex items-end gap-3"
    >
      <div className="w-full group/player h-[825px] sm:w-[460px] rounded-2xl overflow-hidden relative">
        <ReactPlayer
          light={!play && addHTTPPrefix(thumbnail)}
          width="100%"
          height="100%"
          url={addHTTPPrefix(videoFile)}
          playing={play}
          playsinline
          style={{ objectFit: "cover" }}
        />
        <div
          ref={ref}
          className="absolute opacity-0 group-hover/player:opacity-100 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Button
            onClick={() => {
              setPlay(!play);
            }}
            variant="icon"
            className="text-lg dark:text-black rounded-full hover:bg-white duration-200 p-0 bg-white shadow drop-shadow"
          >
            {play ? <Pause /> : <Play />}
          </Button>
        </div>
        <div className="w-[calc(100% - 40px)] absolute bottom-5 left-5 right-5 flex flex-col gap-5 justify-end">
          <Typography variant={"small"} className="text-white">
            {title}
          </Typography>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <VideoCardAvatar.Avatar
                src={avatar}
                alt={fullName}
                link={`/${username}`}
              />

              <VideoCard.VerifiedBadge
                className="text-white font-normal"
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
        </div>
      </div>
      <ShortVideoActions owner={owner} isLiked={isLiked} _id={_id} />
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
