import { axiosPrivate } from "../lib/axios/axiosInstance";
import { useAuth } from "./auth/useAuth";

export const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axiosPrivate.get(
      `${import.meta.env.VITE_API_AUTHENTICATION_URL}/api/v1/auth/refreshToken`,
      {
        withCredentials: true,
      }
    );
    auth && setAuth({ ...auth, accessToken: "dff" });
    return response.data.accessToken;
  };
  return refresh;
};
