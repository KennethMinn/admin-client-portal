import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { SkillCreateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: SkillCreateFormValues) => {
      const res = await axios.post(
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
