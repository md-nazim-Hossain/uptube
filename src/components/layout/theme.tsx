"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type ThemeProps = {
  className?: string;
  showLabel?: boolean;
};
function Theme({ className, showLabel = false }: ThemeProps) {
  const [open, setOpen] = React.useState(false);
  const { setTheme, theme, themes } = useTheme();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn("capitalize text-2xl flex items-center gap-3", className)}
      >
        {theme === "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        {showLabel && <Label className="text-sm font-normal">{theme}</Label>}
      </PopoverTrigger>
      <PopoverContent className="p-1 w-36" align="start">
        {themes.map((theme) => (
          <Button
            variant={"flat"}
            className="capitalize rounded"
            key={theme}
            onClick={() => {
              setTheme(theme);
              setOpen(false);
            }}
          >
            {theme}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default Theme;
