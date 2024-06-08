import React from "react";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";

type Props = {
  username: string;
  src: string;
  fullName: string;
};
function Follower({ username, src, fullName }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <UpTubeAvatarImage
        src={src}
        alt={`Avatar of ${username}`}
        className="size-[230px] md:size-[240px]"
        firstName={fullName.split(" ")[0]}
        lastName={fullName.split(" ")[1]}
      />
      <div>
        <Typography variant={"small"}>{username}</Typography>
        <Button className="text-destructive" variant={"outline"}>
          Follow
        </Button>
      </div>
    </div>
  );
}

export default Follower;
