import { INotification, IPOST, IVideo } from "@/types";

export const useNotification = (notification: INotification) => {
  let link = null;
  const { videoId, tweetId, commentId } = notification;

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

  return {
    notificatioType,
    link,
  };
};
