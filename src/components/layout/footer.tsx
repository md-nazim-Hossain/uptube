"use client";
import { footerSocialIcons } from "@/data";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="w-full cp-10">
      <div className="py-5 sm:py-10 border-t gap-5 flex flex-col sm:flex-row justify-between">
        <div className="max-w-2xl space-y-5">
          <h3>Video & Short Theme</h3>
          <p>
            We are the video platform that will exceed your expectations. The
            most powerful platform if you want to start a business. Get it now!
          </p>
        </div>
        <div className="mt-5 sm:mt-0 flex gap-10 justify-between sm:justify-start">
          <div className="space-y-8">
            <h6 className="uppercase text-slate-400">Browse</h6>
            <div className="flex flex-col gap-3">
              <Link className="text-sm" href={"/"}>
                Explore
              </Link>
              <Link className="text-sm" href={"/short"}>
                Shorts
              </Link>
              <Link className="text-sm" href={"/library"}>
                Liabrary
              </Link>
            </div>
          </div>
          <div className="space-y-8">
            <h6 className="uppercase text-slate-400">Help</h6>
            <div className="flex flex-col gap-3">
              <Link className="text-sm" href={""}>
                Premium
              </Link>
              <Link className="text-sm" href={""}>
                Articles
              </Link>
            </div>
          </div>
          <div className="space-y-8">
            <h6 className="uppercase text-slate-400">Follow Us</h6>
            <div className="flex items-center gap-5">
              {footerSocialIcons.map((icon) => {
                return (
                  <Link target="_blank" key={icon.url} href={icon.url}>
                    <icon.Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-center sm:text-left text-slate-400 pb-5 sm:pb-10">
        &copy; Copyright 2024 Video Entertainment Inc.
      </p>
    </div>
  );
}

export default Footer;
