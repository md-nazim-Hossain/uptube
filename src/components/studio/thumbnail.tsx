"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import UpTubeImage from "../uptube/uptube-image";
import { cn } from "@/lib/utils";
import { PiImageThin } from "react-icons/pi";

type Props = {
  getFile: (file: File | null) => void;
  className?: string;
  defaultFile?: File | null;
};

function Thumbnail({ getFile, className, defaultFile }: Props) {
  const [preview, setPreview] = React.useState("");
  useEffect(() => {
    if (defaultFile) {
      setPreview(URL.createObjectURL(defaultFile));
    }
  }, [defaultFile]);
  return (
    <div
      className={cn(
        "w-full p-1 aspect-video border border-dashed relative",
        className,
      )}
    >
      <Input
        className="w-full h-full absolute inset-0 z-10 opacity-0"
        type="file"
        accept="image/*"
        onChange={(e) => {
          e.preventDefault();
          if (!e.target.files || !e.target.files.length) return;
          getFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      {preview ? (
        <div className="w-full h-full relative">
          <UpTubeImage src={preview} alt="Thumbnail" />
        </div>
      ) : (
        <div className="w-full h-full flex text-secondary justify-center flex-col gap-1 items-center">
          <PiImageThin className="size-6" />
          <span>Upload Image</span>
        </div>
      )}
    </div>
  );
}

export default Thumbnail;
