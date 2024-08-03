import { getAllShorts } from "@/actions/video/getAllShorts";
import ShortsProvider from "@/components/providers/shorts-provider";
import React, { ReactNode } from "react";

async function ShortLayout({ children }: { children: ReactNode }) {
  const shorts = await getAllShorts();
  return <ShortsProvider initialData={shorts}>{children}</ShortsProvider>;
}

export default ShortLayout;
