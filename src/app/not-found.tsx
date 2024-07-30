import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center space-y-1">
        <Typography variant={"h2"}>404 | Not Found</Typography>
        <p>Could not find requested resource</p>
        <Link
          className={cn(
            buttonVariants({
              className: "w-max rounded-md bg-primary/5",
              variant: "flat",
            }),
          )}
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
