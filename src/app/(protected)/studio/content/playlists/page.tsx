"use client";
import { PlaylistTableColumns } from "@/components/studio/content/playlists/playlist-table-columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import { IAPIResponse, IPlayList } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";
import { useUserStore } from "@/zustand/useUserStore";
import { usePaginateStore } from "@/zustand/usePaginateStore";

function PlaylistPage() {
  const { user } = useUserStore();
  const paginate = usePaginateStore((state) => state.paginate);

  const { data, isLoading } = useFetch<IAPIResponse<IPlayList[]>>(
    `${apiRoutes.playlists.getPlaylistByUserId}/${user?._id}`,
    paginate,
    {
      queryKey: [
        `${apiRoutes.playlists.getPlaylistByUserId}/${user?._id}`,
        paginate,
      ],
      enabled: !!user,
    },
  );
  if (isLoading) return <DataTableSkeleton />;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Playlists..."
        columns={PlaylistTableColumns}
        data={data?.data || []}
        meta={data?.meta}
      />
    </div>
  );
}

export default PlaylistPage;
