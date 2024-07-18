"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};
export const SearchBoxMobile = ({ onClose }: Props) => {
  return (
    <div className="flex shadow px-5 bg-background items-center gap-3 h-[56px] sticky top-0 z-50">
      <AiOutlineClose
        onClick={onClose}
        size={16}
        className="cursor-pointer text-secondary"
      />
      <Input
        inputSize={"lg"}
        variant={"outline"}
        className="px-0 bg-transparent"
        placeholder="Search..."
      />
    </div>
  );
};

export const SearchBoxDesktop = () => {
  const [searchText, setSearchText] = React.useState("");
  const router = useRouter();
  return (
    <div
      className={
        "w-full hidden max-w-md rounded-lg bg-primary/5 sm:flex items-center"
      }
    >
      <Button
        onClick={() => router.push(`/results?search_query=${searchText}`)}
        disabled={!searchText}
        variant={"flat"}
        className="w-max text-secondary disabled:cursor-pointer disabled:opacity-100 px-3 bg-transparent hover:bg-transparent"
      >
        <FiSearch size={16} />
      </Button>
      <div className="flex-1 flex items-center justify-between gap-2">
        <Input
          value={searchText}
          inputSize={"lg"}
          variant={"outline"}
          className="px-0 bg-transparent"
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              router.push(`/results?search_query=${searchText}`);
            }
          }}
        />
        {searchText && (
          <Button
            onClick={() => setSearchText("")}
            variant={"flat"}
            className="w-max text-secondary px-3 bg-transparent hover:bg-transparent"
          >
            <AiOutlineClose size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
