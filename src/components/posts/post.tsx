"use client";

import { cn } from "@/lib/utils";
import { IPOST } from "@/types";
import React from "react";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { addHTTPPrefix } from "@/utils/common";
import { Typography, typographyVariants } from "../ui/typography";
import { getCreationDateDifference } from "@/utils/video";
import UpTubeImage from "../uptube/uptube-image";
import { MyTooltip } from "../ui/tooltip";
import Link from "next/link";
import PostActions from "./post-actions";

type Props = {
  className?: string;
  post: IPOST;
};
function Post({ className, post }: Props) {
  const author = post?.author;
  return (
    <div
      className={cn(
        "w-full min-h-[210px] bg-primary/5 overflow-hidden border border-primary/10 dark:border-primary/20 flex flex-col justify-between rounded-2xl pt-3 pb-0.5 px-6",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Link href={`/${author?.username}`}>
            <UpTubeAvatarImage
              src={addHTTPPrefix(author?.avatar)}
              alt={`Avatar of ${author?.fullName}`}
              className="size-6"
            />
          </Link>
          <div className="flex-1 flex items-center gap-1">
            <MyTooltip triggerClassName="max-w-[60%]" text={author?.fullName}>
              <Link
                href={`/${author?.username}`}
                className={cn(
                  typographyVariants({
                    variant: "muted",
                    className: "text-xs truncate hover:text-primary",
                  }),
                )}
              >
                {author?.fullName}
              </Link>
            </MyTooltip>
            <span className="size-1 rounded-full bg-muted"></span>
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
        <Link href={`/post/${post?._id}`} className="flex gap-4 mb-1">
          <Typography variant={"muted"} className="flex-1">
            {post?.content?.slice(0, 120)}{" "}
            {post?.content?.length > 120 && "..."}
          </Typography>
          {post.thumbnail && (
            <div className="flex-shrink-0 size-[116px] rounded-2xl relative overflow-hidden">
              <UpTubeImage
                src={addHTTPPrefix(post?.thumbnail)}
                alt={`Thumbnail of ${author?.fullName} post`}
              />
            </div>
          )}
        </Link>
      </div>
      <PostActions post={post} />
    </div>
  );
}

export default Post;
