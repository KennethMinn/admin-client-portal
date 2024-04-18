import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_COUNTRY_URL}/api/v1/countries?id=${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["countries"] as InvalidateQueryFilters);
    },
  });
};
