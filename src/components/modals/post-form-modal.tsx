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
  FormMessage,
  FormSubmitButton,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { AxiosError } from "axios";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  trigger: React.ReactNode;
  className?: string;
  isEdit?: boolean;
  triggerClassName?: string;
  defaultValue?: {
    content: string;
    _id: string;
  };
};

const formSchema = z.object({
  content: z.string().min(1, { message: "This field has to be filled." }),
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
        },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isEdit) {
        await axios.put(apiRoutes.posts.updatePost + defaultValue?._id, values);
      } else {
        await axios.post(apiRoutes.posts.createPost, values);
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
      <DialogContent className={cn("", className)}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Create"} Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
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
