"use client";

import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { useUserStore } from "@/zustand/useUserStore";
import { useAuthStore } from "@/zustand/useAuthStore";
import { cn } from "@/lib/utils";
import DeleteAlertModal from "../modals/delete-alert-modal";
import { apiRoutes } from "@/utils/routes";
import { usePost } from "@/utils/reactQuery";
import { useQueryClient } from "@tanstack/react-query";
import { VariantProps } from "class-variance-authority";

type Props = {
  revalidateQueryKey: string;
  className?: string;
  channelId: string;
  isFollow: boolean;
  channelName: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
};
function FollowUnfollow({
  revalidateQueryKey,
  className,
  channelId,
  isFollow,
  channelName,
  variant = "outline",
}: Props) {
  const queryClient = useQueryClient();
  const [follow, setFollow] = React.useState(isFollow);
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const { mutateAsync: mutateFollowUnfollow } = usePost<any, any>(
    apiRoutes.follows.createFollowAndUnfollow,
  );

  const handleFollowUnfollow = async () => {
    const prevFollow = follow;
    try {
      setFollow(!follow);
      await mutateFollowUnfollow({
        channelId,
        state: follow ? "unsubscribe" : "subscribe",
      });
      queryClient.invalidateQueries({
        queryKey: [revalidateQueryKey, undefined],
      });
    } catch (error) {
      setFollow(prevFollow);
    }
  };

  if (follow) {
    return (
      <div>
        <DeleteAlertModal
          trigger={
            <Button
              variant={variant}
              className={cn("bg-destructive !text-white h-7", className)}
            >
              Unfollow
            </Button>
          }
          onDelete={handleFollowUnfollow}
          text={channelName}
          isFollow
        />
      </div>
    );
  }
  return (
    <Button
      onClick={() => (user ? handleFollowUnfollow() : setOpen(true))}
      variant={variant}
      className={cn("text-destructive h-7", className)}
    >
      Follow
    </Button>
  );
}

export default FollowUnfollow;
