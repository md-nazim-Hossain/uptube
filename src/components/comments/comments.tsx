"use client";

import { IComment } from "@/types";
import React from "react";
import CommentInput from "./comment-input";
import Comment from "./comment";

type Props = {
  comments: IComment[];
  className?: string;
  contentId: string;
};
function Comments({ comments, className, contentId }: Props) {
  return (
    <div className="space-y-5">
      <CommentInput contentId={contentId} totalComments={comments.length} />
      {comments.length > 0 && (
        <div className="space-y-5">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              className={className}
              contentId={contentId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
