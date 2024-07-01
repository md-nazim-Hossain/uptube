"use client";
import { PlaylistTableColumns } from "@/components/studio/content/playlists/playlist-table-columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import { IAPIResponse, IPlayList } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";

function PlaylistPage() {
  const { data, isLoading } = useFetch<IAPIResponse<IPlayList[]>>(
    apiRoutes.playlists.getAllPlaylists,
  );
  if (isLoading) return <DataTableSkeleton />;
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
