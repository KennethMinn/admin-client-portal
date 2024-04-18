import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PositionUpdateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useUpdatePosition = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: PositionUpdateFormValues) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_POSITION_URL}/api/v1/positions`,
        data
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["countries"] as InvalidateQueryFilters);
    },
  });
};
