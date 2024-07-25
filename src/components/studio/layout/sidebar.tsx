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
import { useLayoutStore } from "@/zustand/useLayoutStore";
import Theme from "@/components/layout/theme";
import { Skeleton } from "@/components/ui/skeleton";

function Sidebar() {
  const user = useUserStore((state) => state.user);
  const openStudioSidebar = useLayoutStore((state) => state.openStudioSidebar);
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "border-r fixed sm:static left-0 duration-300 sm:duration-0 top-[56px] h-full z-50 shadow-xl sm:shadow-none bg-background",
        openStudioSidebar ? "w-[255px] " : "w-max",
        openStudioSidebar
          ? "-translate-x-0 sm:translate-x-0"
          : "-translate-x-full sm:translate-x-0",
      )}
    >
      <div
        className={cn(
          "w-full flex flex-col justify-center items-center",
          openStudioSidebar ? "h-[208px] " : "h-[208px] sm:h-auto pt-4",
        )}
      >
        <div
          className={cn(
            "rounded-full relative mb-4 group",
            openStudioSidebar ? "size-[112px] " : "size-[32px]",
          )}
        >
          <Link
            href={`/channel/${user?.username}`}
            className="w-full h-full flex justify-center items-center cursor-pointer duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 bg-black/50 z-10 absolute rounded-full"
          >
            <CiLocationArrow1
              size={!openStudioSidebar ? 20 : 28}
              className="text-white"
            />
          </Link>
          {user ? (
            <UpTubeAvatarImage
              src={user?.avatar!}
              alt={`Avatar of ${user?.username}`}
              name={user?.fullName}
              className="w-full h-full rounded-full"
            />
          ) : (
            <Skeleton className="w-full h-full rounded-full" />
          )}
        </div>
        {openStudioSidebar && (
          <>
            <Typography variant={"muted"} className="text-primary">
              {user?.fullName}
            </Typography>
            <Typography variant={"muted"}>{user?.username}</Typography>
          </>
        )}
      </div>
      <div
        className={cn(
          "flex flex-col gap-5 justify-between",
          openStudioSidebar
            ? "h-[calc(100%-285px)] sm:h-[calc(100%-228px)]"
            : "h-[calc(100%-84px)]",
        )}
      >
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
                  "flex studio-container relative h-[50px] w-full items-center gap-4 hover:bg-primary/10",
                  isActive ? "bg-primary/10" : "bg-transparent",
                  openStudioSidebar ? "" : "justify-center px-0",
                )}
              >
                <item.Icon
                  className={cn(isActive ? "text-red-500" : "")}
                  size={20}
                />
                {openStudioSidebar && (
                  <Typography
                    variant={"small"}
                    className={cn(
                      "font-normal",
                      isActive ? "text-red-500" : "",
                    )}
                  >
                    {item.label}
                  </Typography>
                )}
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
        <div
          className={cn(
            "",
            openStudioSidebar
              ? "studio-container"
              : "studio-container sm:flex sm:justify-center sm:items-center",
          )}
        >
          <Theme />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
