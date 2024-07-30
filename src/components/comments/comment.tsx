import { IComment } from "@/types";
import React, { useState } from "react";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { Typography, typographyVariants } from "../ui/typography";
import { getCreationDateDifference, viewsFormat } from "@/utils/video";
import { cn } from "@/lib/utils";
import { VideoCard } from "../ui/video-card";
import { Button } from "../ui/button";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import CommentInput from "./comment-input";
import { useDelete, useUpdate } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useToast } from "../ui/use-toast";
import { useUserStore } from "@/zustand/useUserStore";
import DeleteAlertModal from "../modals/delete-alert-modal";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

type CommentProps = {
  className?: string;
  comment: IComment;
  contentId: string;
  isReplayComment?: boolean;
};
function Comment({
  className,
  comment,
  contentId,
  isReplayComment = false,
}: CommentProps) {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { toast } = useToast();
  const { content, owner, createdAt, _id, isEdited, likes } = comment;
  const [isReplay, setIsReplay] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const isMyComment = user?._id === owner?._id;
  const { mutateAsync: commentDelete } = useDelete<any>(
    apiRoutes.comments.deleteComment,
    apiRoutes.comments.getAllCommentByContentId + contentId,
    undefined,
    (oldData, id) => {
      if (!oldData) return;
      return {
        ...oldData,
        data: isReplayComment
          ? oldData?.data?.map((c: IComment) => ({
              ...c,
              replies: c?.replies?.filter((replay) => replay._id !== id),
            }))
          : oldData?.data?.filter((c: IComment) => c._id !== id),
      };
    },
  );

  const { mutateAsync: mutateLikeDislike } = useUpdate<any, any>(
    apiRoutes.comments.commentLikeDislike,
    apiRoutes.comments.getAllCommentByContentId + contentId,
    undefined,
    (oldData, data: { id: string; state: "like" | "dislike" }) => {
      if (!oldData) return;
      return {
        ...oldData,
        data: oldData?.data?.map((comment: IComment) => {
          const { likes } = comment;
          if (comment._id === data.id) {
            return {
              ...comment,
              likes:
                data?.state === "dislike"
                  ? likes.filter((l) => l !== user?._id)
                  : [...likes, user?._id],
            };
          }
          return comment;
        }),
      };
    },
  );

  const handleLikedAndDisliked = async (id: string) => {
    try {
      await mutateLikeDislike({
        id,
        state: likes.includes(user?._id ?? "") ? "dislike" : "like",
      });
    } catch (error) {}
  };

  if (isEdit)
    return (
      <CommentInput
        contentId={contentId}
        defaultValue={{ comment: content, _id }}
        isEdit
        onClose={() => setIsEdit(false)}
        onSuccess={() => setIsEdit(false)}
      />
    );

  return (
    <div className={cn("flex gap-3", className)}>
      <UpTubeAvatarImage
        className={cn(isReplayComment ? "size-7" : "size-9")}
        alt={owner?.fullName + ""}
        src={owner?.avatar!}
        name={owner?.fullName}
      />

      <div className="flex-1 space-y-3">
        <div className="w-full flex justify-between gap-3">
          <div className="space-y-1">
            <Typography
              variant={"h6"}
              className={cn(
                "space-x-1.5",
                isReplayComment ? "text-xs" : "text-sm",
              )}
            >
              <span>{owner?.username}</span>
              <span
                className={cn(
                  typographyVariants({
                    variant: "muted",
                    className: "font-normal",
                  }),
                  isReplayComment ? "text-[10px]" : "text-xs",
                )}
              >
                {getCreationDateDifference(new Date(createdAt))}
                {isEdited ? " (edited)" : ""}
              </span>
            </Typography>
            <Typography
              variant={"muted"}
              className={cn(isReplayComment ? "text-sm" : "text-base")}
            >
              {content}
            </Typography>
          </div>
          <VideoCard.VideoActions show={!!user}>
            {isMyComment ? (
              <>
                <Button onClick={() => setIsEdit(true)} variant={"flat"}>
                  Edit
                </Button>
                <DeleteAlertModal
                  onDelete={async () => {
                    try {
                      await commentDelete(_id);
                      toast({
                        description: "Comment deleted successfully",
                      });
                    } catch (err: any) {
                      toast({
                        description: err?.data?.message,
                        variant: "destructive",
                      });
                    }
                  }}
                  trigger={<Button variant={"flat"}>Delete</Button>}
                />
              </>
            ) : (
              <Button variant={"flat"}>Report</Button>
            )}
          </VideoCard.VideoActions>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-0.5 items-center">
            <Button
              onClick={() =>
                user ? handleLikedAndDisliked(_id) : setOpen(true)
              }
              variant="icon"
              className="size-8 text-base rounded-full p-0 hover:bg-primary/10"
            >
              {likes.includes(user?._id ?? "") ? (
                <IoMdHeart />
              ) : (
                <IoIosHeartEmpty />
              )}
            </Button>
            <Typography variant="muted">
              {viewsFormat(likes?.length ?? 0)}
            </Typography>
          </div>
          <Button
            onClick={() => (user ? setIsReplay(true) : setOpen(true))}
            variant={"flat"}
            className="w-max rounded-[100vw] h-8"
          >
            Replay
          </Button>
        </div>
        {isReplay && (
          <CommentInput
            isReplay={isReplay}
            contentId={_id}
            avatarClassName="size-6"
            onClose={() => setIsReplay(false)}
            defaultValue={{ comment: content, _id }}
            onSuccess={() => {
              queryClient.invalidateQueries({
                queryKey: [
                  apiRoutes.comments.getAllCommentByContentId + contentId,
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Comment;
