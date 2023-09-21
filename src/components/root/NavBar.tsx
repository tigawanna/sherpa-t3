import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";

interface NavBarProps {}

export function NavBar({}: NavBarProps) {
  return (
    <div className="sticky top-0 flex  w-full items-center justify-center bg-secondary/40 p-1">
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
        <ThemeToggle />
   
      </div>
    </div>
  );
}
