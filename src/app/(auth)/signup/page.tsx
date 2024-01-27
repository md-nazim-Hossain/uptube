import Link from "next/link";
import React from "react";
import SignUpForm from "./_components/sign-up-form";

function page() {
  return (
    <>
      <h3>Sign Up</h3>
      <h6 className="py-5">
        Already have an account?{" "}
        <Link href="/signin" className="text-red-500">
          Sign In
        </Link>
      </h6>
      <SignUpForm />
    </>
  );
}

export default page;
