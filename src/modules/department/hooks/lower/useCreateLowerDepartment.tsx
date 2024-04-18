import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LowerDepartmentCreateFormValues } from "../../types";
import { notifyError } from "../../../../utils/toast-error";

export const useCreateLowerDepartment = () => {
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LowerDepartmentCreateFormValues) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_DEPARTMENT_URL}/api/v1/sub-departments`,
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
