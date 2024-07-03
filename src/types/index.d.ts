export type ISideProps = {
  Icon: string;
  label: string;
  href: string;
};
export type IYoutubeVideo = {
  url: string;
  songName: string;
};

export type IAPIResponse<T = unknown> = {
  success: boolean;
  data: T | null;
  message: string;
  error: string | null;
};

// users type

export type IUser = {
  avatar: string;
  coverImage: string;
  createdAt: string;
  email: string;
  fullName: string;
  isVerified: boolean;
  _id: string;
  updatedAt: string;
  username: string;
  description: string;
  subscribersCount: number;
  isSubscribed: boolean;
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
  nextCursor: unknown;
  prevPage: unknown;
  nextPage: unknown;
  nextId?: number;
  previousId?: number;
  data: T;
  count: number;
}

export interface IPlayList {
  _id: string;
  name: string;
  description: string;
  videos: IVideo[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface IPlayList {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
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
  comments: number;
  likes: number;
  isLiked: boolean;
  playLists: IPlayList[];
  type: string;
}

export interface IUserFavoriteVideo {
  _id: string;
  video: IVideo;
  createdAt: string;
  updatedAt: string;
  likedBy: string;
}
