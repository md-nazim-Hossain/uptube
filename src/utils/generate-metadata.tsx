import { Metadata } from "next";
type Props = {
  title: string;
  descriptions?: string;
  keywords?: string[];
};
export const generateClientMetadata = ({
  title,
  descriptions,
  keywords,
}: Props): Metadata => {
  return {
    title: title,
    referrer: "origin-when-cross-origin",
    applicationName: "UPTube",
    description:
      descriptions ||
      "UPTube is a platform where you can upload and download videos. It's free and open source.",
    icons: {
      icon: "/assets/images/logo.png",
      shortcut: "/assets/images/logo.png",
    },
    keywords: [
      "UPTube",
      "videos",
      "youtube",
      "stream",
      "website",
      "streaming",
    ].concat(keywords || []),
    authors: [{ name: "UPTube", url: "https://uptube.vercel.app" }],
    publisher: "UPTube",
    creator: "UPTube",
  };
};
