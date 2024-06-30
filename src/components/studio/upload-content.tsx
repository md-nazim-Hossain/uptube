"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { PiTrashSimpleThin, PiUploadThin } from "react-icons/pi";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";

type Props = {
  getFile: (file: File | null) => void;
  className?: string;
  thumbnail?: File;
  defaultFile?: File | null;
  onDelete: () => void;
};

function UploadContent({
  getFile,
  className,
  defaultFile,
  thumbnail,
  onDelete,
}: Props) {
  const [preview, setPreview] = React.useState("");
  useEffect(() => {
    if (defaultFile) {
      setPreview(URL.createObjectURL(defaultFile));
    }
  }, [defaultFile]);
  return (
    <div
      className={cn(
        "w-full p-1 group aspect-video border border-dashed relative",
        className,
      )}
    >
      {preview && (
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
            light={thumbnail ? URL.createObjectURL(thumbnail) : false}
            className="w-full h-full"
            url={preview}
            controls
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
