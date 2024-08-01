"use client";
import React from "react";
import { Button } from "../ui/button";
import { useUserStore } from "@/zustand/useUserStore";
import { useAuthStore } from "@/zustand/useAuthStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ShareModal from "../modals/share-modal";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { RiChat1Line } from "react-icons/ri";
import { IUser, IVideo } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { usePost } from "@/utils/reactQuery";
import { Typography } from "../ui/typography";
import { viewsFormat } from "@/utils/video";

type Props = {
  _id: string;
  isLiked: boolean;
  className?: string;
  owner: IUser;
  onComment?: () => void;
  openCommentBox?: boolean;
  likes: number;
};
function ShortVideoActions({
  _id,
  isLiked,
  className,
  owner,
  onComment,
  openCommentBox = false,
  likes,
}: Props) {
  const { avatar, fullName, subscribersCount } = owner;
  const setOpen = useAuthStore((state) => state.setOpen);
  const user = useUserStore((state) => state.user);
  const { mutateAsync: mutateLikeDislike } = usePost<any, any>(
    apiRoutes.likes.likeDislike,
    apiRoutes.videos.getAllShorts,
    undefined,
    (oldData, data) => {
      if (!oldData) return;
      console.log(oldData, data);
      return {
        ...oldData,
        data: oldData?.data?.map((short: IVideo) => {
          const totalLikes = short?.likes;
          const isLiked = short?.isLiked;
          if (short?._id !== _id) return short;
          return {
            ...short,
            likes: isLiked
              ? totalLikes - (totalLikes > 0 ? 1 : 0)
              : totalLikes + 1,
            isLiked: !isLiked,
          };
        }),
      };
    },
  );

  const handleLikeDislike = async () => {
    try {
      await mutateLikeDislike({
        videoId: _id,
        state: isLiked ? "dislike" : "like",
      });
    } catch (error) {}
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="space-y-1">
        <Button
          onClick={() => (!user ? setOpen(true) : handleLikeDislike())}
          variant="icon"
          className={cn(
            "sm:size-12 sm:text-xl rounded-full p-0 ",
            openCommentBox
              ? "text-white bg-primary/20"
              : "text-white lg:text-inherit bg-primary/20 lg:bg-primary/10",
          )}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </Button>
        <Typography
          variant={"xsmall"}
          className={cn(
            "text-center",
            openCommentBox ? "text-white" : "text-white lg:text-inherit",
          )}
        >
          {viewsFormat(likes ?? 0)}
        </Typography>
      </div>
      <Button
        onClick={() => (!user ? setOpen(true) : onComment && onComment())}
        variant="icon"
        className={cn(
          "sm:size-12 sm:text-xl rounded-full p-0 ",
          openCommentBox
            ? "text-white bg-primary/20"
            : "text-white lg:text-inherit bg-primary/20 lg:bg-primary/10",
        )}
      >
        <RiChat1Line />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="icon"
            className={cn(
              "sm:size-12 sm:text-xl rounded-full p-0 ",
              openCommentBox
                ? "text-white bg-primary/20"
                : "text-white lg:text-inherit bg-primary/20 lg:bg-primary/10",
            )}
          >
            <BiDotsVerticalRounded />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className={cn("w-36 px-0 py-2", className)}>
          <Button variant={"flat"}>Add to playlist</Button>
          <ShareModal
            trigger={<Button variant={"flat"}>Share</Button>}
            user={{
              subscriber: subscribersCount ?? 0,
              avatar,
              fullName,
            }}
            shareLink={`/shorts/${_id}`}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ShortVideoActions;
