"use client";

import { exploreData, getChannelHistory, sidebarTopData } from "@/data";
import { cn } from "@/lib/utils";
import { ISideProps } from "@/types";
import { useLayoutStore } from "@/zustand/useLayoutStore";
import { useUserStore } from "@/zustand/useUserStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import Theme from "./theme";
import { usePathname } from "next/navigation";
import Logo from "./logo";

function UptubeSidebar() {
  const pathname = usePathname();
  const openSidebar = useLayoutStore((state) => state.openUPTubeSidebar);
  const setOpenSidebar = useLayoutStore((state) => state.setOpenUPTubeSidebar);
  const { user, loading } = useUserStore((state) => state);
  const isWatchPage = pathname === "/watch";
  if (loading) return null;
  return (
    <>
      <div
        onClick={() => setOpenSidebar(!openSidebar)}
        className={cn(
          "fixed bg-black/50",
          openSidebar
            ? `${
                isWatchPage
                  ? "z-50 w-screen h-screen inset-0 "
                  : "z-50 w-screen h-screen inset-0 sm:w-0 sm:h-0 sm:-z-50"
              }`
            : "-z-50",
        )}
      ></div>
      <div
        className={cn(
          "fixed left-0 flex-shrink-0 duration-300 top-0 overflow-y-auto scroll h-screen shadow-xl bg-background",
          openSidebar ? "w-[255px]" : "w-max",
          openSidebar
            ? `-translate-x-0 ${!isWatchPage && "sm:translate-x-0"}`
            : `-translate-x-full ${!isWatchPage && "sm:translate-x-0"}`,
          isWatchPage
            ? "sm:fixed z-50"
            : "sm:sticky sm:shadow-none z-50 sm:z-40 sm:top-14",
        )}
      >
        <Logo
          className={cn("px-2", isWatchPage ? "" : "flex sm:hidden")}
          href="/"
        />
        <div className={cn("py-3", openSidebar ? "space-y-4" : "space-y-2")}>
          {/* ============= Discover Sidebar Link =============*/}
          <div className={cn("space-y-0.5 pl-2", !isWatchPage && "sm:px-0")}>
            {sidebarTopData.map((item: ISideProps, index: number) => (
              <SidebarLink key={index} item={item} />
            ))}
          </div>
          <Separator />

          {/* ============= Your channel Sidebar Link =============*/}
          {user && (
            <div className={cn("space-y-0.5 px-2", !isWatchPage && "sm:px-0")}>
              {openSidebar && (
                <span className="text-xs font-light mb-4">You</span>
              )}
              {getChannelHistory(user.username).map(
                (item: ISideProps, index: number) => (
                  <SidebarLink key={index} item={item} />
                ),
              )}
            </div>
          )}
          {user && <Separator />}

          {/* ============= Explore Features Sidebar Link =============*/}
          <div className={cn("space-y-0.5 px-2", !isWatchPage && "sm:px-0")}>
            {openSidebar && (
              <span className="text-xs font-light mb-4">Explore</span>
            )}
            {exploreData.map((item: ISideProps, index: number) => (
              <SidebarLink key={index} item={item} />
            ))}
          </div>
          <Separator />

          {/* ============= Settings Features Sidebar Link =============*/}
          <div className={cn("space-y-0.5 px-2", !isWatchPage && "sm:px-0")}>
            {openSidebar && (
              <span className="text-xs font-light mb-4">Settings</span>
            )}
            <div className="flex flex-col gap-2">
              <SidebarLink
                item={{
                  href: "/settings",
                  Icon: "/assets/images/icons/settings.svg",
                  label: "Settings",
                }}
              />
              <Theme
                showLabel
                className={cn(
                  "flex text-secondary items-center p-2 hover:bg-primary/10",
                  !openSidebar
                    ? "rounded-md flex-col gap-1.5"
                    : "rounded-[100vw] flex-row gap-3",
                )}
              />
            </div>
          </div>

          {/* ===============privacy policy ==============*/}
          {openSidebar && (
            <>
              <Separator />
              <div className="space-x-2 mx-2">
                <Link
                  className="text-sm text-secondary"
                  href={"/privacy-policy"}
                >
                  Privacy Policy
                </Link>
                <Link
                  className="text-sm text-secondary"
                  href={"/terms-and-services"}
                >
                  Terms & Services
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UptubeSidebar;

const SidebarLink: React.FC<{ item: ISideProps }> = ({ item }) => {
  const pathname = usePathname();
  const openSidebar = useLayoutStore((state) => state.openUPTubeSidebar);
  const setOpenSidebar = useLayoutStore((state) => state.setOpenUPTubeSidebar);
  return (
    <Link
      onClick={() => setOpenSidebar(false)}
      href={item.href}
      className={cn(
        "flex items-center p-2 hover:bg-primary/10",
        !openSidebar
          ? "rounded-md flex-col gap-1.5"
          : "rounded-[100vw] flex-row gap-3",
        pathname === item.href && " bg-primary/10",
      )}
    >
      <Image src={item?.Icon!} alt={item?.label} width={24} height={20} />
      <span
        className={cn("text-secondary", openSidebar ? "text-sm" : "text-xs")}
      >
        {item?.label}
      </span>
    </Link>
  );
};
