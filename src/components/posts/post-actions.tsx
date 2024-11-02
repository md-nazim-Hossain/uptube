import React from "react";
import { Button } from "../ui/button";
import { IAPIResponse, IPOST } from "@/types";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { Typography } from "../ui/typography";
import { viewsFormat } from "@/utils/video";
import { PiShareFatThin } from "react-icons/pi";
import ShareModal from "../modals/share-modal";
import { TfiCommentAlt } from "react-icons/tfi";
import { usePost } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { useUserStore } from "@/zustand/useUserStore";
import { useAuthStore } from "@/zustand/useAuthStore";

type Props = {
  post: IPOST;
  showComments?: boolean;
};
function PostActions({ post, showComments = true }: Props) {
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { toast } = useToast();
  const { mutateAsync, isPending } = usePost<
    IAPIResponse<IPOST[]> | any,
    { tweetId: string; state: "like" | "dislike"; contentOwnerId: string }
  >(
    apiRoutes.likes.likeDislike,
    apiRoutes.posts.getAllPosts,
    undefined,
    (oldData, data) => {
      if (!oldData) return;
      return {
        ...oldData,
        data: oldData?.data.map((p: IPOST) => {
          if (p._id === data.tweetId) {
            return {
              ...p,
              isLiked: data?.state === "like",
              likes:
                data?.state === "like"
                  ? p.likes + 1
                  : p.likes - (p.likes > 0 ? 1 : 0),
            };
          }
          return p;
        }),
      };
    },
  );

  const handleLike = async () => {
    try {
      await mutateAsync({
        tweetId: post._id,
        state: post.isLiked ? "dislike" : "like",
        contentOwnerId: post.author._id,
      });
    } catch (error: IAPIResponse<any> | any) {
      toast({
        variant: "destructive",
        title: `Failed to ${post.isLiked ? "remove like from" : "like"} post`,
        description: error?.data?.message || error?.message,
      });
    }
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <div className="flex items-center space-x-0.5">
        <Button
          onClick={() => (!user ? setOpen(true) : handleLike())}
          disabled={isPending}
          variant={"icon"}
          className="p-0 text-lg size-8 disabled:opacity-100"
        >
          {post?.isLiked ? <IoMdHeart /> : <IoIosHeartEmpty />}
        </Button>
        <Typography variant={"small"} className="font-normal">
          {viewsFormat(post?.likes ?? 0)}
        </Typography>
      </div>
      <div className="flex items-center gap-1">
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
        {showComments && (
          <Link
            href={`/post/${post._id}`}
            className={
              "py-1.5 px-3 bg-transparent hover:bg-primary/10 flex justify-center items-center rounded-[100vw] gap-2"
            }
          >
            <TfiCommentAlt />
            <Typography variant={"small"} className="font-normal">
              {viewsFormat(post?.comments ?? 0)}
            </Typography>
          </Link>
        )}
      </div>
    </div>
  );
}

export default PostActions;
