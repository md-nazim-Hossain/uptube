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
        "absolute bottom-0 xs:-bottom-1 lg:-bottom-0 lg:relative z-30 max-w-[460px] shadow-md bg-background lg:bg-primary/5 rounded-tr-2xl lg:rounded-br-2xl rounded-tl-2xl lg:rounded-tl-none h-[80dvh] lg:h-[840px] duration-200",
        openCommentBox
          ? "-translate-y-0 lg:-translate-x-0 lg:left-0 w-full lg:flex-1 lg:w-[300px] xl:w-[460px] visible"
          : "translate-y-full lg:-translate-y-0 lg:-translate-x-full lg:-left-20 -z-10 w-full lg:w-0 invisible",
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
        <div className="absolute bottom-5 xs:bottom-0 w-full bg-background lg:bg-primary/5 border-t py-3 z-10">
          <div className="px-5">
            <CommentInput
              contentId={contentId}
              inputClassName="bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShortComments;
