import Link from "next/link";
import React from "react";
import { RiBearSmileLine } from "react-icons/ri";
import { BiSolidUser } from "react-icons/bi";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:px-20">
        <Link href="/" className="flex items-center gap-2">
          <RiBearSmileLine size={"1.5rem"} className="text-accent" />
          <p className="text-accent text-2xl font-bold tracking-wider">
            droprr
          </p>
        </Link>

        <div className="text-accent flex items-center gap-5">
          <BiSolidUser size={"1.5rem"} className="text-accent" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
