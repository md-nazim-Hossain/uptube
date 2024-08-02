import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import { ProvidersTree } from "@/components/providers/providers-tree";
import { inter, roboto } from "@/utils/font";
import ModaProvider from "@/components/modals/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProviders from "@/components/providers/progress-providers";
import { cookies } from "next/headers";
import { generateClientMetadata } from "@/utils/generate-metadata";

export const metadata: Metadata = generateClientMetadata({ title: "UPTube" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>
        <ProvidersTree>
          {children}
          <ModaProvider />
        </ProvidersTree>
        <Toaster />
        <Analytics />
        <ProgressBarProviders />
      </body>
    </html>
  );
}
