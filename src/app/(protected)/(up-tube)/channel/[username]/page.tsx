import { getChannelByUserName } from "@/actions/user/getChannelByUsername";
import ChannelDetails from "@/components/channel/channel-details";
import ChannelProfile from "@/components/channel/channel-profile";
import { generateClientMetadata } from "@/utils/generate-metadata";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params, searchParams }: Props) {
  const username = decodeURIComponent(params.username as string);
  if (!username || !username.startsWith("@"))
    return generateClientMetadata({
      title: "404 Not Found",
      descriptions: "404 Not Found",
    });
  const channel = await getChannelByUserName(username);
  if (!channel)
    return generateClientMetadata({
      title: "404 Not Found",
      descriptions: "404 Not Found",
    });
  return generateClientMetadata({
    title: `${channel?.fullName}`,
    descriptions: channel?.description,
    keywords: [
      channel?.username ?? "",
      channel?.description ?? "",
      channel.fullName ?? "",
    ],
  });
}
async function ChannelProfilePage({ params, searchParams }: Props) {
  const username = decodeURIComponent(params.username as string);
  if (!username || !username.startsWith("@")) return notFound();
  const channel = await getChannelByUserName(username);
  if (!channel) return notFound();
  return (
    <div className="pb-10 pt-2 space-y-5 w-full h-full">
      <ChannelProfile channel={channel} />
      <ChannelDetails channel={channel} />
    </div>
  );
}

export default ChannelProfilePage;
