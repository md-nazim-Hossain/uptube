import ShortsProvider from "@/components/providers/shorts-provider";
import React, { ReactNode } from "react";

function ShortLayout({ children }: { children: ReactNode }) {
  return <ShortsProvider>{children}</ShortsProvider>;
}

export default ShortLayout;
