import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { HigherDepartmentEditFormValues } from "../../types";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { notifyError } from "../../../../utils/toast-error";

export const useUpdateHigherDepartment = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: HigherDepartmentEditFormValues) => {
      const res = await axios.put(
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
