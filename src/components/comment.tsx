import React from "react";
import { Input } from "./ui/input";
import { useUserStore } from "@/zustand/useUserStore";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { cn } from "@/lib/utils";
import { viewsFormat } from "@/utils/video";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormSubmitButton,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface CommentProps {
  comments: number;
  className?: string;
}

const CommentFormSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});
function Comment({ className, comments }: CommentProps) {
  const user = useUserStore((state) => state.user);
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      comment: "",
    },
  });
  async function onSubmit(values: z.infer<typeof CommentFormSchema>) {}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        <h4 className="font-light">{viewsFormat(comments)} Comment</h4>
        <div className="flex items-center gap-3">
          <UpTubeAvatarImage
            className="size-9"
            alt={user?.fullName + ""}
            src={user?.avatar!}
            name={user?.fullName}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Add a comment"
                    className="focus-visible:border-b-secondary/40"
                    variant={"destructive"}
                    {...field}
                    onFocus={() => setShowSubmitButton(true)}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {showSubmitButton && (
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => setShowSubmitButton(false)}
                variant={"flat"}
                className="rounded-[100vw] h-8"
              >
                Cancel
              </Button>
              <FormSubmitButton
                loading={form.formState.isSubmitting}
                loadingText="Posting..."
                className="h-8"
                variant={"destructive"}
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                Comment
              </FormSubmitButton>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}

export default Comment;
