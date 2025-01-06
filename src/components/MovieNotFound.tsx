"use client";

import { useRouter } from "next/navigation";

const MovieNotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Redirects to the home page
  };

  return (
    <div className="text-center mt-12">
      <h1>Movie Not Found</h1>
      <p>We couldn't find the movie you were looking for. Please try again.</p>
      <button
        onClick={handleGoHome}
        className="px-2 py-5 text-[16px] bg-transparent underline hover:text-blue-300 text-blue-500 border-none rounded-sm  cursor-pointer"
      >
        Go to Home
      </button>
    </div>
  );
};

export default MovieNotFound;
