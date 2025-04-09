"use client";
import { ContentTableColumn } from "@/components/studio/content/content-table-columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import { IAPIResponse, IVideo } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";
import { usePaginateStore } from "@/zustand/usePaginateStore";

function ContentPage() {
  const paginate = usePaginateStore((state) => state.paginate);
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllUserContentByType + "?type=video",
    paginate,
  );
  if (isLoading) return <DataTableSkeleton />;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Videos..."
        columns={ContentTableColumn}
        data={data?.data || []}
        meta={data?.meta}
      />
    </div>
  );
}

export default ContentPage;
