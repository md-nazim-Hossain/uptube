"use cline";

import React, { Fragment } from "react";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  text: string;
  className?: string;
  isShort?: boolean;
};
function UTagify({ text, className, isShort = false }: Props) {
  const [showMore, setShowMore] = React.useState(false);
  const sliceText = showMore ? text : text?.slice(0, 200);
  return (
    <>
      <Typography
        className={cn("[&:not(:first-child)]:mt-0 leading-none", className)}
      >
        {sliceText?.split(" ").map((word, index) => {
          if (word.startsWith("https://") || word.startsWith("http://")) {
            return (
              <Link
                key={index}
                href={word}
                target="_blank"
                className="text-blue-500 break-all underline-offset-4 hover:underline"
              >
                {word}{" "}
              </Link>
            );
          }

          if (word.startsWith("#")) {
            const href = `/hashtag/${word.slice(1)}${isShort ? "/shorts" : ""}`;
            return (
              <Link key={index} href={href} className="text-blue-500 break-all">
                {word}{" "}
              </Link>
            );
          }
          if (word.startsWith("@")) {
            return (
              <Link
                key={index}
                href={`/${word}`}
                className="text-blue-500 break-all"
              >
                {word}{" "}
              </Link>
            );
          }
          return <Fragment key={index}>{word} </Fragment>;
        })}
      </Typography>
      {text?.length > 200 && (
        <Typography
          className={className}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? " Show Less" : "...more"}
        </Typography>
      )}
    </>
  );
}

export default UTagify;
