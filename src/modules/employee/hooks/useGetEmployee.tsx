import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetEmployee = (id: string) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_EMPLOYEE_URL
        }/api/v1/employees/by-id?id=${id}`
      );

      return await res.data;
    },
    enabled: !!id,
  });
};
