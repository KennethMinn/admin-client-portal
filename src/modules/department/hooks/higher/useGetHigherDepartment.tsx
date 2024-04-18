import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export const useGetHigherDepartment = (id: string) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["higher-department", id],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_DEPARTMENT_URL
        }/api/v1/departments/by-id?id=${id}`
      );
      return await res.data;
    },
    enabled: !!id,
  });
};
