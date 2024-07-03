export const apiRoutes = {
  videos: {
    getAllContentByType: "/videos/get-all-content-by-type",
    getVideoById: "/videos/get-video/",
    uploadVideo: "/videos/upload-video",
    getAllUserContentByType: "/videos/get-all-user-content-by-type",
    updateVideo: "/videos/update-video/",
    deleteVideo: "/videos/delete-video",
    makeACopy: "/videos/make-copy",
  },
  users: {
    getCurrentUser: "/users/user",
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
    createPlaylist: "/playlists/create-playlist",
    updatePlaylist: "/playlists/update-playlist/",
    deletePlaylist: "/playlists/delete-playlist",
  },
  likes: {
    getUserLikeVideos: "/likes/get-user-like-videos",
    createLike: "/likes/like",
    deleteLike: "/likes/dislike",
  },
};

export type IRoutesKeys = (typeof apiRoutes)[keyof typeof apiRoutes];
