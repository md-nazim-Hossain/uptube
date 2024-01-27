import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  src?: string;
}
function Comment({ className, src, ...props }: CommentProps) {
  return (
    <div {...props} className="flex flex-col gap-4">
      <h4 className="font-light">Comment</h4>
      <div className="flex items-center gap-3">
        <Avatar className={"w-9 aspect-square"}>
          <AvatarImage
            src={src ?? "https://github.com/shadcn.png"}
            alt={"Shadcn"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Add a comment"
          className="focus-visible:border-b-secondary/40"
          variant={"destructive"}
        />
      </div>
    </div>
  );
}

export default Comment;
