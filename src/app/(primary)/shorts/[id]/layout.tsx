import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

function ShortLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  if (!params.id) {
    return notFound();
  }
  return <>{children}</>;
}

export default ShortLayout;
