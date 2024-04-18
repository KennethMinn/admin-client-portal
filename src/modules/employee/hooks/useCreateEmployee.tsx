import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { EmployeeCreateFormValues } from "../types";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: EmployeeCreateFormValues) => {
      return await axios.post(
        `${import.meta.env.VITE_API_EMPLOYEE_URL}/api/v1/employees`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"] as InvalidateQueryFilters);
    },
  });
};
