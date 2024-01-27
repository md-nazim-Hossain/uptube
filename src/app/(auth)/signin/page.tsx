import Link from "next/link";
import React from "react";
import SignInForm from "./_components/signin-form";

function page() {
  return (
    <div>
      <h3> Sign In</h3>
      <h6 className="py-5">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-red-500">
          Sign Up
        </Link>
      </h6>
      <SignInForm />
    </div>
  );
}

export default page;
