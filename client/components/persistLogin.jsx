"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useRefreshToken from "@/hooks/useRefreshToken";
import useAuth from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";

const persistLogin = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage("persist", false);
    const router = useRouter();

    useEffect(() => {
      let isMounted = true;
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (error) {
          console.error(error);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      };

      if (!auth?.accessToken) {
        verifyRefreshToken();
      } else {
        setIsLoading(false);
      }

      return () => (isMounted = false);
    }, [auth, refresh]);

    useEffect(() => {
      console.log(`Auth Token: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading, auth]);

    if (!persist) {
      router.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default persistLogin;
