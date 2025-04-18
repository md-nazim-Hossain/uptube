export type ISideProps = {
  Icon?: string;
  label: string;
  href: string;
};
export type IYoutubeVideo = {
  url: string;
  songName: string;
};

export type IPaginationMeta = {
  previousId: number | null;
  nextId: number | null;
  currentId: number;
  total: number;
  totalPage: number;
  limit: number;
};

export type IAPIResponse<T = unknown> = {
  success: boolean;
  data: T | null;
  message: string;
  error: string | null;
  meta?: IPaginationMeta;
};

// users type

export type IUser = {
  avatar: string;
  coverImage: string;
  createdAt: string;
  email: string;
  fullName: string;
  country: string;
  isVerified: boolean;
  _id: string;
  updatedAt: string;
  username: string;
  description: string;
  subscribersCount: number;
  isSubscribed: boolean;
  watchHistory: IVideo[] | string[];
};

export type IUserProfile = IUser & {
  likeVideos: any[];
  watchHistory: any[];
};

export type IChannelProfile = IUser & {
  totalViews: number;
  totalVideos: number;
  channelSubscribedToCount: number;
};

export interface GetInfinitePagesInterface<T> {
  meta: {
    nextId: number | null;
    previousId: number | null;
    currentId: number | null;
    total: number;
  };
  data: T;
}

export interface IPlayList {
  _id: string;
  name: string;
  description: string;
  videos: IVideo[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  owner: IUser;
}

export interface IComment {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: IUser;
  video?: string | IVideo;
  tweet?: string | IPOST;
  isEdited: boolean;
  lastEditedAt: string;
  likes: string[];
  parentComment: null | string;
  replies: IComment[];
}

export interface IVideo {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: IUser;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
  playLists: IPlayList[];
  type: string;
  subscribersCount: number;
}

export interface IPOST {
  _id: string;
  content: string;
  thumbnail: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author: IUser;
  likes: number;
  isLiked: boolean;
  comments: number;
}

export interface IUserFavoriteVideo {
  _id: string;
  video: IVideo;
  createdAt: string;
  updatedAt: string;
  likedBy: string;
}

interface IBaseOfFollower {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface IFollower extends IBaseOfFollower {
  channel: string;
  subscriber: IUser;
}

export interface IFollowing extends IBaseOfFollower {
  channel: IUser;
  subscriber: string;
}

export interface IEditBrandingField {
  name: string;
  label: string;
  description: string;
  recommendedText: string;
  handleChange: (File: File | null) => any;
  avatar: File | null;
  coverImage: File | null;
}
export interface IChannelAnalytics {
  _id: string;
  subscribers: number;
  totalViews: number;
  topVideo: IVideo & { comments: number };
  totalLikes: number;
  totalComments: number;
}

export enum EnumNotificationType {
  LIKE = "like",
  UNLIKE = "unlike",
  COMMENT = "comment",
  SUBSCRIBE = "subscribe",
  TWEET = "tweet",
  UPLOAD = "upload",
  UNSUBSCRIBE = "unsubscribe",
  REPLY = "reply",
}
export interface INotification {
  _id: string;
  receipnt: string;
  sender: Pick<IUser, "fullName" | "avatar" | "_id" | "username">;
  videoId: Pick<IVideo, "_id" | "title" | "thumbnail" | "type"> | null;
  tweetId: Pick<IPOST, "_id" | "content" | "thumbnail"> | null;
  commentId: Pick<IComment, "_id" | "content" | "tweet" | "video"> | null;
  type: EnumNotificationType;
  message: string;
  createdAt: string;
  updatedAt: string;
  isHide: boolean;
  isRead: boolean;
}

export interface IInfiniteScrollAPIResponse<T> {
  pageParams: number[];
  pages: Array<IAPIResponse<T>>;
}

export type QueryKeyT = [string, object | undefined];
