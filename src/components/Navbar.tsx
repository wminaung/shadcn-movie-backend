"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ProfileTag from "./ProfileTag";
import NavLink from "./NavLink";
import { MyButton } from "@/app/shadcn/MyButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useRouter();
  const currentPath = usePathname();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchMovie = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    callback?: () => void
  ) => {
    navigation.push(`/movie?title=${searchTerm}`);
    if (callback && typeof callback === "function") callback();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    callback?: () => void
  ) => {
    if (event.key === "Enter") {
      navigation.push(`/movie?title=${searchTerm}`);
      if (callback && typeof callback === "function") callback();
    }
  };
  const handleClickCreateBtn = () => {
    navigation.push(`/movie/create`);
  };

  return (
    <nav className="bg-gray-800 text-white fixed w-full top-0 z-50">
      <div className=" mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">MyLogo</div>

        <div className="hidden  md:flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              disabled={!searchTerm}
              className="absolute inset-y-0 end-0 flex items-center pe-3 hover:opacity-50 active:opacity-75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Button
            variant="default"
            onClick={handleSearchMovie}
            size={"icon"}
            className="flex items-center justify-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" // This is your original icon path
              />
            </svg>
          </Button>
        </div>
        {/* Menu for large screens */}
        <ul className="hidden items-center  md:flex space-x-4 lg:space-x-8">
          <li>
            <NavLink to="/" children="Home" currentPath={currentPath} />
          </li>
          <li>
            <NavLink to="/movie" children="All" currentPath={currentPath} />
          </li>
          <li>
            <MyButton
              variant={"ghost"}
              className="bg-slate-700 hover:bg-slate-500 active:bg-slate-700 rounded-full"
              size={"sm"}
              onClick={handleClickCreateBtn}
            >
              <>
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p>Create</p>
              </>
            </MyButton>
            {/* <Link
              href="/movie/create"
              className=" hover:text-blue-500 active:text-blue-200 text-blue-700 flex items-center space-x-2
               hover:bg-slate-800 border border-red-500 rounded-full p-1"
            >
              <>
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Create</span>
              </>
            </Link> */}
          </li>
          <li>
            <ProfileTag />
          </li>
        </ul>

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
        <div className="md:hidden animate-in transition-all ease-linear duration-1000">
          <div className="p-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={(e) => {
                handleKeyDown(e, toggleMenu);
              }}
              placeholder="Search..."
              className="px-3 py-1 w-full rounded text-black  dark:text-white"
            />
            <button
              onClick={(e) => {
                handleSearchMovie(e, toggleMenu);
              }}
              className="mt-2 w-full px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Search
            </button>
          </div>
          <ul className="flex flex-col items-center bg-gray-700 space-y-4 py-4">
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/movie"
                onClick={toggleMenu}
                className="hover:text-gray-300"
              >
                All
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">
                Services
              </Link>
            </li>
            <li>
              <ProfileTag />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
