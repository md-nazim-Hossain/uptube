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
import { EyeOff, Trash } from "lucide-react";
import DeleteAlertModal from "../modals/delete-alert-modal";
import Link from "next/link";
import { INotification } from "@/types";
import { useNotification } from "@/hooks/useNotification";

type Props = INotification;
function Notification({
  sender,
  tweetId,
  videoId,
  type,
  commentId,
  ...rest
}: Props) {
  const { notificatioType, link } = useNotification({
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
      className="flex gap-2 justify-between"
    >
      <Link href={link ?? "#"} className="flex-1 flex gap-2">
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
        <div className="w-[86px] h-16"></div>
        {(videoId?.thumbnail || tweetId?.thumbnail) && (
          <UpTubeImage
            src={(videoId?.thumbnail || tweetId?.thumbnail)!}
            alt={(videoId?.title || tweetId?.content)!}
            className="w-[86px] h-16"
          />
        )}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Button variant={"icon"}>
            <FiMoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EyeOff size={14} />
            <span className="ml-2">Hide this notification</span>
          </DropdownMenuItem>
          <DeleteAlertModal
            onDelete={() => {}}
            text={`notification`}
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
