"use client";
import React from "react";
import UpTubeAvatarImage from "../../uptube/uptube-avatar-image";
import { useUserStore } from "@/zustand/useUserStore";
import { Typography } from "../../ui/typography";
import { CiLocationArrow1 } from "react-icons/ci";
import Link from "next/link";
import { studioSidebarData } from "@/data";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Switch } from "../../ui/switch";
import { useTheme } from "next-themes";
import { Label } from "../../ui/label";

function Sidebar() {
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  return (
    <div className="w-[255px] border-r">
      <div className="w-full h-[208px] flex flex-col justify-center items-center">
        <div className="size-[112px] rounded-full relative mb-4 group">
          <Link
            href={`/channel/${user?._id}`}
            className="w-full h-full flex justify-center items-center cursor-pointer duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 bg-black/50 z-10 absolute rounded-full"
          >
            <CiLocationArrow1 size={28} className="text-white" />
          </Link>
          <UpTubeAvatarImage
            src={user?.avatar!}
            alt={`Avatar of ${user?.username}`}
            name={user?.username}
            className="size-[112px] rounded-full"
          />
        </div>
        <Typography variant={"muted"} className="text-primary">
          {user?.fullName}
        </Typography>
        <Typography variant={"muted"}>{user?.username}</Typography>
      </div>
      <div className="flex h-[calc(100%-228px)] flex-col gap-5 justify-between">
        <div>
          {studioSidebarData.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (pathname.includes("/content") &&
                item.href.startsWith("/studio/content"));
            return (
              <Link
                href={item.href}
                key={index}
                className={cn(
                  "flex studio-container relative py-4 items-center gap-4 hover:bg-primary/10",
                  isActive ? "bg-primary/10" : "bg-transparent",
                )}
              >
                <item.Icon
                  className={cn(isActive ? "text-red-500" : "")}
                  size={20}
                />
                <Typography
                  variant={"small"}
                  className={cn("font-normal", isActive ? "text-red-500" : "")}
                >
                  {item.label}
                </Typography>
                {isActive ? (
                  <motion.div
                    className="absolute left-0 bg-red-500 top-0 w-1 h-full"
                    layoutId="studioSidebar"
                  />
                ) : null}
              </Link>
            );
          })}
        </div>
        <div className="studio-container">
          <div className="flex items-center space-x-3 ">
            <Switch
              onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
              checked={theme === "dark"}
              id="dark-mode"
            />
            <Label className="text-sm font-normal" htmlFor="dark-mode">
              Dark Mode
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
