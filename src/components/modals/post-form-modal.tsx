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
import { apiRoutes } from "@/utils/routes";
import { useQueryClient } from "@tanstack/react-query";
import Thumbnail from "../studio/layout/thumbnail";
import { Checkbox } from "../ui/checkbox";
import { getCookie } from "cookies-next";

type Props = {
  trigger: React.ReactNode;
  className?: string;
  isEdit?: boolean;
  triggerClassName?: string;
  defaultValue?: {
    content: string;
    thumbnail: string;
    isPublished: boolean;
    _id: string;
  };
};

const formSchema = z.object({
  content: z.string().min(1, { message: "This field has to be filled." }),
  isPublished: z.boolean().default(false),
  thumbnail: z.any(),
});
function PostFormModal({
  trigger,
  className,
  isEdit,
  defaultValue,
  triggerClassName,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? defaultValue
      : {
          content: "",
          thumbnail: "",
          isPublished: false,
        },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("content", values.content);
      values.thumbnail && formData.append("thumbnail", values.thumbnail);
      formData.append("isPublished", String(values.isPublished));
      if (isEdit) {
        await axios.patch(
          apiRoutes.posts.updatePost + defaultValue?._id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
          },
        );
      } else {
        await axios.post(apiRoutes.posts.createPost, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });
      }
      toast({
        title: `${isEdit ? "Update" : "Create"} Create Successful`,
        description: `You have successfully ${
          isEdit ? "updated" : "created"
        } a post.`,
      });
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.posts.getAllUserPosts],
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
      <DialogTrigger className={cn("block w-full", triggerClassName)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn("max-w-xl", className)}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Create"} Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="xs:col-span-2">
                    <FormControl>
                      <Textarea
                        rows={10}
                        placeholder="Write a text..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Thumbnail
                        className="aspect-auto w-full h-[200px]"
                        defaultFile={field?.value}
                        getFile={(file) => field.onChange(file)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormLabel className="text-sm cursor-pointer capitalize">
                    Publish this Post
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <FormSubmitButton
                className="rounded"
                loading={form.formState.isSubmitting}
                loadingText={isEdit ? "Updating..." : "Posting..."}
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                {isEdit ? "Update" : "Post"}
              </FormSubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default PostFormModal;
