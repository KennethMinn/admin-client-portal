import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PositionCreateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useCreatePosition = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: PositionCreateFormValues) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_POSITION_URL}/api/v1/positions`,
        data
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["positions"] as InvalidateQueryFilters);
    },
  });
};
