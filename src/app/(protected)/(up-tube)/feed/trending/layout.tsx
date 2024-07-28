"use client";
import React, { ReactNode, Suspense } from "react";

function TrendingLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

export default TrendingLayout;
