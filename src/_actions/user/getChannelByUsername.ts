"use server";

import { IChannelProfile } from "@/types";
import axios from "@/utils/axios";

export async function getChannelByUserName(username: string) {
  try {
    const data = await axios
      .get(`/users/${username}/channel-profile`)
      .then((res) => res.data);
    return data?.data as IChannelProfile;
  } catch (error) {
    console.log(error);
    return null;
  }
}
