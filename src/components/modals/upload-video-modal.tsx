"use client";
import React from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import Thumbnail from "../studio/layout/thumbnail";
import axios from "@/utils/axios";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { IAPIResponse } from "@/types";
import { apiRoutes } from "@/utils/routes";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import UploadContent from "../studio/layout/upload-content";

type Props = {
  trigger: React.ReactNode;
  className?: string;
  isEdit?: boolean;
  defaultValue?: {
    _id: string;
    title: string;
    description: string;
    videoFiles: string;
    thumbnail: string;
    isPublished: boolean;
  };
};

const formSchema = z.object({
  title: z.string().min(1, { message: "This field has to be filled." }),
  description: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(500),
  videoFiles: z
    .any()
    .refine((file) => file, { message: "This field is required." }),
  thumbnail: z
    .any()
    .refine((file) => file, { message: "This field is required." }),
  isPublished: z.boolean(),
});

function UploadVideoModal({ trigger, className, defaultValue, isEdit }: Props) {
  const pathname = usePathname();
  const isShort = pathname === "/studio/content/shorts";
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? defaultValue
      : {
          title: "",
          description: "",
          isPublished: false,
          videoFiles: "",
          thumbnail: "",
        },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("isPublished", String(values.isPublished));
      formData.append("thumbnail", values.thumbnail);
      if (isShort && !isEdit) {
        formData.append("type", "short");
      }
      if (isEdit) {
        await axios.put(
          `${apiRoutes.videos.updateVideo}${defaultValue?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        formData.append("videoFiles", values.videoFiles);
        await axios.post(apiRoutes.videos.uploadVideo, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      toast({
        title: `${isEdit ? "Update" : "Upload"} Successful`,
        description: `You have successfully ${
          isEdit ? "updated" : "uploaded"
        } a video.`,
      });
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [
          apiRoutes.videos.getAllUserContentByType +
            (isShort ? "?type=short" : "?type=video"),
        ],
      });
    } catch (error: AxiosError<IAPIResponse<any>> | any) {
      toast({
        title: "Upload Failed",
        description: error?.data?.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="block w-full">{trigger}</DialogTrigger>
      <DialogContent
        className={cn("max-h-[90vh] overflow-y-auto scroll", className)}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Upload"} Video</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Title" {...field} />
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
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Thumbnail</FormLabel>
                    <FormControl>
                      <Thumbnail
                        defaultFile={field?.value}
                        getFile={(file) => field.onChange(file)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoFiles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Video</FormLabel>
                    <FormControl>
                      <UploadContent
                        defaultFile={field?.value}
                        isEdit={isEdit}
                        getFile={(file) => {
                          field.onChange(file);
                          form.setValue("title", file?.name || "");
                        }}
                        thumbnail={form.getValues().thumbnail}
                        onDelete={() => {
                          !isEdit && field.onChange(null);
                        }}
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
                  <FormLabel className="text-sm cursor-pointer">
                    Publish this video
                  </FormLabel>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <FormSubmitButton
                className="rounded"
                loading={form.formState.isSubmitting}
                loadingText={isEdit ? "Updating..." : "Uploading..."}
                disabled={
                  form.formState.isSubmitting ||
                  (!isEdit && !form.formState.isValid) ||
                  !form.formState.isDirty
                }
              >
                {isEdit ? "Update" : "Upload"}
              </FormSubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadVideoModal;
