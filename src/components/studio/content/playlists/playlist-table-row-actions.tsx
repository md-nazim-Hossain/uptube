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
import UploadVideoModal from "@/components/modals/upload-video-modal";
import { IPlayList } from "@/types";
import PlaylistFormModal from "@/components/modals/playlist-form-modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PlaylistTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { _id, name, description, isPublished } = row.original as IPlayList;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 hover:bg-primary/10 data-[state=open]:bg-primary/10"
        >
          <HiOutlineDotsVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <PlaylistFormModal
          isEdit
          defaultValue={{
            _id,
            name,
            description,
            isPublished,
          }}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
