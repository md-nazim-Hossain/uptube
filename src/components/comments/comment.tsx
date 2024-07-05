import { IComment } from "@/types";
import React from "react";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { Typography, typographyVariants } from "../ui/typography";
import { getCreationDateDifference, viewsFormat } from "@/utils/video";
import { cn } from "@/lib/utils";
import { VideoCard } from "../ui/video-card";
import { Button } from "../ui/button";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import CommentInput from "./comment-input";
import { useDelete, usePost } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useToast } from "../ui/use-toast";
import { useUserStore } from "@/zustand/useUserStore";
import DeleteAlertModal from "../modals/delete-alert-modal";
import { useAuthStore } from "@/zustand/useAuthStore";

type CommentProps = {
  className?: string;
  comment: IComment;
  contentId: string;
};
function Comment({ className, comment, contentId }: CommentProps) {
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { toast } = useToast();
  const { content, owner, createdAt, _id, isEdited, isLiked, likes } = comment;
  const [isReply, setIsReply] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLike, setIsLike] = React.useState(isLiked);
  const isMyComment = user?._id === owner?._id;
  const { mutateAsync: commentDelete } = useDelete<any>(
    apiRoutes.comments.deleteComment,
    apiRoutes.videos.getVideoById + contentId,
    undefined,
    (oldData, id) => {
      if (!oldData) return;
      return {
        data: {
          ...oldData?.data,
          comment: oldData?.data?.comment?.filter(
            (comment: IComment) => comment._id !== id,
          ),
        },
      };
    },
  );

  const { mutateAsync: mutateLikeDislike } = usePost<any, any>(
    apiRoutes.likes.likeDislike,
    apiRoutes.videos.getVideoById + contentId,
    undefined,
    (oldData, data: { commentId: string; state: "like" | "dislike" }) => {
      if (!oldData) return;
      return {
        data: {
          ...oldData?.data,
          comment: oldData?.data?.comment?.map((comment: IComment) => {
            const { likes: totalLikes } = comment;
            if (comment._id === data.commentId) {
              return {
                ...comment,
                likes:
                  data?.state === "dislike"
                    ? totalLikes - (totalLikes > 0 ? 1 : 0)
                    : totalLikes + 1,
                isLiked: data?.state === "dislike" ? false : true,
              };
            }
            return comment;
          }),
        },
      };
    },
  );

  const handleLikedAndDisliked = async (id: string) => {
    const prevLike = isLike;
    try {
      setIsLike(!isLike);
      await mutateLikeDislike({
        commentId: id,
        state: isLike ? "dislike" : "like",
      });
    } catch (error) {
      setIsLike(prevLike);
    }
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
        className="size-9"
        alt={owner?.fullName + ""}
        src={owner?.avatar!}
        name={owner?.fullName}
      />

      <div className="flex-1 space-y-3">
        <div className="w-full flex justify-between gap-3">
          <div className="space-y-1">
            <Typography variant={"h6"} className="text-sm space-x-1.5">
              <span>{owner?.username}</span>
              <span
                className={cn(
                  typographyVariants({
                    variant: "muted",
                    className: "font-normal text-xs",
                  }),
                )}
              >
                {getCreationDateDifference(new Date(createdAt))}
                {isEdited ? " (edited)" : ""}
              </span>
            </Typography>
            <Typography variant={"muted"}>{content}</Typography>
          </div>
          <VideoCard.Actions show={!!user}>
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
          </VideoCard.Actions>
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
              {isLike ? <IoMdHeart /> : <IoIosHeartEmpty />}
            </Button>
            <Typography variant="muted">{viewsFormat(likes)}</Typography>
          </div>
          <Button
            onClick={() => (user ? setIsReply(true) : setOpen(true))}
            variant={"flat"}
            className="w-max rounded-[100vw] h-8"
          >
            Replay
          </Button>
        </div>
        {isReply && (
          <CommentInput
            isReply
            contentId={_id}
            avatarClassName="size-6"
            onClose={() => setIsReply(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Comment;
