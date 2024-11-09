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
import { useUserStore } from "@/zustand/useUserStore";
import { useFetch } from "@/utils/reactQuery";
import { IAPIResponse, INotification } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { getCookie } from "cookies-next";
import { Skeleton } from "../ui/skeleton";
import { Typography } from "../ui/typography";
import Notification from "./notification";

function Notifications() {
  const { setUser, user, setLoading } = useUserStore((state) => state);
  const { data, isLoading } = useFetch<IAPIResponse<INotification[]>>(
    apiRoutes.notifications.getAllNotifications,
    undefined,
    {
      queryKey: [
        apiRoutes.notifications.getAllNotifications,
        { id: user?._id },
      ],
      enabled: !!getCookie("accessToken"),
    },
  );
  if (isLoading) return <Skeleton className="size-6 rounded-full" />;
  const notifications = data?.data;
  const length = notifications?.length || 0;
  console.log(notifications);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant={"icon"} className="p-0 text-secondary relative">
          {length > 0 && (
            <Badge
              variant={"destructive"}
              className={cn(
                "absolute text-white text-[10px] p-0 right-0 flex justify-center items-center size-5 top-0 z-50",
              )}
            >
              {length >= 100 ? "99+" : length}
            </Badge>
          )}
          <FiBell size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full sm:w-[500px] max-h-[70vh] scroll"
        align="end"
      >
        <Typography className="p-2">Notifications</Typography>
        <DropdownMenuSeparator />
        <div className="space-y-2">
          {notifications?.map((notification, index) => (
            <Notification key={index} {...notification} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifications;
