"use client";
import React, { useEffect } from "react";

import { cn } from "@/lib/utils";
import { PiTrashSimpleThin, PiUploadThin } from "react-icons/pi";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addHTTPPrefix } from "@/utils/common";

type Props = {
  getFile: (file: File | null) => void;
  className?: string;
  thumbnail?: File;
  defaultFile?: File | null;
  onDelete: () => void;
  isEdit?: boolean;
};

function UploadContent({
  getFile,
  className,
  defaultFile,
  thumbnail,
  onDelete,
  isEdit,
}: Props) {
  const [preview, setPreview] = React.useState("");
  useEffect(() => {
    if (defaultFile) {
      setPreview(
        defaultFile instanceof File
          ? URL.createObjectURL(defaultFile)
          : addHTTPPrefix(defaultFile),
      );
    }
  }, [defaultFile]);
  return (
    <div
      className={cn(
        "w-full p-1 group aspect-video border border-dashed relative",
        className,
      )}
    >
      {preview && !isEdit && (
        <Button
          type="button"
          onClick={() => {
            setPreview("");
            onDelete();
          }}
          variant={"icon"}
          size={"icon"}
          className={
            "absolute group-hover:visible group-hover:opacity-100 duration-200 opacity-0 invisible z-10 shadow bg-red-500 hover:bg-red-600 top-1 right-1 text-white size-8"
          }
        >
          <PiTrashSimpleThin className="size-4" />
        </Button>
      )}
      <Input
        className="w-full h-full absolute inset-0 opacity-0"
        type="file"
        accept="video/*"
        onChange={(e) => {
          e.preventDefault();
          if (!e.target.files || !e.target.files.length) return;
          getFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      {preview ? (
        <div className="w-full h-full relative">
          <ReactPlayer
            light={
              thumbnail
                ? thumbnail instanceof File
                  ? URL.createObjectURL(thumbnail)
                  : addHTTPPrefix(thumbnail)
                : true
            }
            className="w-full h-full"
            url={preview}
            muted
            playsinline
            playing
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div className="w-full h-full flex text-secondary justify-center flex-col gap-1 items-center">
          <PiUploadThin className="size-6" />
          <span>Upload Video</span>
        </div>
      )}
    </div>
  );
}

export default UploadContent;
