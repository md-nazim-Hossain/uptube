import PlaylistFormModal from "@/components/modals/playlist-form-modal";
import PostFormModal from "@/components/modals/post-form-modal";
import UploadVideoModal from "@/components/modals/upload-video-modal";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import UpTubeImage from "@/components/uptube/uptube-image";
import React from "react";
import { PiNotePencilThin, PiPlaylistThin, PiUploadThin } from "react-icons/pi";

async function DashboardPage() {
  return (
    <div className="max-w-7xl studio-container">
      <div className="py-5 flex justify-between items-center">
        <Typography variant={"h3"}>Channel Dashboard</Typography>
        <div className="flex items-center gap-3">
          <UploadVideoModal
            trigger={
              <Button variant={"icon"} className="border">
                <PiUploadThin size={20} />
              </Button>
            }
          />

          <PostFormModal
            trigger={
              <Button variant={"icon"} className="border">
                <PiNotePencilThin size={20} />
              </Button>
            }
          />
          <PlaylistFormModal
            trigger={
              <Button variant={"icon"} className="border">
                <PiPlaylistThin size={20} />
              </Button>
            }
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="border rounded-2xl w-full h-[500px] p-5">
          <div className="border px-3 border-dashed rounded-2xl w-full h-full flex flex-col justify-center items-center">
            <div className="size-[152px] relative overflow-hidden">
              <UpTubeImage
                alt="Uptube video upload image"
                src={"/assets/images/studio/upload-video.svg"}
              />
            </div>
            <Typography
              variant={"muted"}
              className="max-w-[250px] pb-3 text-center text-xs"
            >
              Want to see metrics on your recent video? Upload and publish a
              video to get started.
            </Typography>
            <UploadVideoModal trigger={<Button>Upload Videos</Button>} />
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default DashboardPage;
