"use server";

import { IAPIResponse, IUserFavoriteVideo, IVideo } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserLikeVideos() {
  try {
    const data = await axios
      .get(apiRoutes.likes.getUserLikeVideos, {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      })
      .then((res) => res.data);
    return data as IAPIResponse<IUserFavoriteVideo[]>;
  } catch (error: IAPIResponse<any> | any) {
    if (error.status === 401 || error.status === 403) {
      redirect("/signin");
    }
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
    } as IAPIResponse<IUserFavoriteVideo[]>;
  }
}
