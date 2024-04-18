import { Box } from "@mantine/core";
import DataTable from "react-data-table-component";
import { centerStyles } from "../../department/components/table/table-styles";

import { useGetAllCountries } from "../hooks/useGetAllCountries";

import { useCountryColumns } from "../components/table/columns";
import { CountryCreateFormModal } from "../components/modal/create/CountryCreateFormModal";

export const CountryList = () => {
  const countryColumns = useCountryColumns();
  const { data: countries, isLoading } = useGetAllCountries();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box component="div" style={{ borderRadius: "8px" }} bg="#fff" p={15}>
      <CountryCreateFormModal />
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
          data={countries}
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

CountryList.displayName = "CountryList";
