"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import ProfileTag from "./ProfileTag";
import NavLink from "./NavLink";
import { MyButton } from "@/app/shadcn/MyButton";
import { useSession } from "next-auth/react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResetSearchTerm = () => {
    setSearchTerm("");
  };

  const handleSearchMovie = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    callback?: () => void
  ) => {
    navigation.push(`/admin/movie?title=${searchTerm}`);
    if (callback && typeof callback === "function") callback();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    callback?: () => void
  ) => {
    if (event.key === "Enter") {
      navigation.push(`/admin/movie?title=${searchTerm}`);
      if (callback && typeof callback === "function") callback();
    }
  };

  return (
    <nav className="bg-gray-800 text-white fixed w-full top-0 z-50">
      <div className=" mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">MyLogo</div>
        <DesktopMenu
          handleKeyDown={handleKeyDown}
          handleResetSearchTerm={handleResetSearchTerm}
          handleSearch={handleSearch}
          handleSearchMovie={handleSearchMovie}
          searchTerm={searchTerm}
        />
        {/* Hamburger icon for mobile */}
        <div className="md:hidden transition-all ease-linear duration-1000 ">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6 transition-all ease-linear duration-1000"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown for mobile */}
      {isOpen && (
        <MobileMenu
          handleKeyDown={handleKeyDown}
          handleSearch={handleSearch}
          handleSearchMovie={handleSearchMovie}
          searchTerm={searchTerm}
          toggleMenu={toggleMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
