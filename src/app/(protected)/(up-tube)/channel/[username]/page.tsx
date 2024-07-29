import React from "react";
import ChannelProfilePage from "@/components/channel/channel-profile-page";
import { generateClientMetadata } from "@/utils/generate-metadata";
type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params, searchParams }: Props) {
  return generateClientMetadata({
    title: decodeURIComponent(params.username),
  });
}
function MyChannelPage() {
  return <ChannelProfilePage />;
}

export default MyChannelPage;
