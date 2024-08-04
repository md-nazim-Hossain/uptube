import Logo from "@/components/layout/logo";
import UserNavProfile from "@/components/layout/user-nav-profile";
import React from "react";
import UploadContentDropdown from "./upload-content-dropdown";
import { getUser } from "@/_actions/user/getUser";

async function StudioNavbar() {
  const user = await getUser();
  return (
    <div className="studio-container items-center justify-between shadow-sm border-b flex gap-5 sticky top-0 z-50 h-[56px]">
      <Logo title="Studio" href={`/studio`} />
      <div className="flex gap-5 items-center">
        <UploadContentDropdown />
        <UserNavProfile userData={user} />
      </div>
    </div>
  );
}

export default StudioNavbar;
