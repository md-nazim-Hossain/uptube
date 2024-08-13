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
import DeleteAlertModal from "@/components/modals/delete-alert-modal";
import { useDelete } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import PostFormModal from "@/components/modals/post-form-modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PostTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { _id, content, thumbnail, isPublished } = row.original as any;
  const { mutateAsync } = useDelete<any>(
    apiRoutes.posts.deletePost,
    apiRoutes.posts.getAllUserPosts,
    undefined,
    (oldData, id) => {
      return {
        data: oldData?.data?.filter((post: any) => post._id !== id),
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
        <PostFormModal
          isEdit
          defaultValue={{
            _id,
            content,
            thumbnail,
            isPublished,
          }}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          }
        />
        <DeleteAlertModal
          text="post"
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
