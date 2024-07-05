import React from "react";
import { Input } from "../ui/input";
import { useUserStore } from "@/zustand/useUserStore";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { cn } from "@/lib/utils";
import { viewsFormat } from "@/utils/video";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormSubmitButton,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { addHTTPPrefix } from "@/utils/common";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

interface CommentInputProps {
  totalComments?: number;
  className?: string;
  contentId: string;
  avatarClassName?: string;
  isReply?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
  isEdit?: boolean;
  defaultValue?: {
    comment: string;
    _id: string;
  };
}

const CommentFormSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});
function CommentInput({
  className,
  totalComments,
  contentId,
  avatarClassName,
  isReply = false,
  onSuccess,
  onClose,
  defaultValue,
  isEdit,
}: CommentInputProps) {
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const queryClient = useQueryClient();
  const [showSubmitButton, setShowSubmitButton] = React.useState(
    isReply || isEdit,
  );
  const form = useForm({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      comment: isEdit ? (defaultValue?.comment as string) : "",
    },
  });
  async function onSubmit(values: z.infer<typeof CommentFormSchema>) {
    try {
      if (isEdit) {
        await axios.put(
          apiRoutes.comments.updateComment + "/" + defaultValue?._id,
          {
            content: values.comment,
          },
        );
      } else {
        await axios.post(apiRoutes.comments.createComment, {
          videoId: contentId,
          content: values.comment,
        });
      }
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.videos.getVideoById + contentId, undefined],
      });
      setShowSubmitButton(false);
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        {!isReply && !isEdit && (
          <h4 className="font-medium">
            {viewsFormat(totalComments ?? 0)} Comment
          </h4>
        )}
        <div className="flex items-center gap-3">
          {user ? (
            <UpTubeAvatarImage
              className={cn("size-9", avatarClassName)}
              alt={user?.fullName + ""}
              src={addHTTPPrefix(user?.avatar!)}
              name={user?.fullName}
            />
          ) : (
            <FaUserCircle className={cn("size-9", avatarClassName)} />
          )}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder={`Add a ${isReply ? "reply" : "comment"}...`}
                    className="focus-visible:border-b-secondary/40"
                    variant={"destructive"}
                    {...field}
                    onFocus={() =>
                      user ? setShowSubmitButton(true) : setOpen(true)
                    }
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
                onClick={() => {
                  setShowSubmitButton(false);
                  onClose && onClose();
                }}
                variant={"flat"}
                className="rounded-[100vw] h-8"
              >
                Cancel
              </Button>
              <FormSubmitButton
                loading={form.formState.isSubmitting}
                loadingText={isEdit ? "Saving..." : "Posting..."}
                className="h-8"
                variant={"destructive"}
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                {isEdit ? "Save" : "Comment"}
              </FormSubmitButton>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}

export default CommentInput;
