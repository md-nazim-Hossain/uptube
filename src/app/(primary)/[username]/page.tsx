import ChannelProfilePage from "@/components/channel/channel-profile-page";
import { generateClientMetadata } from "@/utils/generate-metadata";
import React from "react";
type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params, searchParams }: Props) {
  return generateClientMetadata({
    title: `${decodeURIComponent(params.username)} | UPTube`,
  });
}
function UserProfilePage() {
  return <ChannelProfilePage />;
}

export default UserProfilePage;
