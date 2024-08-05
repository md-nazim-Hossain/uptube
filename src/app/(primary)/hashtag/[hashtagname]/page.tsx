import { getAllHashTagContent } from "@/_actions/video/getAllHashTagContent";
import HashTag from "@/components/hashtag/hash-tag";
import React from "react";

type Props = {
  params: { hashtagname: string };
};
async function HashTagPage({ params: { hashtagname } }: Props) {
  const hashtag = await getAllHashTagContent(hashtagname);
  return <HashTag hashtagname={hashtagname} initialData={hashtag} />;
}

export default HashTagPage;
