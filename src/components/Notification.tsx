"use state";
import { Movie } from "@/core/entity/Movie";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const Path = (props: { d: string }) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const CloseButton = ({ close }: { close: () => void }) => (
  <button onClick={close} className="close">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path d="M 3 16.5 L 17 2.5" />
      <Path d="M 3 2.5 L 17 16.346" />
    </svg>
  </button>
);

interface Props {
  notification: {
    message: string;
    redirectUrl: string;
    createdMovie: Movie;
  } | null;
  close: () => void;
}
const Notification = ({ notification, close }: Props) => {
  if (!notification) return null;

  return (
    <div className="container">
      <AnimatePresence initial={true} mode="popLayout">
        {notification && (
          <div className="fixed bottom-0 right-0 top-0 flex flex-col list-none justify-end ">
            <motion.div
              className="mx-10 h-10 rounded-lg relative text-black  bg-green-600"
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <div className="flex align-middle items-center p-1 justify-center w-full h-full ">
                <div className="p-4">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">
                    {notification.message}
                    <Link
                      className="text-violet-800 underline"
                      href={notification.redirectUrl}
                    >
                      {notification.createdMovie.title}
                    </Link>
                  </span>
                </div>
                <CloseButton close={close} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
