"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IPlayList } from "@/types";
import PlaylistFormModal from "@/components/modals/playlist-form-modal";
import { apiRoutes } from "@/utils/routes";
import { useDelete } from "@/utils/reactQuery";
import DeleteAlertModal from "@/components/modals/delete-alert-modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PlaylistTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { _id, owner } = row.original as IPlayList;
  const { mutateAsync } = useDelete<any>(
    apiRoutes.playlists.deletePlaylist,
    [apiRoutes.playlists.getPlaylistByUserId, { id: owner?._id }],
    undefined,
    (oldData, id) => {
      return {
        data: oldData?.data?.filter((playlist: any) => playlist._id !== id),
      };
    },
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 bg-transparent dark:bg-primary/10 hover:dark:bg-primary/10 hover:bg-transparent data-[state=open]:dark:bg-primary/10"
        >
          <HiOutlineDotsVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <PlaylistFormModal
          isEdit
          defaultValue={{
            ...(row?.original as IPlayList),
            videos: (row?.original as IPlayList)?.videos?.map(
              (video) => video._id,
            ),
          }}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          }
        />
        <DeleteAlertModal
          onDelete={async () => {
            try {
              await mutateAsync(_id);
            } catch (error) {}
          }}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
