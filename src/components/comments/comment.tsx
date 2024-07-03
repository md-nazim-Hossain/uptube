import { IComment } from "@/types";
import React from "react";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { Typography, typographyVariants } from "../ui/typography";
import { getCreationDateDifference, viewsFormat } from "@/utils/video";
import { cn } from "@/lib/utils";
import { VideoCard } from "../ui/video-card";
import { Button } from "../ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import CommentInput from "./comment-input";
import { useDelete, usePost } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useToast } from "../ui/use-toast";
import { useUserStore } from "@/zustand/useUserStore";
import DeleteAlertModal from "../modals/delete-alert-modal";

type CommentProps = {
  className?: string;
  comment: IComment;
};
function Comment({ className, comment }: CommentProps) {
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();
  const { content, owner, createdAt, _id, isEdited, isLiked, likes } = comment;
  const [isReply, setIsReply] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLike, setIsLike] = React.useState(isLiked);
  const [totalCommentsLikes, setTotalCommentsLikes] = React.useState(likes);
  const isMyComment = user?._id === owner?._id;
  const { mutateAsync: mutateDelete } = useDelete(
    apiRoutes.comments.deleteComment,
  );

  const { mutateAsync: mutateLike } = usePost(apiRoutes.likes.createLike);
  const { mutateAsync: disLike } = useDelete(apiRoutes.likes.deleteLike);

  const handleLikedAndDisliked = async (id: string) => {
    const prevLike = isLike;
    const prevTotalLikes = totalCommentsLikes;
    try {
      if (isLike) {
        if (totalCommentsLikes <= 0) return;
        await disLike(id);
        setIsLike(false);
        setTotalCommentsLikes(totalCommentsLikes - 1);
      } else {
        await mutateLike(id);
        setIsLike(true);
        setTotalCommentsLikes(totalCommentsLikes + 1);
      }
    } catch (error) {
      setIsLike(prevLike);
      setTotalCommentsLikes(prevTotalLikes);
    }
  };

  if (isEdit)
    return (
      <CommentInput
        contentId=""
        defaultValue={{ comment: content, _id }}
        isEdit
        onClose={() => setIsEdit(false)}
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
          <VideoCard.Actions show>
            {isMyComment ? (
              <>
                <Button onClick={() => setIsEdit(true)} variant={"flat"}>
                  Edit
                </Button>
                <DeleteAlertModal
                  onDelete={async () => {
                    try {
                      await mutateDelete(_id);
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
              onClick={() => handleLikedAndDisliked(_id)}
              variant="icon"
              className="size-8 text-base rounded-full p-0 hover:bg-primary/10"
            >
              {isLike ? <FaHeart /> : <FaRegHeart />}
            </Button>
            <Typography variant="muted">
              {viewsFormat(totalCommentsLikes)}
            </Typography>
          </div>
          <Button
            onClick={() => setIsReply(true)}
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
