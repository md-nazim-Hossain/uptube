"use client";
import { VideosTableColumn } from "@/components/studio/content/videos/videos-table-columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import { IAPIResponse, IVideo } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";

function ContentPage() {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllVideosByUser,
  );
  if (isLoading) return <DataTableSkeleton />;
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

export default ContentPage;
