import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetIp = () => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["firewall"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_FIREWALL_URL}/api/v1/firewall/get-client-ip`
      );
      return await res.data;
    },
  });
};
