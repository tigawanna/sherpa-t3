import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { NavbarOptions } from "./NavbarOptions";

interface NavBarProps {}

export function NavBar({}: NavBarProps) {
  const { data: profile } = api.user.getAll.useQuery();
  console.log("profile == ", profile);

  const { data: sessionData, } = useSession();
  console.log("session data == ",sessionData)

  return (
    <div className="sticky top-0 flex  w-full items-center justify-center bg-secondary/40 p-1 z-50">
      <div className="flex  w-full items-center justify-between gap-2">
        <div className="flex items-center justify-center gap-2">
          <Link className="text-xl font-bold" href="/">
            Home
          </Link>
        </div>
        <div className="flex items-center justify-end gap-3 w-full px-5 ">
          <Link href="/profile">Profile</Link>
          <Link href="/profile/new">New profile</Link>
        </div>
      </div>
      <div className="flex justify-end ">
      <NavbarOptions/>  
      </div>
    </div>
  );
}
