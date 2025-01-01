"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 text-gray-200 text-center">
        Create Your
      </h1>
      <div className="flex flex-col items-center space-y-2">
        <Button
          onClick={() => navigateTo("/admin/create/movie")}
          className="w-40 p-2 h-20 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center text-sm"
        >
          Movie
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
          </>
        </Button>
        <Button
          onClick={() => navigateTo("/admin/create/category")}
          className="w-40 h-20  bg-green-600 text-white hover:bg-green-700 flex items-center justify-center text-sm"
        >
          Category{" "}
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
          </>
        </Button>
      </div>
    </div>
  );
};

export default Create;
