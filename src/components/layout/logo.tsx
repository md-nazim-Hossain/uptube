"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UpTubeImage from "../uptube/uptube-image";

type Props = {
  onClick: () => void;
  href: string;
  className?: string;
  title?: string;
};
function Logo({ onClick, href, className, title }: Props) {
  return (
    <div
      className={cn("flex items-center gap-x-1 md:gap-2 h-[56px]", className)}
    >
      <Button
        onClick={onClick}
        size={"icon"}
        variant={"icon"}
        className="flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          focusable="false"
          fill="currentColor"
          style={{
            pointerEvents: "none",
            display: "block",
            width: "24px",
            height: "24px",
          }}
        >
          <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
        </svg>
      </Button>
      <Link className="text-xl font-bold flex items-center gap-1" href={href}>
        <span className="relative size-5 overflow-hidden">
          <UpTubeImage
            src="/assets/images/logo.png"
            alt="UPTube Logo"
            className="object-cover"
          />
        </span>
        <span>{title || "UPTube"}</span>
      </Link>
    </div>
  );
}

export default Logo;
