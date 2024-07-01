import { PostTableColumns } from "@/components/studio/content/posts/post-table-columns";
import { DataTable } from "@/components/table/data-table";
import { getCookie } from "cookies-next";
import React from "react";
import { cookies } from "next/headers";
import axios from "@/utils/axios";
import { IAPIResponse } from "@/types";

async function PostsPage() {
  const data = (await axios
    .get("/tweets/get-all-user-tweets", {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    })
    .then((res) => res.data)) as IAPIResponse<any[]>;
  return (
    <div>
      <DataTable
        searchPlaceholder="Search Posts..."
        columns={PostTableColumns}
        data={data?.data || []}
      />
    </div>
  );
}

export default PostsPage;
