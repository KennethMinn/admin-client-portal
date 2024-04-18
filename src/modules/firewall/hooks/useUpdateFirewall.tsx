import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FireWallUpdateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useUpdateFirewall = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: FireWallUpdateFormValues) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_FIREWALL_URL}/api/v1/firewall`,
        data
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["firewalls"] as InvalidateQueryFilters);
    },
  });
};
