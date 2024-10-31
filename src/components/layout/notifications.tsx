import React from "react";
import { Button } from "../ui/button";
import { FiBell } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

function Notifications() {
  const notifications = 100;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant={"icon"} className="p-0 text-secondary relative">
          {notifications > 0 && (
            <Badge
              variant={"destructive"}
              className={cn(
                "absolute text-white text-[10px] p-0 right-0 flex justify-center items-center size-5 top-0 z-50",
              )}
            >
              {notifications >= 100 ? "99+" : notifications}
            </Badge>
          )}
          <FiBell size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px]" align="end">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-default flex items-center gap-3 focus:bg-transparent"
        ></DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifications;
