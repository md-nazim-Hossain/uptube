"use server";

import { IAPIResponse, IVideo } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserWatchHistory() {
  try {
    const data = await axios
      .get(apiRoutes.users.watchHistory, {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      })
      .then((res) => res.data);
    return data as IAPIResponse<IVideo[]>;
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
        currentId: 0,
        nextId: null,
        previousId: null,
        total: 0,
        limit: 20,
        totalPage: 1,
      },
    } as IAPIResponse<IVideo[]>;
  }
}
