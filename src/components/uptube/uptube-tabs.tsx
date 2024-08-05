"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ISideProps } from "@/types";

type Props = {
  className?: string;
  tabs: ISideProps[];
};
function UPTubeTabs({ tabs, className }: Props) {
  const pathname = usePathname();
  return (
    <div className={cn("w-full border-b", className)}>
      <div className="studio-container space-x-10">
        {tabs.map((tab, index) => {
          const isActive = pathname === tab?.href;
          return (
            <Link
              className={cn(
                "capitalize inline-block pb-3 relative",
                isActive ? "text-primary" : "text-secondary",
              )}
              href={tab.href}
              key={index}
            >
              {tab?.label}
              {isActive ? (
                <motion.div
                  className="absolute left-0 bg-primary bottom-0 w-full h-[3px]"
                  layoutId="contentTab"
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default UPTubeTabs;
