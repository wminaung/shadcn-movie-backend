"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GoLogin = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/login");
  }, []);

  return <div>null</div>;
};

export default GoLogin;
