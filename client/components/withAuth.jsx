"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!auth.accessToken) {
        router.replace("/login");
      }
    }, [auth, router]);

    // If the user is not authenticated, don't render the wrapped component
    if (!auth.accessToken) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
