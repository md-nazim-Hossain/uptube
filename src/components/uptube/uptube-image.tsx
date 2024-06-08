"use client";

import { cn } from "@/lib/utils";
import { blurImage } from "@/utils/common";
import Image, { ImageProps } from "next/image";
import React, { useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  quality?: number;
};
function UpTubeImage({
  src,
  alt,
  className,
  quality = 60,
  ...rest
}: Props & ImageProps) {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [loadingImage, setLoadingImage] = React.useState(true);
  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <Image
      onError={() => setImageSrc("/assets/images/placeholder.svg")}
      fill
      sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw"
      src={imageSrc}
      alt={alt}
      quality={quality}
      className={cn(
        "object-cover duration-300 ease-in-out",
        className,
        loadingImage ? "grayscale blur-2xl" : "grayscale-0 blur-0",
      )}
      onLoad={(e) => {
        if (e.currentTarget.complete) {
          setLoadingImage(false);
        }
      }}
      placeholder="blur"
      blurDataURL={blurImage()}
      {...rest}
    />
  );
}

export default UpTubeImage;
