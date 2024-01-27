"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import { AiOutlineClose } from "react-icons/ai";

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
  return (
    <div
      className={
        "w-full hidden max-w-md rounded-lg bg-primary/5 sm:flex items-center gap-3 px-3"
      }
    >
      <FiSearch size={16} className="cursor-pointer text-secondary" />
      <Input
        inputSize={"lg"}
        variant={"outline"}
        className="px-0 bg-transparent"
        placeholder="Search..."
      />
    </div>
  );
};
