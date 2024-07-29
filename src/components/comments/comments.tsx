"use client";

import { IAPIResponse, IComment } from "@/types";
import React from "react";
import CommentInput from "./comment-input";

import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import CommentsSkeleton from "../skeletons/comments-skeleton";
import { Typography } from "../ui/typography";
import { viewsFormat } from "@/utils/video";
import RecursiveComments from "./recursive-comments";

type Props = {
  className?: string;
  contentId: string;
  showCommentInput?: boolean;
};
function Comments({ className, contentId, showCommentInput = true }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<IComment[]>>(
    apiRoutes.comments.getAllCommentById + contentId,
  );
  if (isLoading) return <CommentsSkeleton size={5} />;
  const comments = data?.data || [];
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <Typography variant={"h4"} className="font-medium">
          {viewsFormat(comments?.length ?? 0)} Comment
        </Typography>
        {showCommentInput && <CommentInput contentId={contentId} />}
      </div>
      <RecursiveComments
        comments={comments}
        contentId={contentId}
        className={className}
      />
    </div>
  );
}

export default Comments;
