import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useCreateEmployeeProfile = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_EMPLOYEE_URL
        }/api/v1/employees/upload/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"] as InvalidateQueryFilters);
    },
  });
};
