import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await fetch("http://localhost:3001/refresh", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();

    setAuth({
      user: data.user,
      phone: data.phone,
      coords: data.coords,
      accessToken: data.accessToken,
    });

    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
