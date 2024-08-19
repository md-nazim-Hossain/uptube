"use server";

import { IChannelProfile } from "@/types";
import axios from "@/utils/axios";
import { cookies } from "next/headers";

export async function getChannelByUserName(username: string) {
  try {
    const data = await axios
      .get(`/users/${username}/channel-profile`, {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      })
      .then((res) => res.data);
    return data?.data as IChannelProfile;
  } catch (error) {
    console.log(error);
    return null;
  }
}
