import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { DocumentUpdateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: DocumentUpdateFormValues) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_DOCUMENT_URL}/api/v1/document-types`,
        data
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["documents"] as InvalidateQueryFilters);
    },
  });
};
