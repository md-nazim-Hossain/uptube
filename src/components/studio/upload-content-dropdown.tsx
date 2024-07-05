"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";
import {
  PiNotePencilThin,
  PiPlaylistThin,
  PiUploadThin,
  PiVideoLight,
} from "react-icons/pi";
import UploadVideoModal from "../modals/upload-video-modal";
import PostFormModal from "../modals/post-form-modal";
import PlaylistFormModal from "../modals/playlist-form-modal";

function UploadContentDropdown() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"flat"}
          className="border hover:border hover:bg-transparent"
        >
          <PiVideoLight className="w-6 h-5 mr-2 text-destructive" />
          CREATE
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UploadVideoModal
          trigger={
            <DropdownMenuItem
              className="w-full"
              onSelect={(e) => e.preventDefault()}
            >
              <PiUploadThin className="w-6 h-5 mr-2 text-secondary" />
              <span className="text-secondary">Upload Videos</span>
            </DropdownMenuItem>
          }
        />
        <PostFormModal
          trigger={
            <DropdownMenuItem
              className="w-full"
              onSelect={(e) => e.preventDefault()}
            >
              <PiNotePencilThin className="w-6 h-5 mr-2 text-secondary" />
              <span className="text-secondary">Create Post</span>
            </DropdownMenuItem>
          }
        />
        <PlaylistFormModal
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="w-full"
            >
              <PiPlaylistThin className="w-6 h-5 mr-2 text-secondary" />
              <span className="text-secondary">New Playlist</span>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UploadContentDropdown;
