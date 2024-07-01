"use client";

import React from "react";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { AxiosError } from "axios";
import axios from "@/utils/axios";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { apiRoutes } from "@/utils/routes";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  trigger: React.ReactNode;
  className?: string;
  isEdit?: boolean;
  defaultValue?: {
    name: string;
    description: string;
    _id: string;
    isPublished: boolean;
  };
};

const formSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  description: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(500),
  isPublished: z.boolean().default(false),
});
function PlaylistFormModal({
  trigger,
  className,
  isEdit,
  defaultValue,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? defaultValue
      : {
          name: "",
          description: "",
          isPublished: false,
        },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isEdit) {
        await axios.put(
          apiRoutes.playlists.updatePlaylist + defaultValue?._id,
          values,
        );
      } else {
        await axios.post(apiRoutes.playlists.createPlaylist, values);
      }
      toast({
        title: `${isEdit ? "Update" : "Create"} Successful`,
        description: `You have successfully ${
          isEdit ? "updated" : "created"
        } a playlist.`,
      });
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.playlists.getAllPlaylists],
      });
    } catch (error: AxiosError<any, any> | any) {
      toast({
        title: `${isEdit ? "Update" : "Create"} Failed`,
        description: error?.data?.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="block w-full">{trigger}</DialogTrigger>
      <DialogContent className={cn("", className)}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Create"} Playlist</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a text..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm cursor-pointer">
                    Publish this playlist
                  </FormLabel>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <FormSubmitButton
                className="rounded"
                loading={form.formState.isSubmitting}
                loadingText={isEdit ? "Updating..." : "Creating..."}
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {isEdit ? "Update" : "Create"}
              </FormSubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default PlaylistFormModal;
