import { getAllHashTagContent } from "@/_actions/video/getAllHashTagContent";
import { Typography } from "@/components/ui/typography";
import UPTubeTabs from "@/components/uptube/uptube-tabs";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { viewsFormat } from "@/utils/video";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  params: { hashtagname: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hashtagname = params?.hashtagname;
  return generateClientMetadata({
    title: hashtagname,
    descriptions: `UPTube hashtag content the name of hashtag ${hashtagname}`,
    keywords: [hashtagname],
  });
}

async function HashTagLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { hashtagname: string };
}) {
  const hashtagname = params?.hashtagname;
  if (!hashtagname) redirect("/");
  const data = await getAllHashTagContent(hashtagname);
  return (
    <div className="space-y-2 py-2">
      <div className="container sm:pl-5 space-y-2">
        <Typography variant={"h2"}>#{hashtagname}</Typography>
        <Typography variant={"muted"}>
          {viewsFormat(data?.meta?.total ?? 0)} videos
        </Typography>
      </div>
      <UPTubeTabs
        tabs={[
          { href: `/hashtag/${hashtagname}`, label: `All` },
          { href: `/hashtag/${hashtagname}/shorts`, label: `Shorts` },
        ]}
      />
      <div className="container sm:pl-5">{children}</div>
    </div>
  );
}

export default HashTagLayout;
