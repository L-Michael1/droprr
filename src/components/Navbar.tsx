import Link from "next/link";
import React from "react";
import { RiBearSmileLine } from "react-icons/ri";
import { BiSolidUser } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { PiSignOut } from "react-icons/pi";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:px-20">
        <Link href="/" className="flex items-center gap-2">
          <RiBearSmileLine size={"1.5rem"} className="text-accent" />
          <p className="text-accent text-2xl font-bold tracking-wider">
            droprr
          </p>
        </Link>

        {session && (
          <div className="text-accent flex items-center gap-5">
            <Link href={"/tracked-products"}>
              <AiFillHeart
                size={"1.5rem"}
                className="text-accent hover:brightness-90"
              />
            </Link>
            <Menu as="div">
              <Menu.Button className="flex">
                <BiSolidUser
                  size={"1.5rem"}
                  className="text-accent hover:brightness-90"
                />
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-accent text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => void signOut()}
                        >
                          <PiSignOut
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
