import UpTubeImage from "@/components/uptube/uptube-image";
import Link from "next/link";
import React from "react";

function TermsAndPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background">
      <div className="container h-14 bg-background w-full flex items-center">
        <Link className="text-xl font-bold flex items-center gap-1" href={"/"}>
          <span className="relative size-5 overflow-hidden">
            <UpTubeImage
              src="/assets/images/logo.png"
              alt="UPTube Logo"
              className="object-cover"
            />
          </span>
          <span>UPTube</span>
        </Link>
      </div>
      <div className="min-h-[calc(100vh-56px)] container">{children}</div>
    </div>
  );
}

export default TermsAndPolicyLayout;
