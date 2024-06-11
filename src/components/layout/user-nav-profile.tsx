"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { useUserStore } from "@/zustand/useUserStore";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { Typography } from "../ui/typography";
import UpTubeImage from "../uptube/uptube-image";
import { useSignOut } from "@/hooks/useSignOut";

type Props = {
  className?: string;
};
function UserNavProfile({ className }: Props) {
  const user = useUserStore((state) => state.user) as IUser;
  const router = useRouter();
  const { signOut, isLoading } = useSignOut();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <UpTubeAvatarImage
          name={user?.fullName}
          src={user?.avatar || ""}
          alt={`profile of @${user?.username}`}
          className="size-10"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-default flex items-center gap-3 focus:bg-transparent"
        >
          <UpTubeAvatarImage
            name={user?.fullName}
            src={user?.avatar || ""}
            alt={`profile of @${user?.username}`}
            className="size-10"
          />
          <div className="flex-1 truncate">
            <Typography className="leading-none truncate">
              {user?.fullName}
            </Typography>
            <Typography variant={"muted"}>@{user?.username}</Typography>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push(`/my-channel`)}>
          <div className="relative w-6 h-5 mr-2">
            <UpTubeImage
              alt="Your channel"
              src={"/assets/images/icons/channel.svg"}
            />
          </div>
          <span className="text-secondary">Your channel</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isLoading} onClick={() => signOut()}>
          <div className="relative w-6 h-5 mr-2">
            <UpTubeImage
              alt="Your channel"
              src={"/assets/images/icons/sign-out.svg"}
            />
          </div>
          <span className="text-secondary ml-2"> Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNavProfile;
