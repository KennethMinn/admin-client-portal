import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { notifyError } from "../../../utils/toast-error";

export const useCheckEmployeeNumber = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (number: string) => {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_EMPLOYEE_URL
        }/api/v1/employees/check-employee-number?employeeNumber=${number}`
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"] as InvalidateQueryFilters);
    },
  });
};
