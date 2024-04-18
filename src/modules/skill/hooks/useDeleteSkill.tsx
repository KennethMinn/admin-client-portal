import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_SKILL_URL}/api/v1/skills?id=${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"] as InvalidateQueryFilters);
    },
  });
};
