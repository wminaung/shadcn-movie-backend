"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}
const SessionLayout = ({ children, session }: Props) => {
  const router = useRouter();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionLayout;
