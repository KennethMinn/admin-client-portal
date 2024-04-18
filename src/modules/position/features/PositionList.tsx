import { Box } from "@mantine/core";
import DataTable from "react-data-table-component";
import { useGetAllPositions } from "../hooks/useGetAllPositions";

import { customStyles } from "../../department/components/table/table-styles";
import { usePositionColumns } from "../components/table/columns";
import { PositionCreateFormModal } from "../components/modal/create/PositionCreateFormModal";

export const PositionList = () => {
  const positionColumns = usePositionColumns();
  const { data: positions, isLoading } = useGetAllPositions();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box component="div" style={{ borderRadius: "8px" }} bg="#fff" p={15}>
      <PositionCreateFormModal />
      <Box
        mt={30}
        component="div"
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "3px",
        }}
      >
        <DataTable
          columns={positionColumns}
          data={positions}
          customStyles={customStyles}
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

PositionList.displayName = "PositionList";
