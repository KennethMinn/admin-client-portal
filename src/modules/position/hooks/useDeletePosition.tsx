import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useDeletePosition = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_POSITION_URL}/api/v1/positions?id=${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["positions"] as InvalidateQueryFilters);
    },
  });
};
