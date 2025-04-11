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
import { IAPIResponse, IVideo } from "@/types";
import { useDelete, usePost } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import DeleteAlertModal from "@/components/modals/delete-alert-modal";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { usePaginateStore } from "@/zustand/usePaginateStore";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ContentTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const paginate = usePaginateStore((state) => state.paginate);
  const pathname = usePathname();
  const type =
    pathname === `/studio/content/shorts` ? "?type=short" : "?type=video";
  const { _id, title, description, videoFile, thumbnail, isPublished } =
    row.original as IVideo;

  const { mutateAsync } = useDelete<any>(
    apiRoutes.videos.deleteVideo,
    [apiRoutes.videos.getAllUserContentByType + type, paginate],
    undefined,
    (oldData, id) => {
      return {
        data: oldData?.data?.filter((video: IVideo) => video._id !== id),
      };
    },
  );
  const { mutateAsync: makeACopy } = usePost<IAPIResponse<IVideo[]>, IVideo>(
    apiRoutes.videos.makeACopy + "/" + _id,
    [apiRoutes.videos.getAllUserContentByType + type, paginate],
    undefined,
    (oldData, data) => {
      return {
        data: [data, ...(oldData?.data || [])],
        error: null,
        success: true,
        message: "Video copied successfully",
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
          <HiOutlineDotsVertical className="h-4 w-4 " />
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
            type: (row.original as IVideo).type as any,
          }}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem
          onSelect={async () => {
            try {
              await makeACopy(row.original as IVideo);
              toast({
                title: "Video copied successfully",
                description: "Video copied successfully",
              });
            } catch (error: any) {
              toast({
                title: "Error copying video",
                description: error?.message || "Error copying video",
                variant: "destructive",
              });
            }
          }}
        >
          Make a copy
        </DropdownMenuItem>
        <DeleteAlertModal
          onDelete={async () => {
            try {
              await mutateAsync(_id);
              toast({
                title: "Video deleted successfully",
                description: "Video deleted successfully",
              });
            } catch (error: any) {
              toast({
                title: "Error Occured",
                description: error?.message || "Error deleting video",
                variant: "destructive",
              });
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
