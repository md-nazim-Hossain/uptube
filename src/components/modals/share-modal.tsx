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
type Props = {
  trigger: React.ReactNode;
  user: {
    fullName: string;
    followers: number;
    src: string;
  };
  shareLink: string;
};
function ShareModal({ trigger, user, shareLink }: Props) {
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
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-5">
            <UpTubeAvatarImage
              className="size-20"
              name={user?.fullName}
              src={user?.src}
              alt={`profile of ${user?.fullName}`}
            />
            <div>
              <Typography variant={"h4"}>{user?.fullName}</Typography>
              <Typography variant={"muted"}>
                Followers: {viewsFormat(user?.followers)}
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
          <Input
            className="text-muted-foreground"
            variant={"destructive"}
            defaultValue={`${link}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
