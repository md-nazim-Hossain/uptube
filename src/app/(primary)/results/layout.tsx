"use client";
import React, { Suspense } from "react";

function SearchResultLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

export default SearchResultLayout;
