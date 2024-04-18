import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetFirewall = (id: string) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["firewall", id],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_FIREWALL_URL
        }/api/v1/firewall/by-id?id=${id}`
      );
      return await res.data;
    },
    enabled: !!id,
  });
};
