"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ContentTabs() {
  const tabs = ["videos", "shorts", "posts", "playlists"];
  const pathname = usePathname();
  return (
    <div className="w-full border-b">
      <div className="studio-container space-x-10">
        {tabs.map((tab, index) => {
          const isActive = pathname?.includes(tab);
          return (
            <Link
              className={cn(
                "capitalize inline-block pb-3 relative",
                isActive ? "text-primary" : "text-secondary",
              )}
              href={`/studio/content/${tab}`}
              key={index}
            >
              {tab}
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

export default ContentTabs;
