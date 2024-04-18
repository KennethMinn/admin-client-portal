import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LowerDepartmentEditFormValues } from "../../types";
import { notifyError } from "../../../../utils/toast-error";

export const useUpdateLowerDepartment = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: LowerDepartmentEditFormValues) => {
      const res = await axios.put(
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
