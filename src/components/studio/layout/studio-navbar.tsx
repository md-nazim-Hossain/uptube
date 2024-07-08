"use client";
import Logo from "@/components/layout/logo";
import UserNavProfile from "@/components/layout/user-nav-profile";
import { SearchBoxDesktop } from "@/components/search-box";
import React from "react";
import UploadContentDropdown from "./upload-content-dropdown";
import { useLayoutStore } from "@/zustand/useLayoutStore";

function StudioNavbar() {
  const { openStudioSidebar, setOpenStudioSidebar } = useLayoutStore(
    (state) => state,
  );
  return (
    <div className="studio-container items-center justify-between shadow-sm border-b flex gap-5 sticky top-0 z-50 bg-background h-[56px]">
      <Logo
        title="Studio"
        href={`/studio`}
        onClick={() => setOpenStudioSidebar(!openStudioSidebar)}
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
