import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_EMPLOYEE_URL}/api/v1/employees?id=${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"] as InvalidateQueryFilters);
    },
  });
};
