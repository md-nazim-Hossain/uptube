"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import UpTubeImage from "@/components/uptube/uptube-image";
import { addHTTPPrefix } from "@/utils/common";
import { useUpdate } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useUserStore } from "@/zustand/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  isAvatar?: boolean;
  showButton?: boolean;
};
function Branding({ isAvatar = false, showButton = true }: Props) {
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [coverImage, setCoverImage] = React.useState<File | null>(null);

  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const changeEndPoint =
    apiRoutes.users[isAvatar ? "updateAvatar" : "updateCoverImage"];
  const { mutateAsync } = useUpdate(changeEndPoint, apiRoutes.users.getUser);
  const ref = React.useRef<HTMLInputElement>(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (isAvatar) {
      setAvatar(file);
    } else {
      setCoverImage(file);
    }
  };

  const subTitle = isAvatar
    ? `Your profile picture will appear where your channel is presented on UPTube, such as next to your videos and comments`
    : "This image will appear across the top of your channel.";

  const recomendationText = isAvatar
    ? "It's recommended that you use a picture that's at least 96 x 96 pixels and 4 MB or less. Use a PNG or JPG file. Make sure that your picture follows the YouTube Community Guidelines."
    : "For the best results on all devices, use an image that's at least 2048 x 1152 pixels and 6 MB or less.";
  return (
    <div className="space-y-3">
      <div>
        <Label>{isAvatar ? "Picture" : "Banner image"}</Label>
        <Typography variant={"muted"} className="text-xs">
          {subTitle}
        </Typography>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        {user && (
          <div className="w-[290px] h-[160px] rounded-lg overflow-hidden relative">
            <UpTubeImage
              src={
                avatar || coverImage
                  ? URL.createObjectURL(isAvatar ? avatar! : coverImage!)
                  : addHTTPPrefix(user[isAvatar ? "avatar" : "coverImage"])
              }
              alt={user?.username + "'s avatar"}
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          <Typography variant={"muted"} className="text-xs">
            {recomendationText}
          </Typography>
          <div className="flex gap-3">
            <Input
              ref={ref}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/*"
            />
            <Button
              onClick={() => ref.current?.click()}
              variant={"ghost"}
              className="h-8"
            >
              Change
            </Button>
            <Button variant={"ghost"} className="h-8">
              Remove
            </Button>
          </div>
        </div>
      </div>
      {showButton && (
        <div className="flex gap-3 pt-5">
          <Button
            disabled={!coverImage && !avatar}
            variant={"ghost"}
            className="h-8"
            onClick={async () => {
              if (!coverImage && !avatar) return;
              //   const formData = new FormData();
              //   formData.append(isAvatar ? "avatar" : "coverImage", coverImage);
              try {
                await mutateAsync({
                  [isAvatar ? "avatar" : "coverImage"]: isAvatar
                    ? avatar
                    : coverImage,
                });
                setCoverImage(null);
                setAvatar(null);
                queryClient.invalidateQueries({
                  queryKey: [apiRoutes.users.getUser],
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Publish
          </Button>
          <Button
            disabled={!coverImage && !avatar}
            onClick={() => {
              setCoverImage(null);
              setAvatar(null);
            }}
            variant={"ghost"}
            className="h-8"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default Branding;
