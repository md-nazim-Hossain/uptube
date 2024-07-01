"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type Props = {
  trigger: React.ReactNode;
  onDelete: () => void;
  text?: string;
};
function DeleteAlertModal({ trigger, onDelete, text }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {text} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={cn(
              buttonVariants({
                variant: "default",
                className:
                  "rounded hover:bg-primary/90 hover:text-primary-foreground border-none",
              }),
            )}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded bg-red-500 text-white hover:bg-red-600"
            onClick={onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlertModal;
