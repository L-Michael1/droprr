import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IoPricetagsOutline } from "react-icons/io5";

const navIcons = [{ src: "/assets/icons/user.svg", alt: "user" }];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:px-20">
        <Link href="/" className="flex items-center gap-2">
          <IoPricetagsOutline size={"1.5rem"} className="text-green-500" />
          <p className="text-2xl font-bold text-black">droprr</p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon, i) => (
            <Image
              src={icon.src}
              alt={icon.alt}
              width={27}
              height={27}
              key={i}
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
