"use client";

import Link from "next/link";

interface Props {
  to: string;
  children: React.ReactNode;
  currentPath: string;
}

const NavLink = ({ children, to, currentPath }: Props) => {
  return (
    <Link
      href={to}
      className={`hover:text-gray-300 border-b-2 ${
        currentPath === to ? `text-slate-100` : ` text-slate-300 `
      } hover:border-red-700  p-1`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
