import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const useGetDocument = (id: string) => {
  const axios = useAxiosPrivate();
  return useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_DOCUMENT_URL
        }/api/v1/document-types/by-id?id=${id}`
      );
      return await res.data;
    },
    enabled: !!id,
  });
};
