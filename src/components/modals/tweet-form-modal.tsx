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

type Props = {
  trigger: React.ReactNode;
  className?: string;
  isEdit?: boolean;
  defaultValue?: {
    content: string;
  };
};

const formSchema = z.object({
  content: z.string().min(1, { message: "This field has to be filled." }),
});
function TweetFormModal({ trigger, className, isEdit, defaultValue }: Props) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
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
        await axios.put("/tweets/update-tweet", values);
        toast({
          title: "Update Successful",
          description: "You have successfully updated a tweet.",
        });
      } else {
        await axios.post("/tweets/create-tweet", values);
        toast({
          title: "Create Successful",
          description: "You have successfully created a tweet.",
        });
      }

      form.reset();
      setOpen(false);
    } catch (error: AxiosError<any, any> | any) {
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
                    <Textarea placeholder="Write a text..." {...field} />
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
                  form.formState.isSubmitting || !form.formState.isValid
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

export default TweetFormModal;
