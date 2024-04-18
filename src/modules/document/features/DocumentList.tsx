import { Box } from "@mantine/core";
import DataTable from "react-data-table-component";
import { centerStyles } from "../../department/components/table/table-styles";

import { useGetAllDocuments } from "../hooks/useGetAllDocuments";

import { useDocumentColumns } from "../components/table/columns";
import { DocumentCreateFormModal } from "../components/modal/create/DocumentCreateFormModal";

export const DocumentList = () => {
  const countryColumns = useDocumentColumns();
  const { data: documents, isLoading } = useGetAllDocuments();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box component="div" style={{ borderRadius: "8px" }} bg="#fff" p={15}>
      <DocumentCreateFormModal />
      <Box
        mt={15}
        component="div"
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "3px",
        }}
      >
        <DataTable
          columns={countryColumns}
          data={documents}
          customStyles={centerStyles}
        />
      </Box>
      {/* <Flex justify="end" mt={10}>
        {data && (
          <Pagination
            radius="sm"
            size="sm"
            color="rgba(191, 191, 191, 1)"
            withEdges
            mt={10}
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </Flex> */}
    </Box>
  );
};

DocumentList.displayName = "DocumentList";
