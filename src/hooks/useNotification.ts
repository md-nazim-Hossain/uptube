import { INotification, IPOST, IVideo } from "@/types";
import { useDelete, useUpdateWithPut } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useUserStore } from "@/zustand/useUserStore";

export const useNotification = (notification: INotification) => {
  let link = null;
  const { videoId, tweetId, commentId } = notification;
  const { user } = useUserStore((state) => state);

  if (videoId) {
    link =
      videoId?.type === "video"
        ? `/watch?v=${videoId?._id}`
        : `/shorts/${videoId?._id}`;
  } else if (tweetId) {
    link = `/post/${tweetId?._id}`;
  } else if (commentId) {
    link = commentId?.tweet
      ? `/post/${(commentId?.tweet as IPOST)?._id}`
      : (commentId?.video as IVideo)?.type === "video"
      ? `/watch?v=${(commentId?.video as IVideo)?._id}`
      : `/shorts/${(commentId?.video as IVideo)?._id}`;
  }
  const notificatioType = () => {
    switch (notification.type) {
      case "like":
        return "liked";
      case "unlike":
        return "unliked";
      case "comment":
        return "commented";
      case "subscribe":
        return "subscribed";
      case "tweet":
        return "posted";
      case "upload":
        return "uploaded";
      case "unsubscribe":
        return "unsubscribed";
      case "reply":
        return "replied";
    }
  };

  const { mutateAsync: deleteNotification, isPending: isDeletePending } =
    useDelete<any>(
      apiRoutes.notifications.deleteNotification,
      [apiRoutes.notifications.getAllNotifications, { id: user?._id }],
      undefined,
      (oldData, id) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: {
            notifications: oldData?.data?.notifications?.filter(
              (notification: INotification) => notification._id !== id,
            ),
            totalUnread:
              oldData?.data?.totalUnread - (notification.isRead ? 0 : 1),
          },
        };
      },
    );

  const { mutateAsync: readNotification, isPending: isReadPending } =
    useUpdateWithPut<any, any>(
      `${apiRoutes.notifications.readNotification}/${notification._id}`,
      [apiRoutes.notifications.getAllNotifications, { id: user?._id }],
      undefined,
      (oldData, data: { id: string }) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: {
            notifications: oldData?.data?.notifications?.map(
              (notification: INotification) => {
                if (notification._id === data.id) {
                  return {
                    ...notification,
                    isRead: true,
                  };
                }
                return notification;
              },
            ),
            totalUnread: oldData?.data?.totalUnread - 1,
          },
        };
      },
    );
  const { mutateAsync: hideNotification, isPending: isHidePending } =
    useUpdateWithPut<any, any>(
      `${apiRoutes.notifications.hideNotification}/${notification._id}`,
      [apiRoutes.notifications.getAllNotifications, { id: user?._id }],
      undefined,
      (oldData, data: { id: string }) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: {
            notifications: oldData?.data?.notifications?.map(
              (notification: INotification) => {
                if (notification._id === data.id) {
                  return {
                    ...notification,
                    isHide: true,
                  };
                }
                return notification;
              },
            ),
            totalUnread: oldData?.data?.totalUnread,
          },
        };
      },
    );

  return {
    notificatioType,
    link,
    deleteNotification,
    isDeletePending,
    readNotification,
    isReadPending,
    hideNotification,
    isHidePending,
  };
};
