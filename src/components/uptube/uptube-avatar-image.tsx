"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { blurImage } from "@/utils/common";

type Props = {
  src: string;
  alt: string;
  className?: string;
  name?: string;
  imgClassName?: string;
  onClick?: () => void;
};
function UpTubeAvatarImage({
  alt,
  src,
  className,
  name,
  imgClassName,
  onClick,
}: Props) {
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [error, setError] = React.useState(true);
  return (
    <div
      onClick={onClick}
      className={cn(
        "size-[42px] flex-shrink-0 relative rounded-full overflow-hidden",
        className,
        loadingImage ? "border" : "border-none",
      )}
    >
      {(error || !src) && (
        <div className="absolute p-0.5 w-full h-full rounded-full z-10 inset-0 bg-slate-200 dark:bg-slate-500 flex justify-center items-center uppercase">
          {name
            ? `${name[0]}${name?.split(" ")?.[1]?.[0] ?? name.at(-1)}`
            : "CB"}
        </div>
      )}
      {!!src && (
        <Image
          onError={() => {
            setError(true);
            setLoadingImage(false);
          }}
          fill
          sizes="(min-width: 20em) 14vw,
                    (min-width: 14em) 25vw,
                    100vw"
          src={src}
          alt={alt}
          quality={60}
          className={cn(
            "object-cover object-[top_center] duration-300 ease-in-out ",
            imgClassName,
            loadingImage ? "grayscale blur-2xl" : "grayscale-0 blur-0",
            error ? "opacity-0" : "opacity-100",
          )}
          onLoad={(e) => {
            if (e.currentTarget.complete) {
              setLoadingImage(false);
              setError(false);
            }
          }}
          placeholder="blur"
          blurDataURL={blurImage()}
        />
      )}
    </div>
  );
}

export default UpTubeAvatarImage;
