"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { IVideo } from "@/types";
import { viewsFormat } from "@/utils/video";
import UpTubeImage from "@/components/uptube/uptube-image";
import { Typography } from "@/components/ui/typography";
import { DataTableRowActions } from "./data-table-row-actions";

export const VideosTableColumn: ColumnDef<IVideo>[] = [
  {
    id: "select",
    header: ({ table, column }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Video" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="w-[120px] h-[68px] relative overflow-hidden">
            <UpTubeImage
              src={row?.original?.thumbnail}
              alt={row?.original?.title}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography variant={"small"} className="text-sm">
              {row?.original?.title}
            </Typography>
            <Typography variant={"muted"} className="text-xs">
              {row?.original?.description}
            </Typography>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "",
    cell: () => <div className="w-0 p-0"></div>,
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visibility" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("isPublished") ? "Public" : "Private"}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader isShown column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {format(new Date(row.getValue("updatedAt")), "dd MMM yyyy")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("views"))}
        </div>
      );
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comments" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("comments"))}
        </div>
      );
    },
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("likes"))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];
