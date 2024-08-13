import React from "react";
import { Button } from "../ui/button";
import { IPOST } from "@/types";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { Typography } from "../ui/typography";
import { viewsFormat } from "@/utils/video";
import { PiShareFatThin } from "react-icons/pi";
import ShareModal from "../modals/share-modal";

type Props = {
  post: IPOST;
};
function PostActions({ post }: Props) {
  return (
    <div className="flex items-center gap-2 justify-between">
      <div className="flex items-center space-x-0.5">
        <Button variant={"icon"} className="p-0 text-lg size-8">
          {post?.isLiked ? (
            <IoMdHeart className="text-destructive" />
          ) : (
            <IoIosHeartEmpty />
          )}
        </Button>
        <Typography variant={"small"} className="font-normal">
          {viewsFormat(post?.likes ?? 0)}
        </Typography>
      </div>
      <div>
        <ShareModal
          user={{ ...post.author, subscriber: post.author.subscribersCount }}
          shareLink={`/post/${post._id}`}
          trigger={
            <Button variant={"icon"} className="p-0 text-lg size-8">
              <PiShareFatThin />
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default PostActions;
