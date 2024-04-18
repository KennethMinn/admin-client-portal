import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export const useGetLowerDepartmentsByParentId = (id: string) => {
  const axios = useAxiosPrivate();

  return useQuery({
    queryKey: ["lower-department", id],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_DEPARTMENT_URL
        }/api/v1/sub-departments/search?parentDepartmentId=${id}`
      );
      return await res.data;
    },
    enabled: !!id,
  });
};
