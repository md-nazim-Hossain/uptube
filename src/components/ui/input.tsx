import * as React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex w-full bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        outline:
          "focus-visible:ring-none ring-offset-transparent border-none focus-visible:ring-offset-none outline-none ",
        destructive:
          "border-b border-input rounded-none p-0 focus-visible:border-b-2 focus-visible:border-b-red-500 focus-visible:ring-none ring-offset-transparent focus-visible:ring-offset-none outline-none",
      },
      inputSize: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
        xl: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantProps<typeof inputVariants>["variant"];
  inputSize?: VariantProps<typeof inputVariants>["inputSize"];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, variant, ...props }, ref) => {
    const [passwordType, setPasswordType] = React.useState("password");
    return (
      <>
        {type === "password" ? (
          <div
            className={cn(
              inputVariants({
                variant,
                inputSize,
                className:
                  variant === "destructive"
                    ? cn(
                        "flex items-center border-input border-b focus-within:border-b-2 justify-between gap-2 focus-within:border-b-red-500",
                        className,
                      )
                    : cn(
                        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        className,
                      ),
              }),
            )}
          >
            <input
              className="w-full outline-none bg-transparent"
              type={passwordType}
              ref={ref}
              {...props}
            />
            {passwordType !== "password" ? (
              <AiOutlineEye
                onClick={() => setPasswordType("password")}
                size={20}
                className="text-secondary cursor-pointer"
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setPasswordType("text")}
                size={20}
                className="text-secondary cursor-pointer"
              />
            )}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              inputVariants({
                variant,
                inputSize,
                className,
              }),
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
