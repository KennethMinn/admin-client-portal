import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetAllFirewalls = () => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["firewalls"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_FIREWALL_URL}/api/v1/firewall`
      );
      return await res.data;
    },
  });
};
