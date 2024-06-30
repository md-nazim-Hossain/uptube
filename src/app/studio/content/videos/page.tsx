import { VideosTableColumn } from "@/components/studio/content/videos-table-columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";

function page() {
  return (
    <div className="pt-5">
      <DataTable columns={VideosTableColumn} data={[]} />
    </div>
  );
}

export default page;
