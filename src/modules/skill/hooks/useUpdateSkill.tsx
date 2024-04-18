import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { SkillUpdateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: SkillUpdateFormValues) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_SKILL_URL}/api/v1/skills`,
        data
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"] as InvalidateQueryFilters);
    },
  });
};
