import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const axios = useAxiosPrivate();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${
          import.meta.env.VITE_API_DOCUMENT_URL
        }/api/v1/document-types?id=${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["documents"] as InvalidateQueryFilters);
    },
  });
};
