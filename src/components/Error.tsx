"use client";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md">
      <svg
        className="w-6 h-6 mr-2 text-red-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
        ></path>
      </svg>
      <div>
        <h2 className="text-lg font-bold">Error</h2>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Error;
