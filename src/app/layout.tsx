import type { Metadata } from "next";

import "@/styles/globals.css";
import { ProvidersTree } from "@/components/providers/providers-tree";
import { inter, roboto } from "@/utils/font";
import ModaProvider from "@/components/modals/modal-provider";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "UpTube",
  description:
    "UpTube is a platform where you can upload and download videos. It's free and open source.",
  icons: {
    icon: "/assets/images/logo.png",
    shortcut: "/assets/images/logo.png",
  },
  keywords: ["UpTube", "videos", "youtube", "stream", "website", "streaming"],
  authors: [{ name: "UpTube", url: "https://up-tube.vercel.app" }],
  publisher: "UpTube",
  creator: "UpTube",
};

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
      </body>
    </html>
  );
}
