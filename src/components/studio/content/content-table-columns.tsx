"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { IVideo } from "@/types";
import { convertMillisecondsToTime, viewsFormat } from "@/utils/video";
import UpTubeImage from "@/components/uptube/uptube-image";
import { Typography } from "@/components/ui/typography";
import { ContentTableRowActions } from "./content-table-row-actions";
import { addHTTPPrefix } from "@/utils/common";
import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";

export const ContentTableColumn: ColumnDef<IVideo>[] = [
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
      const thumbnail = row?.original?.thumbnail;
      return (
        <div className="min-w-[300px] max-w-xl flex items-center gap-3">
          <div className="flex-shrink-0 w-[120px] bg-primary/5 h-[68px] relative overflow-hidden">
            {thumbnail ? (
              <UpTubeImage
                src={addHTTPPrefix(thumbnail)}
                alt={row?.original?.title}
              />
            ) : (
              <ReactPlayer
                url={addHTTPPrefix(row?.original?.videoFile)}
                width={"100%"}
                height={"100%"}
                playsinline
                style={{ objectFit: "cover" }}
              />
            )}
            <span
              className={cn(
                "absolute z-20 text-white text-xs bottom-1 right-1 rounded-sm bg-black/80 px-1 py-[1px]",
              )}
            >
              {convertMillisecondsToTime(row?.original?.duration ?? 0)}
            </span>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <Typography variant={"small"} className="text-sm">
              {row?.original?.title}
            </Typography>
            <Typography variant={"muted"} className="text-xs line-clamp-3">
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
      <DataTableColumnHeader isShown column={column} title="Visibility" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("isPublished") ? "Published" : "Draft"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader isShown column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {format(new Date(row.getValue("createdAt")), "dd MMM yyyy")}
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
      <DataTableColumnHeader isShown column={column} title="Views" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("views"))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader isShown column={column} title="Comments" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("comments"))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader isShown column={column} title="Likes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("likes"))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ContentTableRowActions row={row} />
      </div>
    ),
  },
];
