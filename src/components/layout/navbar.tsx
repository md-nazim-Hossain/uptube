"use client";
import Link from "next/link";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { channelHistoryData, exploreData, sidebarTopData } from "@/data";
import Image from "next/image";
import { ISideProps } from "@/types";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "next-themes";
function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center justify-between h-[56px] cp-5">
      <div className="flex gap-x-4 items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"icon"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                focusable="false"
                style={{
                  pointerEvents: "none",
                  display: "block",
                  width: "24px",
                  height: "24px",
                }}
              >
                <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[240px] pt-0 pb-5 pl-5 pr-2 space-y-4 max-h-[100vh] overflow-auto"
            side="left"
          >
            <SheetHeader>
              <div className="flex items-center gap-4 -ml-2.5 h-[56px]">
                <Button
                  onClick={() => setOpen(false)}
                  size={"icon"}
                  variant={"icon"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    focusable="false"
                    style={{
                      pointerEvents: "none",
                      display: "block",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                  </svg>
                </Button>
                <Link className="text-2xl font-bold" href={"/"}>
                  UPTube
                </Link>
              </div>
            </SheetHeader>
            <Button variant={"destructive"} className="w-full">
              Sign In
            </Button>

            {/* ============= Discover Sidebar Link =============*/}
            <div className="pt-2 space-y-0.5">
              {sidebarTopData.map((item: ISideProps, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 p-2 -ml-2.5 hover:bg-primary/10 rounded-[100vw]",
                  )}
                >
                  <Image
                    src={item.Icon}
                    alt={item.label}
                    width={24}
                    height={20}
                  />
                  <span className="text-sm font-light">{item.label}</span>
                </Link>
              ))}
            </div>
            <Separator />

            {/* ============= Your channel Sidebar Link =============*/}
            <div className="pt-2 space-y-0.5">
              <span className="text-xs font-light mb-4">You</span>
              {channelHistoryData.map((item: ISideProps, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 p-2 -ml-2.5 hover:bg-primary/10 rounded-[100vw]",
                  )}
                >
                  <Image
                    src={item.Icon}
                    alt={item.label}
                    width={24}
                    height={20}
                  />
                  <span className="text-sm font-light">{item.label}</span>
                </Link>
              ))}
            </div>
            <Separator />

            {/* ============= Explore Features Sidebar Link =============*/}
            <div className="pt-2 space-y-0.5">
              <span className="text-xs font-light mb-4">Explore</span>
              {exploreData.map((item: ISideProps, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 p-2 -ml-2.5 hover:bg-primary/10 rounded-[100vw]",
                  )}
                >
                  <Image
                    src={item.Icon}
                    alt={item.label}
                    width={24}
                    height={20}
                  />
                  <span className="text-sm font-light">{item.label}</span>
                </Link>
              ))}
            </div>
            <Separator />

            {/* ============= Settings Features Sidebar Link =============*/}
            <div className="pt-2 space-y-0.5">
              <span className="text-xs font-light mb-4">Settings</span>
              <div className="flex flex-col gap-2">
                <Link
                  href={"/settings"}
                  className={cn(
                    "flex items-center gap-3 p-2 -ml-2.5 hover:bg-primary/10 rounded-[100vw]",
                  )}
                >
                  <Image
                    src={"/assets/images/icons/settings.svg"}
                    alt={"Settings"}
                    width={24}
                    height={20}
                  />
                  <span className="text-sm font-light">Settings</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <Switch
                    onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
                    checked={theme === "dark"}
                    id="dark-mode"
                  />
                  <Label className="text-sm font-light" htmlFor="dark-mode">
                    Dark Mode
                  </Label>
                </div>
              </div>
            </div>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
        <Link className="text-2xl font-bold" href={"/"}>
          UPTube
        </Link>
      </div>
      <div
        className={
          "w-full max-w-md rounded-lg bg-primary/5 flex items-center gap-3 px-3"
        }
      >
        <FiSearch size={16} className="cursor-pointer text-slate-400" />
        <Input
          inputSize={"lg"}
          variant={"outline"}
          className="px-0 bg-transparent"
          placeholder="Search..."
        />
      </div>
      <div className="gap-x-3 flex items-center">
        <Button
          variant={"outline"}
          className="border-none hover:bg-transparent"
        >
          Login
        </Button>
        <Button variant={"destructive"} className="rounded-[20px] w-[100px]">
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
