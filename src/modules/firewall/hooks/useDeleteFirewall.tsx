import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useDeleteFirewall = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_FIREWALL_URL}/api/v1/firewall?id=${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["firewalls"] as InvalidateQueryFilters);
    },
  });
};
