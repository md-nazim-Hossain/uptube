import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { LiaTimesSolid } from "react-icons/lia";
import Comments from "../comments/comments";
import CommentInput from "../comments/comment-input";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import { IAPIResponse, IComment } from "@/types";
import CommentsSkeleton from "../skeletons/comments-skeleton";
import { Typography } from "../ui/typography";
import { viewsFormat } from "@/utils/video";
import RecursiveComments from "../comments/recursive-comments";

type Props = {
  contentId: string;
  onClose: () => void;
  openCommentBox: boolean;
};
function ShortComments({ contentId, onClose, openCommentBox }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<IComment[]>>(
    apiRoutes.comments.getAllCommentByContentId + contentId,
    undefined,
    {
      queryKey: [
        apiRoutes.comments.getAllCommentByContentId + contentId,
        undefined,
      ],
      enabled: openCommentBox,
    },
  );

  const comments = data?.data || [];

  return (
    <div
      className={cn(
        "relative shadow rounded-tr-2xl rounded-br-2xl h-[840px] duration-200",
        openCommentBox
          ? "-translate-x-0 left-0 flex-1 lg:w-[300px] xl:w-[460px] visible"
          : "-translate-x-full -left-20 -z-10 w-0 invisible",
      )}
    >
      {openCommentBox && (
        <div className="w-full flex items-center justify-between h-12 px-5">
          <Typography variant={"h4"} className="font-medium">
            {viewsFormat(comments?.length ?? 0)} Comment
          </Typography>
          <Button onClick={onClose} variant={"icon"}>
            <LiaTimesSolid size={20} />
          </Button>
        </div>
      )}
      <div
        className={cn(
          "h-[calc(100%-113px)] overflow-auto scroll",
          openCommentBox && "p-5 space-y-5",
        )}
      >
        {isLoading ? (
          <CommentsSkeleton showTotalCommentSkeleton={false} size={10} />
        ) : (
          <RecursiveComments comments={comments} contentId={contentId} />
        )}
      </div>

      {openCommentBox && !isLoading && (
        <div className="absolute bottom-0 w-full border-t py-3 z-10 bg-background">
          <div className="px-5">
            <CommentInput contentId={contentId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShortComments;
