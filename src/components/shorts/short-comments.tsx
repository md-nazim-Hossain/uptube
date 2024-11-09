import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { LiaTimesSolid } from "react-icons/lia";
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
  contentOwnerId: string;
};
function ShortComments({
  contentId,
  onClose,
  openCommentBox,
  contentOwnerId,
}: Props) {
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
        "absolute bottom-0 xs:-bottom-1 lg:-bottom-0  flex flex-col justify-between lg:relative z-30 max-w-[460px] shadow-md bg-background lg:bg-primary/5 rounded-tr-2xl lg:rounded-br-2xl rounded-tl-2xl lg:rounded-tl-none h-[80dvh] lg:h-[840px] duration-200",
        openCommentBox
          ? "-translate-y-0 lg:-translate-x-0 lg:left-0 w-full lg:flex-1 lg:w-[300px] xl:w-[460px] visible"
          : "translate-y-full lg:-translate-y-0 lg:-translate-x-full lg:-left-20 -z-10 w-full lg:w-0 invisible",
      )}
    >
      {openCommentBox && (
        <div className="w-full flex flex-shrink-0 items-center justify-between h-12 px-5">
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
          `overflow-auto scroll h-full`,
          openCommentBox && "p-5 space-y-5",
        )}
      >
        {isLoading ? (
          <CommentsSkeleton showTotalCommentSkeleton={false} size={10} />
        ) : (
          <RecursiveComments
            inputClassName="bg-transparent"
            comments={comments}
            contentId={contentId}
          />
        )}
      </div>

      {openCommentBox && !isLoading && (
        <div className="px-5 py-3">
          <CommentInput
            contentOwnerId={contentOwnerId}
            contentId={contentId}
            inputClassName="bg-transparent"
          />
        </div>
      )}
    </div>
  );
}

export default ShortComments;
