import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetAllEmployees = () =>
  // page: number,
  // partialName: string,
  // country: string,
  // fresh: number
  {
    const axios = useAxiosPrivate();
    return useQuery({
      queryKey: ["employees"],
      queryFn: async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_EMPLOYEE_URL}/api/v1/employees`
          );
          return await res.data;
        } catch (error) {
          console.error(error);
        }
      },
    });
  };
