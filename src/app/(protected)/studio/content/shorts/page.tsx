"use client";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";
import { ContentTableColumn } from "@/components/studio/content/content-table-columns";
import { DataTable } from "@/components/table/data-table";
import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";

function ShortContentPage() {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllUserContentByType + "?type=short",
  );
  if (isLoading) return <DataTableSkeleton />;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Shorts..."
        columns={ContentTableColumn}
        data={data?.data || []}
      />
    </div>
  );
}

export default ShortContentPage;
