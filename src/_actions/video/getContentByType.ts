"use server";

import { IAPIResponse, IVideo } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";

export async function getContentByType(type?: string) {
  try {
    const data = await axios
      .get(apiRoutes.videos.getAllContentByType + (type ? type : ""), {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      })
      .then((res) => res.data);
    return data as IAPIResponse<IVideo[]>;
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
