import Logo from "@/components/layout/logo";
import UserNavProfile from "@/components/layout/user-nav-profile";
import React from "react";
import UploadContentDropdown from "./upload-content-dropdown";

function StudioNavbar() {
  return (
    <div className="studio-container items-center justify-between shadow-sm border-b flex gap-5 sticky top-0 z-50 h-[56px]">
      <Logo title="Studio" href={`/studio`} />
      <div className="flex gap-5 items-center">
        <UploadContentDropdown />
        <UserNavProfile />
      </div>
    </div>
  );
}

export default StudioNavbar;
