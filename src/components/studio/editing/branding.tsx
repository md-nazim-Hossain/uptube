"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import UpTubeImage from "@/components/uptube/uptube-image";
import { IEditBrandingField } from "@/types";
import axios from "@/utils/axios";
import { addHTTPPrefix } from "@/utils/common";
import { apiRoutes } from "@/utils/routes";
import { useUserStore } from "@/zustand/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const fields: IEditBrandingField[] = [
  {
    name: "avatar",
    label: "Picture",
    description:
      "Your profile picture will appear where your channel is presented on UPTube, such as next to your videos and comments",
    recommendedText:
      "It's recommended that you use a picture that's at least 96 x 96 pixels and 4 MB or less. Use a PNG or JPG file. Make sure that your picture follows the YouTube Community Guidelines.",
    handleChange: (file) => {},
  },
  {
    name: "coverImage",
    label: "Banner image",
    description: "This image will appear across the top of your channel.",
    recommendedText:
      "For the best results on all devices, use an image that's at least 2048 x 1152 pixels and 6 MB or less.",
    handleChange: (file) => {},
  },
];
function Branding() {
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const queryClient = useQueryClient();

  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <EditImageComponent
          key={field.name}
          {...field}
          handleChange={(file) => {
            if (field.name === "avatar") {
              setAvatar(file);
            } else {
              setCoverImage(file);
            }
          }}
        />
      ))}
      <div className="flex gap-3 pt-5">
        <Button
          disabled={!coverImage && !avatar}
          variant={"ghost"}
          className="h-8"
          onClick={async () => {
            if (!coverImage && !avatar) return;
            const formData = new FormData();
            if (coverImage) formData.append("coverImage", coverImage);
            if (avatar) formData.append("avatar", avatar);
            try {
              if (coverImage) {
                await axios
                  .patch(apiRoutes.users.updateCoverImage, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((res) => res.data);
                setCoverImage(null);
              }
              if (avatar) {
                await axios
                  .patch(apiRoutes.users.updateAvatar, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((res) => res.data);
                setAvatar(null);
              }

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
    </div>
  );
}

export default Branding;

const EditImageComponent = ({
  description,
  name,
  label,
  recommendedText,
  handleChange,
}: IEditBrandingField) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const [avatar, setAvatar] = React.useState<File | null>(null);
  return (
    <div className="space-y-3">
      <div>
        <Label>{label}</Label>
        <Typography variant={"muted"} className="text-xs">
          {description}
        </Typography>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        {user && (
          <div className="w-[290px] h-[160px] rounded-lg overflow-hidden relative">
            <UpTubeImage
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : addHTTPPrefix(
                      user[name === "avatar" ? "avatar" : "coverImage"],
                    )
              }
              alt={user?.username + "'s avatar"}
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          <Typography variant={"muted"} className="text-xs">
            {recommendedText}
          </Typography>
          <div className="flex gap-3">
            <Input
              ref={ref}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                handleChange(file);
                setAvatar(file);
              }}
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
    </div>
  );
};
