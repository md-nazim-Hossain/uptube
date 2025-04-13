import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import UpTubeImage from "../uptube/uptube-image";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { FiMoreVertical } from "react-icons/fi";
import { EyeIcon, EyeOff, Trash } from "lucide-react";
import DeleteAlertModal from "../modals/delete-alert-modal";
import Link from "next/link";
import { INotification } from "@/types";
import { useNotification } from "@/hooks/useNotification";
import { getCreationDateDifference } from "@/utils/video";
import { addHTTPPrefix } from "@/utils/common";

type Props = INotification;
function Notification({
  sender,
  tweetId,
  videoId,
  type,
  commentId,
  ...rest
}: Props) {
  const {
    notificatioType,
    link,
    deleteNotification,
    hideNotification,
    isDeletePending,
    isHidePending,
    isReadPending,
    readNotification,
  } = useNotification({
    sender,
    tweetId,
    videoId,
    type,
    commentId,
    ...rest,
  });
  return (
    <DropdownMenuItem
      onSelect={(e) => e.preventDefault()}
      className="flex gap-2 px-3 py-4 justify-between"
    >
      <Link href={link ?? "#"}>
        <div className="flex gap-2">
          <UpTubeAvatarImage
            src={sender?.avatar}
            alt={`Avatar of ${sender?.fullName}`}
            className="size-12"
            name={sender?.fullName}
          />
          <Typography className="flex-1 [&:not(:first-child)]:mt-0 line-clamp-5">
            <span className="font-medium">
              {sender?.fullName} {notificatioType()}:
            </span>
            <span className="text-slate-300">
              {videoId?.title || tweetId?.content || commentId?.content}
            </span>
          </Typography>
          <div className="w-[86px] h-14 relative rounded-md overflow-hidden">
            {(videoId?.thumbnail || tweetId?.thumbnail) && (
              <UpTubeImage
                src={addHTTPPrefix((videoId?.thumbnail || tweetId?.thumbnail)!)}
                alt={(videoId?.title || tweetId?.content)!}
                className="w-[86px] h-14"
              />
            )}
          </div>
        </div>
        <div className="ml-14">
          <Typography variant={"xsmall"} className="text-secondary">
            {getCreationDateDifference(new Date(rest?.createdAt))}
          </Typography>
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Button variant={"icon"}>
            <FiMoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isReadPending || rest?.isRead}
            onSelect={readNotification}
          >
            <EyeIcon size={14} />
            <span className="ml-2">Read notification</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isHidePending}
            onSelect={hideNotification}
          >
            <EyeOff size={14} />
            <span className="ml-2">Hide this notification</span>
          </DropdownMenuItem>
          <DeleteAlertModal
            onDelete={async () => await deleteNotification(rest?._id)}
            text={`notification`}
            trigger={
              <DropdownMenuItem
                disabled={isDeletePending}
                onSelect={(e) => e.preventDefault()}
              >
                <Trash size={14} className="text-destructive" />
                <span className="ml-2">Delete notification</span>
              </DropdownMenuItem>
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </DropdownMenuItem>
  );
}

export default Notification;
