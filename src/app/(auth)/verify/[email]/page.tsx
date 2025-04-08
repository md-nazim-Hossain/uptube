import VerifyAccount from "@/components/auth/verify-account";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import React from "react";

export async function generateStaticParams() {
  return [];
}

function VerifyPage({ params }: { params: { email: string } }) {
  return (
    <div>
      <Typography variant={"h2"}> Verify Account</Typography>
      <Typography className="py-5 font-normal [&:not(:first-child)]:mt-0">
        Already Verified{" "}
        <Link href="/signin" className="text-red-500 hover:underline">
          Sign In
        </Link>
      </Typography>
      <VerifyAccount email={params.email || ""} />
    </div>
  );
}

export default VerifyPage;
