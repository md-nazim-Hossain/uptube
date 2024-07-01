import { VideosTableColumn } from "@/components/studio/content/videos/videos-table-columns";
import { DataTable } from "@/components/table/data-table";
import axios from "@/utils/axios";
import { getCookie } from "cookies-next";
import React from "react";
import { cookies } from "next/headers";
import { IAPIResponse, IVideo } from "@/types";
import { apiRoutes } from "@/utils/routes";

async function page() {
  const data = (await axios
    .get(apiRoutes.videos.getAllVideosByUser, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    })
    .then((res) => res.data)) as IAPIResponse<IVideo[]>;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Videos..."
        columns={VideosTableColumn}
        data={data?.data || []}
      />
    </div>
  );
}

export default page;
