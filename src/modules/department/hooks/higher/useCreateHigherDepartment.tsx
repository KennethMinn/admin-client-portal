import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { HigherDepartmentCreateFormValues } from "../../types";
import { notifyError } from "../../../../utils/toast-error";

export const useCreateHigherDepartment = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: HigherDepartmentCreateFormValues) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_DEPARTMENT_URL}/api/v1/departments`,
        data
      );

      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"] as InvalidateQueryFilters);
    },
  });
};
