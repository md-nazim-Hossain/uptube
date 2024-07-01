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
import { IVideo } from "@/types";
import { useDelete } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import DeleteAlertModal from "@/components/modals/delete-alert-modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { _id, title, description, videoFile, thumbnail, isPublished } =
    row.original as IVideo;

  const { mutateAsync } = useDelete<any>(
    apiRoutes.videos.deleteVideo,
    apiRoutes.videos.getAllVideosByUser,
    undefined,
    (oldData, id) => {
      return {
        data: oldData?.data?.filter((video: IVideo) => video._id !== id),
      };
    },
  );
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
        <UploadVideoModal
          isEdit
          defaultValue={{
            _id,
            title,
            description,
            thumbnail,
            videoFiles: videoFile,
            isPublished,
          }}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DeleteAlertModal
          onDelete={() => {
            try {
              mutateAsync(_id);
            } catch (error) {
              console.log(error);
            }
          }}
          text={`${title} video`}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
