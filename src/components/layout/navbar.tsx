import React from "react";
import UserNavProfile from "./user-nav-profile";
import NavLayout from "./nav-layout";
import { getUser } from "@/actions/user/getUser";

async function Navbar() {
  const user = await getUser();
  return (
    <NavLayout>
      <UserNavProfile userData={user} />
    </NavLayout>
  );
}

export default Navbar;
