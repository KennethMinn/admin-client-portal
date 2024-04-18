import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { CountryUpdateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: CountryUpdateFormValues) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_COUNTRY_URL}/api/v1/countries`,
        data
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["countries"] as InvalidateQueryFilters);
    },
  });
};
