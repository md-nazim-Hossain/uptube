"use server";

import { IVideo } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";

export async function getVideoById(id: string) {
  try {
    const data = await axios
      .get(apiRoutes.videos.getVideoById + id, {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      })
      .then((res) => res.data);
    return data?.data as IVideo;
  } catch (error) {
    return null;
  }
}
