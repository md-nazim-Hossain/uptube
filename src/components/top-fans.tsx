"use client";

import React from "react";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { Typography, typographyVariants } from "./ui/typography";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

function TopFans() {
  const fans = ["shadcn", "shadcn", "shadcn", "shadcn", "shadcn", "shadcn"];
  return (
    <div className="space-y-5">
      <Typography variant={"h3"}>Top Fans</Typography>
      <div className="flex flex-row lg:flex-col gap-5 flex-wrap">
        {fans.map((fan, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-3"
          >
            <Link href={`/channel/${fan}`}>
              <UpTubeAvatarImage
                className="size-12"
                name="Shadcn"
                src="https://github.com/shadcn.png"
                alt="Shadcn"
              />
            </Link>
            <div className="flex flex-col gap-1 items-center">
              <Link
                href={`/channel/${fan}`}
                className={cn(
                  typographyVariants({
                    variant: "small",
                    className: "text-xs",
                  }),
                )}
              >
                {fan}
              </Link>
              <Button
                className="text-destructive h-max text-xs px-2 py-0.5"
                variant={"outline"}
              >
                Follow
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFans;
