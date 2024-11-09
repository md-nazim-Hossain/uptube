"use client";
import React from "react";
import { SearchBoxDesktop, SearchBoxMobile } from "./search-box";
import Logo from "./logo";
import { Button } from "../ui/button";
import { FiSearch } from "react-icons/fi";
import UserNavProfile from "./user-nav-profile";
import Notifications from "../notifications/notifications";

function Navbar() {
  const [openMobileSearch, setOpenMobileSearch] = React.useState(false);

  return (
    <div className="bg-background fixed top-0 z-50 w-full min-w-screen left-0">
      {/* Mobile Search */}
      {openMobileSearch ? (
        <SearchBoxMobile onClose={() => setOpenMobileSearch(false)} />
      ) : (
        <div className="items-center justify-between flex gap-5 h-[56px] bg-background container">
          <Logo href="/" />
          <SearchBoxDesktop />
          <div className="gap-x-3 flex items-center">
            <Button
              variant={"icon"}
              className="flex sm:hidden p-0 text-secondary"
            >
              <FiSearch onClick={() => setOpenMobileSearch(true)} size={16} />
            </Button>
            <div className="flex gap-x-5 items-center">
              <Notifications />
              <UserNavProfile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
