import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export const useGetAllHigherDepartments = (country = "") => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["higher-departments", country],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_DEPARTMENT_URL
        }/api/v1/departments?country=${country}`
      );
      return await res.data;
    },
  });
};
