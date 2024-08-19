import React from "react";
import { Input } from "../ui/input";
import { useUserStore } from "@/zustand/useUserStore";
import UpTubeAvatarImage from "../uptube/uptube-avatar-image";
import { cn } from "@/lib/utils";
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
  className?: string;
  contentId: string;
  avatarClassName?: string;
  isReplay?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
  isEdit?: boolean;
  defaultValue?: {
    comment: string;
    _id: string;
  };
  inputClassName?: string;
  isTweet?: boolean;
}

const CommentFormSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});
function CommentInput({
  className,
  contentId,
  avatarClassName,
  isReplay = false,
  onSuccess,
  onClose,
  defaultValue,
  isEdit,
  inputClassName,
  isTweet = false,
}: CommentInputProps) {
  const user = useUserStore((state) => state.user);
  const setOpen = useAuthStore((state) => state.setOpen);
  const queryClient = useQueryClient();
  const [showSubmitButton, setShowSubmitButton] = React.useState(
    isReplay || isEdit,
  );
  const form = useForm({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      comment: isEdit ? (defaultValue?.comment as string) : "",
    },
  });
  async function handleSubmit(values: z.infer<typeof CommentFormSchema>) {
    try {
      if (isEdit) {
        await axios.put(
          apiRoutes.comments.updateComment + "/" + defaultValue?._id,
          {
            content: values.comment,
          },
        );
      } else {
        const newComment: any = {
          [isTweet ? "tweetId" : "videoId"]: contentId,
          content: values.comment,
        };
        if (isReplay) {
          newComment.commentId = defaultValue!._id;
          newComment.isReplay = true;
        }
        await axios.post(apiRoutes.comments.createComment, newComment);
      }
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.comments.getAllCommentByContentId + contentId],
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
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
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
                    placeholder={`Add a ${isReplay ? "reply" : "comment"}...`}
                    className={cn(
                      "focus-visible:border-b-secondary/40",
                      inputClassName,
                    )}
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

        <div
          className={cn(
            "flex justify-between items-center",
            showSubmitButton
              ? "opacity-100 visible h-8"
              : "opacity-0 invisible h-0",
          )}
        >
          <div></div>
          <div className="flex gap-2 items-center">
            <Button
              type="button"
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
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {isEdit ? "Save" : "Comment"}
            </FormSubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CommentInput;
