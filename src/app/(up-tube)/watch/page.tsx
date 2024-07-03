import React from "react";
import FullViewVideo from "./_components/full-view-video";
import { redirect } from "next/navigation";
import { apiRoutes } from "@/utils/routes";
import { IVideo } from "@/types";

async function page({ searchParams: { v } }: { searchParams: { v: string } }) {
  if (!v) redirect("/");
  const data = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + apiRoutes.videos.getVideoById + v,
    {
      cache: "no-store",
      next: {
        tags: [v],
      },
    },
  )
    .then((res) => res.json())
    .then((res) => res.data as IVideo)
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
