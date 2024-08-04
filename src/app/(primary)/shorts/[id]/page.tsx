"use client";
import EmptyState from "@/components/empty-state";
import ShortVideo from "@/components/shorts/short-video";
import { ShortCardSkeleton } from "@/components/skeletons/short-card-skeleton";
import { useShorts } from "@/hooks/useShorts";
import { IVideo } from "@/types";
import _ from "lodash";
import React, { Fragment } from "react";

function ShortsVideoPage() {
  const [prevVolume, setPrevVolume] = React.useState(0.5);
  const [playerState, setPlayerState] = React.useState({
    muted: false,
    volume: 0.5,
  });

  const { isLoading, pages, inViewRef } = useShorts();
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
  if (!pages || !pages.length) return <EmptyState text="No shorts found" />;

  return (
    <section className="flex flex-col xs:gap-5 items-center w-full pb-10">
      {pages.map((page, index) => {
        if (!page || !page?.data || !page?.data?.length) return null;
        return (
          <Fragment key={index}>
            {_.uniqBy(page.data, "_id").map((short: IVideo, index: number) => {
              const isLast = index + 1 === page.data!.length;
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
          </Fragment>
        );
      })}
    </section>
  );
}

export default ShortsVideoPage;
