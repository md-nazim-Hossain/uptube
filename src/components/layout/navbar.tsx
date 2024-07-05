"use client";
import Link from "next/link";
import React from "react";

import { Button, buttonVariants } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { exploreData, getChannelHistory, sidebarTopData } from "@/data";
import Image from "next/image";
import { ISideProps } from "@/types";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "next-themes";
import { SearchBoxDesktop, SearchBoxMobile } from "../search-box";
import { FiSearch } from "react-icons/fi";
import UpTubeImage from "../uptube/uptube-image";
import { useUserStore } from "@/zustand/useUserStore";
import UserNavProfile from "./user-nav-profile";
import Logo from "./logo";

function Navbar() {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();
  const [openMobileSearch, setOpenMobileSearch] = React.useState(false);
  return (
    <>
      {/* Mobile Search */}
      {openMobileSearch ? (
        <SearchBoxMobile onClose={() => setOpenMobileSearch(false)} />
      ) : (
        <div className=" items-center justify-between flex gap-5 sticky top-0 z-50 bg-background h-[56px] container">
          <div className="flex gap-x-1 md:gap-x-2 items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size={"icon"} variant={"icon"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    focusable="false"
                    fill="currentColor"
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
                  <Logo onClick={() => setOpen(false)} href={"/"} />
                </SheetHeader>
                <Link
                  href={"/signin"}
                  className={buttonVariants({
                    variant: "destructive",
                    className: "w-full",
                  })}
                >
                  Sign In
                </Link>

                {/* ============= Discover Sidebar Link =============*/}
                <div className="svg pt-2 space-y-0.5">
                  {sidebarTopData.map((item: ISideProps, index: number) => (
                    <Link
                      onClick={() => setOpen(false)}
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
                      <span className="text-sm text-secondary">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
                <Separator />

                {/* ============= Your channel Sidebar Link =============*/}
                {user && (
                  <div className="pt-2 space-y-0.5">
                    <span className="text-xs font-light mb-4">You</span>
                    {getChannelHistory(user.username, user._id).map(
                      (item: ISideProps, index: number) => (
                        <Link
                          onClick={() => setOpen(false)}
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
                          <span className="text-sm text-secondary">
                            {item.label}
                          </span>
                        </Link>
                      ),
                    )}
                  </div>
                )}
                {user && <Separator />}

                {/* ============= Explore Features Sidebar Link =============*/}
                <div className="pt-2 space-y-0.5">
                  <span className="text-xs font-light mb-4">Explore</span>
                  {exploreData.map((item: ISideProps, index: number) => (
                    <Link
                      onClick={() => setOpen(false)}
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
                      <span className="text-sm text-secondary">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
                <Separator />

                {/* ============= Settings Features Sidebar Link =============*/}
                <div className="py-2 space-y-0.5">
                  <span className="text-xs font-light mb-4">Settings</span>
                  <div className="flex flex-col gap-2">
                    <Link
                      onClick={() => setOpen(false)}
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
                      <span className="text-sm text-secondary">Settings</span>
                    </Link>
                    <div className="flex items-center space-x-3">
                      <Switch
                        onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
                        checked={theme === "dark"}
                        id="dark-mode"
                      />
                      <Label
                        className="text-sm text-secondary font-normal"
                        htmlFor="dark-mode"
                      >
                        Dark Mode
                      </Label>
                    </div>
                  </div>
                </div>

                {/* ===============privacy policy ==============*/}
                <Separator />
                <div className="space-x-2">
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
              </SheetContent>
            </Sheet>
            <Link
              className="text-xl font-bold flex items-center gap-1"
              href={"/"}
            >
              <span className="relative size-5 overflow-hidden">
                <UpTubeImage
                  src="/assets/images/logo.png"
                  alt="UPTube Logo"
                  className="object-cover"
                />
              </span>
              <span>UPTube</span>
            </Link>
          </div>
          <SearchBoxDesktop />
          <div className="gap-x-3 flex items-center">
            <div className="block sm:hidden">
              <FiSearch
                onClick={() => setOpenMobileSearch(true)}
                size={16}
                className="cursor-pointer text-secondary"
              />
            </div>
            <UserNavProfile />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
