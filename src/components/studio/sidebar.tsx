"use client";
import React from "react";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { useUserStore } from "@/zustand/useUserStore";
import { Typography } from "../ui/typography";
import { CiLocationArrow1 } from "react-icons/ci";
import Link from "next/link";
import { studioSidebarData } from "@/data";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Sidebar() {
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();
  return (
    <div className="w-[255px] border-r pb-5">
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
      <div>
        <div>
          {studioSidebarData.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={cn(
                "flex studio-container relative py-4 items-center gap-4 hover:bg-primary/10",
                item.href === pathname ? "bg-primary/10" : "bg-transparent",
              )}
            >
              <item.Icon
                className={cn(item.href === pathname ? "text-red-500" : "")}
                size={20}
              />
              <Typography
                variant={"small"}
                className={cn(
                  "font-normal",
                  item.href === pathname ? "text-red-500" : "",
                )}
              >
                {item.label}
              </Typography>
              {item.href === pathname ? (
                <motion.div
                  className="absolute left-0 bg-red-500 top-0 w-1 h-full"
                  layoutId="underline"
                />
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
