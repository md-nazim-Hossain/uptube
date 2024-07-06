"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Typography, typographyVariants } from "../ui/typography";
import { VscMail } from "react-icons/vsc";
import { TfiWorld } from "react-icons/tfi";
import { GoVideo } from "react-icons/go";
import { IoIosTrendingUp } from "react-icons/io";
import { viewsFormat } from "@/utils/video";
import { BsExclamationOctagon } from "react-icons/bs";
import { format } from "date-fns";
import { GiWorld } from "react-icons/gi";
import { PiShareFatLight } from "react-icons/pi";
import ShareModal from "./share-modal";
import { Button } from "../ui/button";
import Link from "next/link";
import CopyButton from "../copy-button";
import { PiUserSound } from "react-icons/pi";

type Props = {
  trigger: React.ReactNode;
  channel: {
    email: string;
    createdAt: string;
    username: string;
    country: string;
    totalViews: number;
    totalVideos: number;
    description: string;
    fullName: string;
    avatar: string;
    subscriber: number;
  };
};
function AboutMyChannelModal({ trigger, channel }: Props) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${channel?.username}`;
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
        </DialogHeader>
        <Typography
          className="text-sm [&:not(:first-child)]:mt-0"
          variant={"p"}
        >
          {channel?.description}
        </Typography>
        <div className="flex flex-col gap-5">
          <Typography variant={"h4"}>Channel Details</Typography>
          <div className="flex items-center gap-3">
            <VscMail size={20} />
            <Link
              href={`mailto:${channel?.email}`}
              className={typographyVariants({
                variant: "small",
                className: "font-normal",
              })}
            >
              {channel?.email}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <TfiWorld size={20} />
            <Link
              href={link}
              className={typographyVariants({
                variant: "small",
                className: "font-normal",
              })}
            >
              {link}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <PiUserSound size={20} />
            <Typography variant={"small"} className="font-normal">
              {channel?.subscriber}
            </Typography>
          </div>

          <div className="flex items-center gap-3">
            <GoVideo size={20} />
            <Typography variant={"small"} className="font-normal">
              {channel?.totalVideos}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <IoIosTrendingUp size={24} />
            <Typography variant={"small"} className="font-normal">
              {viewsFormat(channel?.totalViews)}{" "}
              {channel?.totalViews > 1 ? "views" : "view"}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <BsExclamationOctagon size={20} className="rotate-90" />
            <Typography variant={"small"} className="font-normal">
              Joined{" "}
              {channel?.createdAt &&
                format(new Date(channel?.createdAt), "dd MMM yyyy")}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <GiWorld size={24} />
            <Typography variant={"small"} className="font-normal">
              {channel?.country}
            </Typography>
          </div>
          <div className="flex items-center gap-3 justify-between">
            <ShareModal
              user={{
                subscriber: channel?.subscriber,
                fullName: channel?.fullName,
                avatar: channel?.avatar,
              }}
              shareLink={`/${channel?.username}`}
              trigger={
                <Button className="flex items-center gap-2 border">
                  <PiShareFatLight size={20} />
                  <span>Share Channel</span>
                </Button>
              }
            />
            <CopyButton link={link} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AboutMyChannelModal;
