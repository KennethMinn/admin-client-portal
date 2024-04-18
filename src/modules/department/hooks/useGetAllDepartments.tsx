import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetAllDepartments = (
  page: number,
  partialName: string,
  country: string,
  fresh: number
) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["departments", page, partialName, country, fresh],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_DEPARTMENT_URL
          }/api/v1/departments/all-types?size=10&page=${page}&partialName=${partialName}&country=${country}`
        );
        return await res.data;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
