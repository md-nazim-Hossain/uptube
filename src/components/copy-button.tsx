"use client";

import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  link: string;
  className?: string;
  variant?: ButtonProps["variant"];
};
function CopyButton({ link, className, variant }: Props) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = React.useState(false);
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        toast({ title: "Copied to clipboard" });
        setTimeout(() => {
          setIsCopied(false);
        }, 500);
      }}
      className={cn("p-3", className)}
      variant={variant ?? "icon"}
    >
      {isCopied ? <Check /> : <Copy />}
    </Button>
  );
}

export default CopyButton;
