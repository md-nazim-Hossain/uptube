"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function TrendingTabs() {
  const [tab, setTab] = useState("now");
  const currentTab = useSearchParams().get("type") || "now";

  useEffect(() => setTab(currentTab), [currentTab]);
  return (
    <div className="w-full border-b sticky top-0 z-20 bg-background">
      <div className="space-x-10 max-w-4xl mx-auto">
        {["now", "music"].map((trend, index) => {
          const isActive = tab === trend;
          const href =
            `/feed/trending` + (trend === "music" ? "?type=music" : "");
          return (
            <Link
              className={cn(
                "capitalize inline-block py-3 relative",
                isActive ? "text-primary" : "text-secondary",
              )}
              href={href}
              key={index}
            >
              {trend}
              {isActive ? (
                <motion.div
                  className="absolute left-0 bg-primary bottom-0 w-full h-[3px]"
                  layoutId="trendingTab"
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingTabs;
