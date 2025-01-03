"use client";

import { MyButton } from "@/app/shadcn/MyButton";
import ProfileTag from "./ProfileTag";
import NavLink from "./NavLink";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { KeyboardEvent, MouseEvent } from "react";

interface Props {
  searchTerm: string;
  handleResetSearchTerm: () => void;
  handleSearchMovie: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    callback?: () => void
  ) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DesktopMenu = ({
  handleSearchMovie,
  searchTerm,
  handleResetSearchTerm,
  handleKeyDown,
  handleSearch,
}: Props) => {
  const navigation = useRouter();
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  const CreateBtnHandler = () => {
    navigation.push(`/admin/create`);
  };
  return (
    <>
      {" "}
      {status === "authenticated" && (
        <>
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
                onClick={() => handleResetSearchTerm}
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
              <NavLink to="/" children="Dashboard" currentPath={currentPath} />
            </li>
            <li>
              <NavLink
                to="/admin/movie"
                children="All"
                currentPath={currentPath}
              />
            </li>
            <li>
              <MyButton
                variant={"ghost"}
                className="bg-slate-700 hover:bg-slate-500 active:bg-slate-700 rounded-full"
                size={"sm"}
                onClick={CreateBtnHandler}
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
            </li>
            <li>
              <ProfileTag />
            </li>
          </ul>{" "}
        </>
      )}
      {status !== "authenticated" && (
        <div className="hidden md:flex">
          <ProfileTag />
        </div>
      )}
    </>
  );
};

export default DesktopMenu;
