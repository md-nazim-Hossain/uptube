"use client";

import { IAPIResponse, IPOST } from "@/types";
import Link from "next/link";
import React from "react";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { addHTTPPrefix } from "@/utils/common";
import { cn } from "@/lib/utils";
import { Typography, typographyVariants } from "../ui/typography";
import { getCreationDateDifference, viewsFormat } from "@/utils/video";
import UpTubeImage from "../uptube/uptube-image";
import ShareModal from "../modals/share-modal";
import { Button } from "../ui/button";
import { PiShareFatThin } from "react-icons/pi";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { useToast } from "../ui/use-toast";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { revalidatePath } from "@/_actions/revalidate-actions";
import { useUserStore } from "@/zustand/useUserStore";
import { useAuthStore } from "@/zustand/useAuthStore";

type Porps = {
  post: IPOST;
};
function PostDetails({ post }: Porps) {
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { toast } = useToast();
  const author = post?.author;
  const [like, setLike] = React.useState(post?.likes);
  const [isLiked, setIsLiked] = React.useState(post?.isLiked);

  const handleLike = async () => {
    const prevLike = like;
    const prevIsLiked = isLiked;
    try {
      setLike(isLiked ? like - (prevLike > 0 ? 1 : 0) : like + 1);
      setIsLiked(!isLiked);
      await axios.post(apiRoutes.likes.likeDislike, {
        tweetId: post?._id,
        state: isLiked ? "dislike" : "like",
      });
      revalidatePath(`/post/${post?._id}`);
    } catch (error: IAPIResponse<any> | any) {
      setLike(prevLike);
      setIsLiked(prevIsLiked);
      toast({
        variant: "destructive",
        title: `Failed to ${post.isLiked ? "remove like from" : "like"} post`,
        description: error?.data?.message || error?.message,
      });
    }
  };

  return (
    <div className="w-full px-6 py-3 flex gap-3 rounded-2xl bg-primary/5 border border-primary/10 dark:border-primary/20">
      <Link href={`/${author?.username}`}>
        <UpTubeAvatarImage
          src={addHTTPPrefix(author?.avatar)}
          alt={`Avatar of ${author?.fullName}`}
          className="size-10"
        />
      </Link>

      <div className="flex-1">
        <div className="flex items-center gap-3 justify-between mb-5 md:mb-10">
          <div className="flex-1 flex items-center gap-3">
            <Link
              href={`/${author?.username}`}
              className={cn(
                typographyVariants({
                  variant: "muted",
                  className: "text-sm text-primary",
                }),
              )}
            >
              {author?.fullName}
            </Link>
            <Link
              href={`/post/${post?._id}`}
              className={cn(
                typographyVariants({
                  variant: "muted",
                  className: "text-xs hover:text-primary",
                }),
              )}
            >
              {getCreationDateDifference(new Date(post?.createdAt))}
            </Link>
          </div>
        </div>
        <div className="w-full h-[300px] xs:h-[400px] md:h-[500px] lg:h-[638px] relative overflow-hidden rounded-2xl">
          <UpTubeImage
            src={addHTTPPrefix(post?.thumbnail)}
            alt={`Thumbnail of ${post?.author?.fullName} this user post`}
          />
        </div>
        <Typography className="mt-3 mb-1 max-h-[500px] overflow-y-auto scroll">
          {post?.content}
        </Typography>
        <div className="flex items-center gap-10">
          <div className="flex items-center space-x-0.5">
            <Button
              onClick={() => (!!user ? handleLike() : setOpen(true))}
              variant={"icon"}
              className="p-0 text-lg size-8 disabled:opacity-100"
            >
              {isLiked ? <IoMdHeart /> : <IoIosHeartEmpty />}
            </Button>
            <Typography variant={"small"} className="font-normal">
              {viewsFormat(like ?? 0)}
            </Typography>
          </div>
          <ShareModal
            user={{
              ...post.author,
              subscriber: post.author?.subscribersCount ?? 0,
            }}
            shareLink={`/post/${post._id}`}
            trigger={
              <Button variant={"icon"} className="p-0 text-lg size-8">
                <PiShareFatThin />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
