import { Box } from "@mantine/core";
import DataTable from "react-data-table-component";
import { centerStyles } from "../../department/components/table/table-styles";

import { useGetAllSkills } from "../hooks/useGetAllSkills";

import { useSkillsColumns } from "../components/table/columns";
import { SkillCreateFormModal } from "../components/modal/create/SkillCreateFormModal";

export const SkillList = () => {
  const countryColumns = useSkillsColumns();
  const { data: skills, isLoading } = useGetAllSkills();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box component="div" style={{ borderRadius: "8px" }} bg="#fff" p={15}>
      <SkillCreateFormModal />
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
          data={skills}
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

SkillList.displayName = "SkillList";
