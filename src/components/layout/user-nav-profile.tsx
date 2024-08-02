"use client";

import React, { useEffect } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { Typography } from "../ui/typography";
import UpTubeImage from "../uptube/uptube-image";
import { useSignOut } from "@/hooks/useSignOut";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
type Props = {
  className?: string;
  userData: IUser | null;
};
function UserNavProfile({ className, userData }: Props) {
  const router = useRouter();
  const { setUser, user, setLoading, loading } = useUserStore((state) => state);
  useEffect(() => {
    setUser(userData);
    setLoading(false);
  }, [setLoading, setUser, userData]);

  const { signOut, isLoading } = useSignOut();
  const pathname = usePathname();
  const isStudioPage = pathname.startsWith("/studio");
  if (loading) return <Skeleton className="size-10 rounded-full" />;
  if (!user)
    return (
      <>
        <Link
          href={"/signin"}
          className="block sm:hidden relative w-6 h-5 mr-2"
        >
          <UpTubeImage
            alt="Your channel"
            src={"/assets/images/icons/sign-out.svg"}
          />
        </Link>
        <Link
          href={"/signin"}
          className={buttonVariants({
            className:
              "border-none hidden sm:block px-2 py-0 hover:!bg-transparent hover:!text-primary",
            variant: "outline",
          })}
        >
          Login
        </Link>
        <Link
          href={"/signup"}
          className={buttonVariants({
            variant: "destructive",
            className: "h-8 hidden sm:flex justify-center items-center",
          })}
        >
          Sign Up
        </Link>
      </>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <UpTubeAvatarImage
          name={user?.fullName}
          src={user?.avatar || ""}
          alt={`profile of ${user?.username}`}
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
            alt={`profile of ${user?.username}`}
            className="size-10"
          />
          <div className="flex-1 truncate">
            <Typography className="leading-none truncate">
              {user?.fullName}
            </Typography>
            <Typography variant={"muted"}>{user?.username}</Typography>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(`/channel/${user?.username}?tab=stations`)}
        >
          <div className="relative w-6 h-5 mr-2">
            <UpTubeImage
              alt="Your channel"
              src={"/assets/images/icons/channel.svg"}
            />
          </div>
          <span className="text-secondary">Your channel</span>
        </DropdownMenuItem>

        <DropdownMenuItem disabled={isLoading} onClick={() => signOut()}>
          <div className="relative w-6 h-5 mr-2">
            <UpTubeImage
              alt="Your channel"
              src={"/assets/images/icons/sign-out.svg"}
            />
          </div>
          <span className="text-secondary"> Sign out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(isStudioPage ? `/` : `/studio`)}
        >
          <div className="relative w-6 h-5 mr-2">
            <UpTubeImage
              alt={isStudioPage ? "UPTube logo" : "UPTube Studio"}
              src={
                isStudioPage
                  ? "/assets/images/logo.png"
                  : "/assets/images/icons/studio.svg"
              }
            />
          </div>
          <span className="text-secondary">
            UPTube {isStudioPage ? "" : "Studio"}
          </span>
        </DropdownMenuItem>
        {!isStudioPage && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/settings`)}>
              <div className="relative w-6 h-5 mr-2">
                <UpTubeImage
                  alt="Your channel"
                  src={"/assets/images/icons/settings.svg"}
                />
              </div>
              <span className="text-secondary">Settings</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNavProfile;
