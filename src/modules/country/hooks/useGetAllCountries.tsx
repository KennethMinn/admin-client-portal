import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetAllCountries = (status = "") => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_COUNTRY_URL
        }/api/v1/countries?useStatus=${status}`
      );
      return await res.data;
    },
  });
};
