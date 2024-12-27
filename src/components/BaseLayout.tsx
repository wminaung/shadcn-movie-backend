"use client";
import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useMovieStore } from "@/store/movie";
import { getAllMovies } from "@/store/movie/movieActions";

interface Props {
  children: React.ReactNode;
}
const BaseLayout = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { setMovies } = useMovieStore();

  useEffect(() => {
    (async () => {
      const movies = await getAllMovies();
      console.log("baselayout", movies);
      setMovies(movies);
    })();
    setMounted(true); // Only render the ThemeProvider after mounting
  }, []);

  if (!mounted) {
    return <>{children} </>; // Render without theme provider initially (avoids mismatch)
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Navbar />
      <main className="pt-24">{children}</main>
    </ThemeProvider>
  );
};

export default BaseLayout;
