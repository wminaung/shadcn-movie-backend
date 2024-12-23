"use client";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md shadow-md">
      <svg
        className="w-6 h-6 mr-2 text-yellow-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
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
