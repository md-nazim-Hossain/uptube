"use client";
import { useFetch } from "@/utils/reactQuery";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IAPIResponse, IPlayList } from "@/types";

type Props = {
  onValueChange: (value: string) => void;
};
function PlaylistsFormField({ onValueChange }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<IPlayList[]>>(
    "/playlists/get-all-playlists",
  );
  if (isLoading) return <>loading...</>;
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a playlist" />
      </SelectTrigger>
      <SelectContent>
        {data?.data?.map((playlist: any) => (
          <SelectItem key={playlist._id} value={playlist._id}>
            {playlist.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PlaylistsFormField;
