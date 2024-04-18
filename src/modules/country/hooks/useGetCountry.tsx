import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetCountry = (id: string) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["country", id],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_COUNTRY_URL
        }/api/v1/countries/by-id?id=${id}`
      );
      return await res.data;
    },
    enabled: !!id,
  });
};
