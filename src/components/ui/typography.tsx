import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-xs font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      link: "text-blue-500 underline-offset-4 hover:underline",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      xsmall: "text-xs",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType["variant"]>,
  string
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  inlineCode: "code",
  large: "div",
  small: "small",
  lead: "p",
  muted: "p",
  list: "ul",
  link: "a",
  xsmall: "p",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : variantElementMap["p"]);
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

const HighlightLink = React.forwardRef<
  HTMLElement,
  TypographyProps & { href?: string; showFull?: boolean }
>(
  (
    {
      className,
      variant,
      as,
      asChild,
      children,
      href,
      showFull = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : variantElementMap["p"]);
    const length = children?.toString().length ?? 0;
    const text =
      children
        ?.toString()
        ?.slice(0, showFull ? length : 120)
        ?.split(" ") ?? [];
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {text.map((word, index) => {
          if (!word || !word.trim()) return null;
          if (word.startsWith("https://") || word.startsWith("http://")) {
            return (
              <Link
                target="_blank"
                key={index}
                href={word}
                className="text-blue-500 break-all underline-offset-4 hover:underline"
              >
                {word}{" "}
              </Link>
            );
          }
          return (
            <React.Fragment key={index}>
              {href ? <Link href={href}>{word} </Link> : <>{word} </>}
            </React.Fragment>
          );
        })}
        {length > 120 && !showFull && " ..."}
      </Comp>
    );
  },
);

HighlightLink.displayName = "HighlightLink";

export { Typography, typographyVariants, HighlightLink };
