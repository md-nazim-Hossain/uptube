import { cn } from "@/lib/utils";
import React, { MutableRefObject } from "react";
import ReactPlayer from "react-player";

export const useReactPlayerControler = (
  videoPlayerRef: MutableRefObject<ReactPlayer | null>,
) => {
  const [videoState, setVideoState] = React.useState({
    played: 0,
    seeking: false,
  });
  const progressHandler = (state = {}) => {
    if (!videoState.seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (value: number) => {
    setVideoState({
      ...videoState,
      seeking: false,
      played: value / 100,
    });
    videoPlayerRef?.current?.seekTo(value / 100);
  };

  const ProgressBar: React.FC<{ openCommentBox: boolean }> = ({
    openCommentBox,
  }) => (
    <div
      className={cn(
        "absolute bottom-4 left-0 xs:left-3 h-0 z-20 group/slider",
        openCommentBox
          ? "xs:w-[calc(100%-11px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-11px)]"
          : "w-full xs:w-[calc(100%-22px)]",
      )}
    >
      <input
        type="range"
        className={cn(
          "h-1 cursor-pointer accent-destructive duration-500 appearance-destructive bg-gray-200 dark:bg-gray-700 w-full [&::-webkit-slider-thumb]:opacity-0 rounded-sm group-hover/slider:[&::-webkit-slider-thumb]:opacity-100",
        )}
        value={videoState.played * 100}
        max={100}
        min={0}
        onChange={(e) => {
          seekHandler(parseFloat(e.target.value));
        }}
      />
    </div>
  );
  return {
    ProgressBar,
    progressHandler,
  };
};
