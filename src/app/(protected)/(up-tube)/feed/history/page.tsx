import { getUserWatchHistory } from "@/actions/user/getUserWatchHistory";
import EmptyState from "@/components/empty-state";
import WatchHistory from "@/components/feed/watch-history";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = generateClientMetadata({
  title: "Watch history",
});
async function WatchHistoryPage() {
  const history = await getUserWatchHistory();
  if (!history || !history?.data?.length)
    return <EmptyState text="No watch history" />;
  return <WatchHistory initialData={history} />;
}

export default WatchHistoryPage;
