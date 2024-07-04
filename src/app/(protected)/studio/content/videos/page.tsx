"use client";
import { ContentTableColumn } from "@/components/studio/content/content-table-columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import { IAPIResponse, IVideo } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";

function ContentPage() {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllUserContentByType + "?type=video",
  );
  if (isLoading) return <DataTableSkeleton />;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Videos..."
        columns={ContentTableColumn}
        data={data?.data || []}
      />
    </div>
  );
}

export default ContentPage;
