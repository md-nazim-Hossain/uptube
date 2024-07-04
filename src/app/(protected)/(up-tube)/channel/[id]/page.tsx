import React from "react";
import { notFound, redirect } from "next/navigation";
import axios from "@/utils/axios";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { IChannelProfile } from "@/types";
import ChannelProfile from "@/components/channel/channel-profile";
import ChannelDetails from "@/components/channel/channel-details";
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
    .then((res) => res.data.data as IChannelProfile)
    .catch((e) => redirect("/"));
  if (!user) return redirect("/");
  if (user._id !== id) return redirect("/");
  return (
    <div className="space-y-5 w-full h-full">
      <ChannelProfile channel={user} />
      <ChannelDetails channel={user} />
    </div>
  );
}

export default MyChannelPage;
