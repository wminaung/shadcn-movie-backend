"use client";
import Link from "next/link";
import React from "react";
import ProfileTag from "./ProfileTag";
import { useSession } from "next-auth/react";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";

interface Props {
  searchTerm: string;
  handleSearchMovie: (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    callback?: () => void
  ) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    callback?: () => void
  ) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleMenu: () => void;
}

const MobileMenu = ({
  handleKeyDown,
  handleSearch,
  handleSearchMovie,
  searchTerm,
  toggleMenu,
}: Props) => {
  const { data: session, status } = useSession();

  return (
    <div className="md:hidden  animate-in transition-all ease-linear duration-1000">
      <Separator orientation="horizontal" className="bg-black" />
      {status === "authenticated" && (
        <>
          {" "}
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
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/movie"
                onClick={toggleMenu}
                className="hover:text-gray-300"
              >
                All
              </Link>
            </li>
            <li>
              <Link
                href="/admin/create"
                onClick={toggleMenu}
                className="hover:text-gray-300 flex items-center space-x-2"
              >
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
              </Link>
            </li>
            <li>
              <ProfileTag />
            </li>
          </ul>
        </>
      )}{" "}
      {status === "unauthenticated" && (
        <div className="p-4  flex justify-center flex-col items-center">
          <ProfileTag toggleMenu={toggleMenu} />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
