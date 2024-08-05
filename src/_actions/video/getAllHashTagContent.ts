"use server";

import { IAPIResponse, IVideo } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";

export async function getAllHashTagContent(
  hashtagName: string,
  type?: "video" | "short",
) {
  try {
    const hashtagContent = (await axios
      .get(
        apiRoutes.videos.hashtag + hashtagName + (type ? `?type=${type}` : ""),
      )
      .then((res) => res.data)) as IAPIResponse<IVideo[]>;
    return (hashtagContent || {}) as IAPIResponse<IVideo[]>;
  } catch (error) {
    return {
      data: [],
      error: error,
      message: "Failed to fetch hashtag content",
      success: false,
      meta: {
        currentId: null,
        nextId: null,
        previousId: null,
        total: 0,
      },
    } as IAPIResponse<IVideo[]>;
  }
}
