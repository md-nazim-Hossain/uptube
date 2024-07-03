import React from "react";
import FullViewVideo from "./_components/full-view-video";
import { redirect } from "next/navigation";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { IVideo } from "@/types";

async function page({ searchParams: { v } }: { searchParams: { v: string } }) {
  if (!v) redirect("/");
  const data = await axios
    .get(apiRoutes.videos.getVideoById + v)
    .then((res) => {
      return res?.data?.data as IVideo;
    })
    .catch((e) => {
      redirect("/");
    });
  if (!data) redirect("/");
  return (
    <div>
      <FullViewVideo video={data} />
    </div>
  );
}

export default page;
