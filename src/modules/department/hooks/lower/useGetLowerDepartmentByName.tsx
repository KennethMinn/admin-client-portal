import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export const useGetLowerDepartmentByNameAndCountry = (
  name: string,
  country: string
) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["lower-department", name, country],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_DEPARTMENT_URL
        }/api/v1/sub-departments/by-name-and-country?name=${name}&country=${country}`
      );
      return await res.data;
    },
  });
};
