import React from "react";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  username: string;
  src: string;
  fullName: string;
};
function Follower({ username, src, fullName }: Props) {
  return (
    <div className="w-full max-w-[230px] md:max-w-[240px] space-y-1.5">
      <Link href={`/channel/${username}`} className="space-y-2.5">
        <UpTubeAvatarImage
          src={src}
          alt={`Avatar of ${username}`}
          className="size-[230px] md:size-[240px]"
          firstName={fullName.split(" ")[0]}
          lastName={fullName.split(" ")[1]}
        />
        <Typography variant={"small"} className="block font-normal text-center">
          {username}
        </Typography>
      </Link>
      <div className="flex items-center justify-center">
        <Button
          className="text-destructive h-max text-xs px-2 py-0.5"
          variant={"outline"}
        >
          Follow
        </Button>
      </div>
    </div>
  );
}

export default Follower;
