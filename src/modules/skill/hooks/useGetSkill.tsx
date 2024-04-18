import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetSkill = (id: string) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["skill", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_SKILL_URL}/api/v1/skills/by-id?id=${id}`
      );
      return await res.data;
    },
    enabled: !!id,
  });
};
