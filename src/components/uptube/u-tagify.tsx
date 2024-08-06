"use cline";

import { useRouter } from "next/navigation";
import React from "react";
import { Tagify } from "react-tagify";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};
function UTagify({ text, className }: Props) {
  const router = useRouter();
  const [showMore, setShowMore] = React.useState(false);

  return (
    <Tagify
      mentionStyle={{ cursor: "pointer", color: "#154eea" }}
      tagStyle={{ cursor: "pointer", color: "#154eea" }}
      onClick={(text: string, type: "mention" | "tag") => {
        if (type === "mention") {
          const username = text.startsWith("@") ? text : "@" + text;
          router.push("/" + username);
        } else {
          router.push(`/hashtag/${text}`);
        }
      }}
    >
      <Typography
        className={cn("[&:not(:first-child)]:mt-0 leading-none", className)}
      >
        {showMore ? text : text?.slice(0, 200)}
      </Typography>
      {text?.length > 200 && (
        <Typography
          className={className}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? " Show Less" : "...more"}
        </Typography>
      )}
    </Tagify>
  );
}

export default UTagify;
