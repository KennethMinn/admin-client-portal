import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetPosition = (id: string) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["position", id],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_POSITION_URL
        }/api/v1/positions/by-id?id=${id}`
      );
      return await res.data;
    },
    enabled: !!id,
  });
};
