"use client";
import EmptyState from "@/components/empty-state";
import { useShortsProvider } from "@/components/providers/shorts-provider";
import ShortVideo from "@/components/shorts/short-video";
import { ShortCardSkeleton } from "@/components/skeletons/short-card-skeleton";
import { IVideo } from "@/types";
import _ from "lodash";
import React from "react";

function ShortsVideoPage() {
  const [prevVolume, setPrevVolume] = React.useState(0.5);
  const [playerState, setPlayerState] = React.useState({
    muted: false,
    volume: 0.5,
  });

  const { isLoading, shorts, inViewRef } = useShortsProvider();
  if (isLoading)
    return (
      <div className="flex flex-col gap-5 items-center w-full pb-10">
        <ShortCardSkeleton className="max-w-[500px]" height={800} />
      </div>
    );

  const handleMuteUnmute = (state: boolean) => {
    setPrevVolume(playerState.volume);
    setPlayerState({
      volume: state ? 0 : prevVolume,
      muted: state,
    });
  };

  const handleVolume = (value: string) => {
    const newVolume = parseFloat(value) / 100;
    setPlayerState((prev) => ({ volume: newVolume, muted: newVolume === 0 }));
  };
  if (!shorts.length) return <EmptyState text="No shorts found" />;

  return (
    <section className="flex flex-col xs:gap-5 items-center w-full pb-10">
      {_.uniqBy(shorts, "_id").map((short: IVideo, index: number) => {
        const isLast = index + 1 === shorts.length - 1;
        return (
          <ShortVideo
            inViewRef={isLast ? inViewRef : undefined}
            handleVolume={handleVolume}
            playerState={playerState}
            toggleMute={handleMuteUnmute}
            key={index}
            {...short}
          />
        );
      })}
    </section>
  );
}

export default ShortsVideoPage;
