"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { format } from "date-fns";
import { IPlayList } from "@/types";
import { viewsFormat } from "@/utils/video";
import UpTubeImage from "@/components/uptube/uptube-image";
import { Typography } from "@/components/ui/typography";
import { PlaylistTableRowActions } from "./playlist-table-row-actions";
import { PiPlaylistLight } from "react-icons/pi";
import PlaylistFormModal from "@/components/modals/playlist-form-modal";
import { addHTTPPrefix } from "@/utils/common";

export const PlaylistTableColumns: ColumnDef<IPlayList>[] = [
  {
    accessorKey: "name",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Playlist" />
    ),
    cell: ({ row }) => {
      const videos = row?.original?.videos?.map((video) => video._id);
      return (
        <div className="flex items-center gap-3">
          <div className="w-[120px] h-[68px] relative overflow-hidden">
            <PlaylistFormModal
              isEdit
              defaultValue={{
                ...row?.original,
                videos,
              }}
              trigger={
                <>
                  <div className="absolute flex justify-center items-center top-0 right-0 z-10 w-1/2 h-full bg-black/70">
                    <span className="text-center text-white">
                      {row?.original?.videos?.length}
                      <PiPlaylistLight size={18} />
                    </span>
                  </div>
                  <UpTubeImage
                    src={addHTTPPrefix(row?.original?.videos?.[0]?.thumbnail)}
                    alt={row?.original?.name}
                  />
                </>
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography variant={"small"} className="text-sm">
              {row?.original?.name}
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader isShown column={column} title="Last Updated" />
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
    accessorKey: "videos",
    header: ({ column }) => (
      <DataTableColumnHeader isShown column={column} title="Videos Count" />
    ),
    cell: ({ row }) => {
      const videos = row.getValue("videos") as any[];
      return (
        <div className="flex items-center">
          {viewsFormat(videos?.length || 0)}
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
        <PlaylistTableRowActions row={row} />
      </div>
    ),
  },
];
