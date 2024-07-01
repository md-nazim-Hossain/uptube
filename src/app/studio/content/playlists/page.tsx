import { PlaylistTableColumns } from "@/components/studio/content/playlists/playlist-table-columns";
import { DataTable } from "@/components/table/data-table";
import { getCookie } from "cookies-next";
import React from "react";
import { cookies } from "next/headers";
import axios from "@/utils/axios";
import { IAPIResponse, IPlayList } from "@/types";
import { apiRoutes } from "@/utils/routes";

async function PlaylistPage() {
  const data = (await axios
    .get(apiRoutes.playlists.getAllPlaylists, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    })
    .then((res) => res.data)) as IAPIResponse<IPlayList[]>;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Playlists..."
        columns={PlaylistTableColumns}
        data={data?.data || []}
      />
    </div>
  );
}

export default PlaylistPage;
