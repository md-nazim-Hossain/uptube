import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { Typography, typographyVariants } from "../ui/typography";
import { viewsFormat } from "@/utils/video";
import { Input } from "../ui/input";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { MyTooltip } from "../ui/tooltip";
type Props = {
  trigger: React.ReactNode;
  user: {
    fullName: string;
    subscriber: number;
    avatar: string;
  };
  shareLink: string;
};
function ShareModal({ trigger, user, shareLink }: Props) {
  const { toast } = useToast();
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}${
    shareLink.includes("/") ? shareLink : `/${shareLink}`
  }`;
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed</DialogTitle>
        </DialogHeader>
        <div className="w-full flex items-end justify-between">
          <div className="flex items-center gap-5">
            <UpTubeAvatarImage
              className="size-20"
              name={user?.fullName}
              src={user?.avatar}
              alt={`profile of ${user?.fullName}`}
            />
            <div>
              <Typography variant={"h4"}>{user?.fullName}</Typography>
              <Typography variant={"muted"}>
                Subscribers: {viewsFormat(user?.subscriber)}
              </Typography>
            </div>
          </div>
          <Link
            href={"/"}
            className={cn(
              typographyVariants({
                variant: "link",
                className: "text-destructive text-sm",
              }),
            )}
          >
            UPTube
          </Link>
        </div>
        <div>
          <Input
            variant={"destructive"}
            className="text-muted-foreground"
            defaultValue={`<iframe width="100%" height="220" scrolling="no" frameborder="no" src="${link}" type="user"></iframe>`}
          />
        </div>
        <div className="space-y-5">
          <Typography variant={"small"}>Share</Typography>
          <div className="flex gap-2">
            <FacebookShareButton url={link}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={link}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton url={link}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <TwitterShareButton url={link}>
              <XIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </div>
        <div className="w-full max-w-[465px] border rounded-md flex items-center justify-between gap-3 px-4 py-2">
          <MyTooltip text={link} triggerClassName="w-[80%] cursor-default">
            <Typography variant={"muted"} className="w-full truncate">
              {link}
            </Typography>
          </MyTooltip>
          <Button
            size={"sm"}
            onClick={() => {
              navigator.clipboard
                .writeText(link)
                .then(() => {
                  toast({
                    title: "Copied to clipboard",
                  });
                })
                .catch((err) => {
                  toast({
                    title: "Failed to copy",
                    variant: "destructive",
                  });
                });
            }}
          >
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
