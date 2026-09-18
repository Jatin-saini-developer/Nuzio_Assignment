import { useEffect, useMemo, useState } from "react";

import { apiRequest } from "../api/client";
import { AuthContext } from "./authContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    apiRequest("/api/auth/me")
      .then((data) => {
        if (isMounted) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        if (isMounted && error.status !== 401) {
          console.error(error.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const loginWithGoogleCode = async (code) => {
    const data = await apiRequest("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await apiRequest("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      loginWithGoogleCode,
      logout,
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
