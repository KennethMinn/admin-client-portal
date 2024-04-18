import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { EmployeeUpdateFormValues } from "../types";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: EmployeeUpdateFormValues) => {
      return await axios.put(
        `${import.meta.env.VITE_API_EMPLOYEE_URL}/api/v1/employees`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"] as InvalidateQueryFilters);
    },
  });
};
