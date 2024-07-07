export const apiRoutes = {
  videos: {
    getAllContentByType: "/videos/get-all-content-by-type",
    getVideoById: "/videos/get-video/",
    uploadVideo: "/videos/upload-video",
    getAllUserContentByType: "/videos/get-all-user-content-by-type",
    updateVideo: "/videos/update-video/",
    deleteVideo: "/videos/delete-video",
    makeACopy: "/videos/make-copy",
    getVideoByUserId: "/videos/get-video-by-user-id",
  },
  users: {
    register: "/users/register",
    verifyAccount: "/users/verify-user",
    getCurrentUser: "/users/user",
    resetPassword: "/users/reset-password",
    forgotPassword: "/users/forgot-password",
    login: "/users/login",
    logout: "/users/logout",
    getUser: "/users/user",
    getAllChannelFollower: "/users/get-all-channel-subscriber",
  },
  posts: {
    getAllUserPosts: "/tweets/get-all-user-tweets",
    createPost: "/tweets/create-tweet",
    updatePost: "/tweets/update-tweet/",
    deletePost: "/tweets/delete-tweet",
  },
  comments: {
    createComment: "/comments/create-comment",
    updateComment: "/comments/update-comment",
    deleteComment: "/comments/delete-comment",
  },
  playlists: {
    getAllPlaylists: "/playlists/get-all-playlists",
    getPlaylistById: "/playlists",
    getPlaylistByUserId: "/playlists/get-all-playlist-by-user-id",
    createPlaylist: "/playlists/create-playlist",
    updatePlaylist: "/playlists/update-playlist/",
    deletePlaylist: "/playlists/delete-playlist",
  },
  likes: {
    getUserLikeVideos: "/likes/get-user-like-videos",
    likeDislike: "/likes/like-dislike",
  },
  follows: {
    createFollowAndUnfollow: "/subscriptions/create-subscribe-and-unsubscribe",
    getAllFollowingChannel: "/subscriptions/get-all-subscribed-channel",
  },
};

export type IRoutesKeys = (typeof apiRoutes)[keyof typeof apiRoutes];
