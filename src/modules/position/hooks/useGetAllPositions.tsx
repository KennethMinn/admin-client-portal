import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetAllPositions = () => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_POSITION_URL}/api/v1/positions`
      );
      return await res.data;
    },
  });
};
