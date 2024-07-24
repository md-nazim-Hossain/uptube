"use client";

import { IAPIResponse, IComment } from "@/types";
import React, { useState } from "react";
import CommentInput from "./comment-input";
import Comment from "./comment";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import CommentsSkeleton from "../skeletons/comments-skeleton";
import { Button } from "../ui/button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  contentId: string;
};
function Comments({ className, contentId }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<IComment[]>>(
    apiRoutes.comments.getAllCommentById + contentId,
  );
  if (isLoading) return <CommentsSkeleton size={5} />;
  const comments = data?.data || [];
  return (
    <div className="space-y-5">
      <CommentInput contentId={contentId} totalComments={comments.length} />
      <RecursiveComments
        comments={comments}
        contentId={contentId}
        className={className}
      />
    </div>
  );
}

export default Comments;

const RecursiveComments: React.FC<{
  comments: IComment[];
  contentId: string;
  className?: string;
}> = ({ comments, contentId, className }) => {
  const [showNested, setShowNested] = useState<{ [key: string]: boolean }>({});
  const toggleNested = (parentId: string) => {
    setShowNested((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
  };
  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className={cn(comment?.parentComment ? "pl-12" : "pl-0")}
        >
          <Comment
            key={comment._id}
            comment={comment}
            className={className}
            contentId={contentId}
          />

          <div className="ml-12 pb-2">
            {comment?.replies.length > 0 && (
              <Button
                onClick={() => toggleNested(comment._id)}
                className="rounded-[100vw] space-x-2 hover:bg-destructive/20 text-destructive w-max h-8"
                variant="flat"
              >
                {showNested[comment?._id] ? (
                  <FaAngleDown size={16} />
                ) : (
                  <FaAngleUp size={16} />
                )}
                <span>{comment?.replies.length} replies</span>
              </Button>
            )}
          </div>
          {showNested[comment?._id] && (
            <>
              {comment?.replies.length > 0 && (
                <RecursiveComments
                  comments={comment?.replies}
                  contentId={contentId}
                  className={className}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
