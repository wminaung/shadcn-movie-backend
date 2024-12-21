"use client";
import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const BaseLayout = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Only render the ThemeProvider after mounting
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render without theme provider initially (avoids mismatch)
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Navbar />
      <main className="pt-24">{children}</main>
    </ThemeProvider>
  );
};

export default BaseLayout;
