"use client";

import { useLayoutStore } from "@/zustand/useLayoutStore";
import React from "react";
import { SearchBoxDesktop, SearchBoxMobile } from "./search-box";
import Logo from "./logo";
import { Button } from "../ui/button";
import { FiSearch } from "react-icons/fi";

type Props = {
  children: React.ReactNode;
};
function NavLayout({ children }: Props) {
  const [openMobileSearch, setOpenMobileSearch] = React.useState(false);
  return (
    <div className="bg-background fixed top-0 z-50 w-screen left-0">
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
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavLayout;
