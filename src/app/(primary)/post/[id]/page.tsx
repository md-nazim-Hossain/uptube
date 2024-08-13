import { getPostById } from "@/_actions/posts/getPostById";
import Comments from "@/components/comments/comments";
import PostDetails from "@/components/posts/post-details";
import { notFound } from "next/navigation";
import React from "react";

async function PostPage({ params: { id } }: { params: { id: string } }) {
  if (!id) return notFound();
  const post = await getPostById(id);
  if (!post) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-5 sm:py-10 space-y-5">
      <PostDetails post={post} />
      <Comments isTweet contentId={id} />
    </div>
  );
}

export default PostPage;
