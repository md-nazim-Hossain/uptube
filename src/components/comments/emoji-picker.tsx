import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
type Props = {
  onEmojiSelect: (emoji: any) => void;
};
function EmojiPicker({ onEmojiSelect }: Props) {
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const { theme } = useTheme();
  return (
    <div className="space-y-1">
      <Button
        type="button"
        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
        variant={"icon"}
      >
        <BsEmojiSmile size={18} />
      </Button>
      <div className={cn("fixed z-50", openEmojiPicker ? "block" : "hidden")}>
        <Picker
          onClickOutside={(e: any) => {
            if (openEmojiPicker && !e?.nativeEvent) {
              setOpenEmojiPicker(false);
            }
          }}
          theme={theme === "dark" ? "dark" : "light"}
          data={data}
          onEmojiSelect={onEmojiSelect}
          perLine={8}
        />
      </div>
    </div>
  );
}

export default EmojiPicker;
