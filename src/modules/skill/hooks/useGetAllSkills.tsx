import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetAllSkills = (status = "") => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_SKILL_URL
        }/api/v1/skills?useStatus=${status}`
      );
      return await res.data;
    },
  });
};
