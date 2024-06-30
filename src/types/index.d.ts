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
};

export type IUserProfile = IUser & {
  likeVideos: any[];
  watchHistory: any[];
};

export type IChannelProfile = IUser & {
  totalViews: number;
  totalVideos: number;
  subscribersCount: number;
  channelSubscribedToCount: number;
  isSubscribed: boolean;
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
  title: string;
  description: string;
  videos: any[];
}
