export const apiRoutes = {
  videos: {
    getAllVideos: "/videos/get-all-videos",
    getVideoById: "/videos/get-video/",
    uploadVideo: "/videos/upload-video",
    getAllVideosByUser: "/videos/get-all-videos-by-user",
    updateVideo: "/videos/update-video/",
    deleteVideo: "/videos/delete-video",
    makeACopy: "/videos/make-copy",
  },
  users: {
    getCurrentUser: "/users/user",
    likeVideos: "/users/like-videos",
  },
  posts: {
    getAllUserPosts: "/tweets/get-all-user-tweets",
    createPost: "/tweets/create-tweet",
    updatePost: "/tweets/update-tweet/",
    deletePost: "/tweets/delete-tweet",
  },
  comments: {
    createComment: "/comments/create-comment",
    updateComment: "/comments/update-comment/",
    deleteComment: "/comments/delete-comment",
  },
  playlists: {
    getAllPlaylists: "/playlists/get-all-playlists",
    getPlaylistById: "/playlists",
    createPlaylist: "/playlists/create-playlist",
    updatePlaylist: "/playlists/update-playlist/",
    deletePlaylist: "/playlists/delete-playlist",
  },
};

export type IRoutesKeys = (typeof apiRoutes)[keyof typeof apiRoutes];
