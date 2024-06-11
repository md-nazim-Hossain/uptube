import React from "react";
import ChannelDetails from "../_components/channel-details";
import ChannelProfile from "../_components/channel-profile";
import { notFound, redirect } from "next/navigation";
import axios from "@/utils/axios";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { IChannelProfile } from "@/types";
async function MyChannelPage({ params }: { params: { id: string } }) {
  const id = params?.id;
  if (!id) return notFound();
  const token = getCookie("accessToken", { cookies });
  if (!token) return redirect("/");
  const user = await axios
    .get(`/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as IChannelProfile)
    .catch((e) => redirect("/"));
  if (!user) return redirect("/");
  if (user._id !== id) return redirect("/");
  return (
    <div className="space-y-5 w-full h-full">
      <ChannelProfile channel={user} />
      <ChannelDetails isMyChannel />
    </div>
  );
}

export default MyChannelPage;
