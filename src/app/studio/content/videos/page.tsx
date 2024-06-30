import { VideosTableColumn } from "@/components/studio/content/videos/videos-table-columns";
import { DataTable } from "@/components/table/data-table";
import axios from "@/utils/axios";
import { getCookie } from "cookies-next";
import React from "react";
import { cookies } from "next/headers";
import { IAPIResponse, IVideo } from "@/types";

async function page() {
  const data = (await axios
    .get("/videos/get-all-videos-by-user", {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    })
    .then((res) => res.data)) as IAPIResponse<IVideo[]>;
  return (
    <div>
      <DataTable
        searchField="title"
        columns={VideosTableColumn}
        data={data?.data || []}
      />
    </div>
  );
}

export default page;
