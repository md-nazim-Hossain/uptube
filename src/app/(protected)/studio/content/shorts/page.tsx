"use client";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";
import { ContentTableColumn } from "@/components/studio/content/content-table-columns";
import { DataTable } from "@/components/table/data-table";
import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { usePaginateStore } from "@/zustand/usePaginateStore";
import React from "react";

function ShortContentPage() {
  const paginate = usePaginateStore((state) => state.paginate);
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllUserContentByType + "?type=short",
    paginate,
  );
  if (isLoading) return <DataTableSkeleton />;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Shorts..."
        columns={ContentTableColumn}
        data={data?.data || []}
        meta={data?.meta}
      />
    </div>
  );
}

export default ShortContentPage;
