import Navbar from "@/components/layout/navbar";
import UptubeSidebar from "@/components/layout/uptube-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const [, pathname] =
    fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];
  if (pathname?.startsWith("/watch")) {
    return (
      <>
        <Navbar />
        <div className="mt-14 h-[calc(100vh-56px)]">
          <UptubeSidebar />
          <div className="h-full flex-1 gap-10 flex flex-col pt-[140px] items-center">
            <Image
              width={278}
              height={160}
              src={"/assets/images/unavailable-video.png"}
              alt="video unavailable image"
            />
            <Typography className="font-normal" variant={"h3"}>
              This video isn&apos;t available any more
            </Typography>

            <Link
              className={cn(
                buttonVariants({
                  className: "w-max rounded-md bg-primary/5",
                  variant: "flat",
                }),
              )}
              href="/"
            >
              Return Home
            </Link>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center space-y-5">
        <Typography variant={"h2"}>404 | Not Found</Typography>
        <p>Could not find requested resource</p>
        <Link
          className={cn(
            buttonVariants({
              className: "w-max rounded-md bg-primary/5",
              variant: "flat",
            }),
          )}
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
