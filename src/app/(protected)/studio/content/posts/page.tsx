"use client";
import { PostTableColumns } from "@/components/studio/content/posts/post-table-columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import { IAPIResponse } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { useFetch } from "@/utils/reactQuery";
import DataTableSkeleton from "@/components/skeletons/data-table-skeleton";
import { usePaginateStore } from "@/zustand/usePaginateStore";

function PostsPage() {
  const paginate = usePaginateStore((state) => state.paginate);
  const { data, isLoading } = useFetch<IAPIResponse<any[]>>(
    apiRoutes.posts.getAllUserPosts,
    paginate,
  );
  if (isLoading) return <DataTableSkeleton />;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Posts..."
        columns={PostTableColumns}
        data={data?.data || []}
        meta={data?.meta}
      />
    </div>
  );
}

export default PostsPage;
