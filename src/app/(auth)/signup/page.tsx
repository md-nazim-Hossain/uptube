import Link from "next/link";
import React from "react";
import SignUpForm from "./_components/sign-up-form";
import { Typography } from "@/components/ui/typography";

function page() {
  return (
    <>
      <Typography variant={"h2"}>Create an account</Typography>{" "}
      <Typography className="py-5 font-normal [&:not(:first-child)]:mt-0">
        Already have an account?{" "}
        <Link href="/signin" className="text-red-500">
          Sign In
        </Link>
      </Typography>
      <SignUpForm />
    </>
  );
}

export default page;
