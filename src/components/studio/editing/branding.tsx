"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { useToast } from "@/components/ui/use-toast";
import UpTubeImage from "@/components/uptube/uptube-image";
import { IAPIResponse, IEditBrandingField, IUser } from "@/types";
import axios from "@/utils/axios";
import { addHTTPPrefix } from "@/utils/common";
import { apiRoutes } from "@/utils/routes";
import { useUserStore } from "@/zustand/useUserStore";
import { getCookie } from "cookies-next";
import React, { useState } from "react";

const fields: IEditBrandingField[] = [
  {
    name: "avatar",
    label: "Picture",
    description:
      "Your profile picture will appear where your channel is presented on UPTube, such as next to your videos and comments",
    recommendedText:
      "It's recommended that you use a picture that's at least 96 x 96 pixels and 4 MB or less. Use a PNG or JPG file. Make sure that your picture follows the YouTube Community Guidelines.",
    handleChange: (file) => {},
    avatar: null,
    coverImage: null,
  },
  {
    name: "coverImage",
    label: "Banner image",
    description: "This image will appear across the top of your channel.",
    recommendedText:
      "For the best results on all devices, use an image that's at least 2048 x 1152 pixels and 6 MB or less.",
    handleChange: (file) => {},
    avatar: null,
    coverImage: null,
  },
];
function Branding() {
  const { toast } = useToast();
  const [publishing, setPublishing] = useState(false);
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <EditImageComponent
          key={field.name}
          {...field}
          avatar={avatar}
          coverImage={coverImage}
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
          disabled={
            (!coverImage && !avatar) || publishing || (!!coverImage && !!avatar)
          }
          variant={"ghost"}
          className="h-8"
          onClick={async () => {
            if (!coverImage && !avatar) return;
            const formData = new FormData();
            if (coverImage) formData.append("coverImage", coverImage);
            if (avatar) formData.append("avatar", avatar);
            try {
              setPublishing(true);
              if (coverImage) {
                const updatedUser = (await axios
                  .patch(apiRoutes.users.updateCoverImage, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${getCookie("accessToken")}`,
                    },
                  })
                  .then((res) => res.data)) as IAPIResponse<IUser>;
                setUser(updatedUser?.data);
                setCoverImage(null);
              }
              if (avatar) {
                const res = (await axios
                  .patch(apiRoutes.users.updateAvatar, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${getCookie("accessToken")}`,
                    },
                  })
                  .then((res) => res.data)) as IAPIResponse<IUser>;
                setUser(res?.data);
                setAvatar(null);
              }
            } catch (error: IAPIResponse<any> | any) {
              toast({
                title: "Upload Failed",
                description: error?.data?.message,
                variant: "destructive",
              });
            } finally {
              setPublishing(false);
            }
          }}
        >
          {publishing ? "Publishing..." : "Publish"}
        </Button>
        <Button
          disabled={(!coverImage && !avatar) || publishing}
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
      <Typography variant={"muted"} className="text-xs">
        Note: You can only upload one image with each request
      </Typography>
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
  avatar,
  coverImage,
}: IEditBrandingField) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  return (
    <div className="space-y-3">
      <div>
        <Label>{label}</Label>
        <Typography variant={"muted"} className="text-xs">
          {description}
        </Typography>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        {user ? (
          <div className="max-w-[290px] w-full h-[160px] rounded-lg overflow-hidden relative">
            {name === "avatar" && (
              <UpTubeImage
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : addHTTPPrefix(user.avatar)
                }
                alt={user?.username + "'s avatar"}
              />
            )}
            {name === "coverImage" && (
              <UpTubeImage
                src={
                  coverImage
                    ? URL.createObjectURL(coverImage)
                    : addHTTPPrefix(user.coverImage)
                }
                alt={user?.username + "'s cover image"}
              />
            )}
          </div>
        ) : (
          <Skeleton className="max-w-[290px] w-full h-[160px] rounded-lg" />
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
              }}
              accept="image/*"
            />
            <Button
              disabled={!user}
              onClick={() => ref.current?.click()}
              variant={"ghost"}
              className="h-8"
            >
              Change
            </Button>
            <Button
              onClick={() => handleChange(null)}
              disabled={
                !user ||
                (name === "avatar" && !avatar) ||
                (name === "coverImage" && !coverImage)
              }
              variant={"ghost"}
              className="h-8"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
