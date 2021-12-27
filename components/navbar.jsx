import Image from "next/image";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

const classes = (...classNames) => classNames.filter(Boolean).join(" ");

const navigations = [
  {
    name: "About",
    href: "/about",
    classes: "text-black text-2xl font-semibold hover:underline cursor-pointer"
  },
  {
    name: "Releases",
    href: "/releases",
    classes: "text-black text-2xl font-semibold hover:underline cursor-pointer"
  },
  // {
  //   name: "Shop",
  //   href: "/shop",
  //   classes: "text-black text-2xl font-semibold hover:underline cursor-pointer"
  // }
  // {
  //   name: "plxplxplx.com",
  //   href: "/plx",
  //   classes:
  //     "px-6 py-1 text-gray-700 text-sm bg-gray-300 font-semibold rounded-full hover:bg-yellow-300 hover:text-black transition",
  // },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!open);
  }
  return (
    <div className="flex flex-row items-center justify-betweem mt-4">
      <div>
        {open ? (
          <XIcon onClick={toggleMenu} className="block w-10 h-10" />
        ) : (
          <MenuIcon onClick={toggleMenu} className="block h-10 w-10" />
        )}

        <div className={classes(open ? "" : "hidden")}>
          {navigations.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <span className="block">
                <a className={classes(item.classes)}>{item.name}</a>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
