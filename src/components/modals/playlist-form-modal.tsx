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
import { Button } from "../ui/button";
import SelectMultipleVideoModal from "./select-multiple-video-modal";
import Image from "next/image";
import { Typography } from "../ui/typography";

type Props = {
  trigger: React.ReactNode;
  className?: string;
  isEdit?: boolean;
  defaultValue?: {
    name: string;
    description: string;
    _id: string;
    isPublished: boolean;
    videos: string[];
  };
};

const formSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  description: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(500),
  isPublished: z.boolean().default(false),
  videos: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
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
          videos: [],
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
            <div className="flex justify-between items-center gap-5">
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

              <div className="flex-1 flex justify-end flex-col items-end">
                <SelectMultipleVideoModal
                  name="videos"
                  trigger={
                    form.getValues("videos")?.length > 0 ? (
                      <div className="border h-10 w-max flex items-center justify-between gap-5 px-3">
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/assets/images/icons/videos.svg"}
                            alt={"video"}
                            width={24}
                            height={20}
                          />
                          <Typography variant={"muted"}>
                            {form.watch("videos").length} Videos
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <Button
                        className="rounded w-max"
                        variant={"flat"}
                        type="button"
                      >
                        Add Videos
                      </Button>
                    )
                  }
                />
                {form.formState.errors.videos && (
                  <Typography variant={"muted"} className="text-red-500">
                    {form.formState.errors.videos.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <FormSubmitButton
                className="rounded"
                loading={form.formState.isSubmitting}
                loadingText={isEdit ? "Updating..." : "Creating..."}
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
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
