"use client";

import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import { PostsSkeleton } from "../skeletons/posts.skeletons";
import { IAPIResponse, IPOST } from "@/types";
import { cn } from "@/lib/utils";
import Post from "./post";
import { Typography } from "../ui/typography";

type Props = {
  className?: string;
};
function Posts({ className }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<IPOST[]>>(
    apiRoutes.posts.getAllTweets + "?limit=12",
  );
  if (isLoading) return <PostsSkeleton />;
  const posts = data?.data || [];
  console.log(posts);
  if (!posts.length) return null;
  return (
    <>
      <Typography variant={"h3"}>Latest UPTube posts</Typography>
      <div
        className={cn(
          "py-5 grid gap-3 md:gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
          className,
        )}
      >
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

export default Posts;
