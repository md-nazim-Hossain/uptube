"use server";

import { IAPIResponse, IVideo } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";

export async function getAllShorts() {
  try {
    const shorts = (await axios
      .get(apiRoutes.videos.getAllShorts)
      .then((res) => res.data)) as IAPIResponse<IVideo[]>;
    return (shorts || {}) as IAPIResponse<IVideo[]>;
  } catch (error) {
    return {
      data: [],
      error: error,
      message: "Failed to fetch shorts",
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
