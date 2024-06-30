"use client";
import Logo from "@/components/layout/logo";
import UserNavProfile from "@/components/layout/user-nav-profile";
import { SearchBoxDesktop } from "@/components/search-box";
import { useUserStore } from "@/zustand/useUserStore";
import React from "react";
import UploadContentDropdown from "./upload-content-dropdown";

function StudioNavbar() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="studio-container items-center justify-between shadow flex gap-5 sticky top-0 z-50 bg-background h-[56px]">
      <Logo
        title="Studio"
        href={`/studio/${user?.username}`}
        onClick={() => {}}
      />
      <SearchBoxDesktop />
      <div className="flex gap-5 items-center">
        <UploadContentDropdown />
        <UserNavProfile />
      </div>
    </div>
  );
}

export default StudioNavbar;
