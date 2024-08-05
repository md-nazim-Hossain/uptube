import { getAllHashTagContent } from "@/_actions/video/getAllHashTagContent";
import HashTagShorts from "@/components/hashtag/hash-tag-shorts";
import React from "react";
type Props = {
  params: { hashtagname: string };
};
async function HashTageShortsPage({ params: { hashtagname } }: Props) {
  const hashtagShorts = await getAllHashTagContent(hashtagname, "short");
  return (
    <HashTagShorts initialData={hashtagShorts} hashtagname={hashtagname} />
  );
}

export default HashTageShortsPage;
