import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { DocumentCreateFormValues } from "../types";
import { notifyError } from "../../../utils/toast-error";

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: DocumentCreateFormValues) => {
      const res = await axios.post(
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
