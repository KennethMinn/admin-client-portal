import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetAllDocuments = (status = "") => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_DOCUMENT_URL
        }/api/v1/document-types?useStatus=${status}`
      );
      return await res.data;
    },
  });
};
