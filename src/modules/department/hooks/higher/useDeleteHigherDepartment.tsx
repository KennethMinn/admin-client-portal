import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export const useDeleteHigherDepartment = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_DEPARTMENT_URL}/api/v1/departments?id=${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"] as InvalidateQueryFilters);
    },
  });
};
