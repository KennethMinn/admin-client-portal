import {
  Box,
  Button,
  Flex,
  NativeSelect,
  Pagination,
  Text,
} from "@mantine/core";
import { useGetAllDepartments } from "../hooks/useGetAllDepartments";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { DepartmentFilteringForm } from "../components/form/filter/DepartmentFilteringForm";
import { CreateFormModal } from "../components/modal/create/CreateFormModal";
import { useDepartmentColumns } from "../components/table/columns";
import { DepartmentDataRow, SubDepartmentDataRow } from "../types";
import { useGetAllCountries } from "../../country/hooks/useGetAllCountries";
import { useGetAllHigherDepartments } from "../hooks/higher/useGetAllHigherDepartments";
import { useGetLowerDepartmentsByParentId } from "../hooks/lower/useGetLowerDepartmentsByParentId";
import { useSearch } from "../hooks/useSearch";
import { IconRefresh } from "@tabler/icons-react";
import {
  customStyles,
  expandTableCustomStyles,
} from "../components/table/table-styles";
import { Country } from "../../country/types";

const ExpandedComponent = ({
  data: department,
}: {
  data: DepartmentDataRow;
}) => {
  const { searchKey } = useSearch();
  const { subDepartmentsColumns } = useDepartmentColumns();

  const { data: subDepartments } = useGetLowerDepartmentsByParentId(
    department.id
  );

  return (
    <Box
      component="div"
      style={{
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <DataTable
        // highlightOnHover
        key={department.id}
        noTableHead
        data={subDepartments}
        columns={subDepartmentsColumns}
        customStyles={expandTableCustomStyles}
        conditionalRowStyles={[
          {
            when: (row: SubDepartmentDataRow) =>
              searchKey && row.name.includes(searchKey) ? true : false,
            style: {
              backgroundColor: "#f9f9f9",
              borderLeft: "1px solid #8D99AE",
            },
          },
        ]}
      />
    </Box>
  );
};

export const DepartmentList = () => {
  const { departmentsColumns } = useDepartmentColumns();
  const [currentPage, setCurrentPage] = useState(1);
  const [fresh, setRefresh] = useState(0);
  const [country, setCountry] = useState("");
  const { searchKey, setSearchKey } = useSearch();
  const { data, isLoading } = useGetAllDepartments(
    currentPage,
    searchKey,
    country,
    fresh
  );

  const { data: higherDepartments } = useGetAllHigherDepartments();
  const { data: countries } = useGetAllCountries("USE");
  const totalPages = Math.ceil(
    searchKey || country ? data?.totalElements / 10 : data?.total / 10
  );

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box component="div" style={{ borderRadius: "8px" }} bg="#fff" p={15}>
      <Flex justify="space-between">
        <NativeSelect
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          data={
            countries && [
              { value: "", label: "All Country" },
              ...countries.map((country: Country) => ({
                value: country.name,
                label: country.name,
              })),
            ]
          }
        />
        <Flex align="center" gap={20}>
          <Button
            variant="filled"
            color="#DADADA"
            c="#3D3D3D"
            leftSection={<IconRefresh stroke={1.5} size={18} />}
            onClick={() => {
              setSearchKey("");
              setCountry("");
              setCurrentPage(1);
              setRefresh((prev) => prev + 1);
            }}
          >
            Refresh
          </Button>
          <DepartmentFilteringForm setSearchKey={setSearchKey} />
        </Flex>
      </Flex>
      <CreateFormModal higherDepartments={higherDepartments} />
      <Box
        component="div"
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "3px",
        }}
      >
        <DataTable
          // highlightOnHover
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          expandableRowExpanded={(row) => {
            if (searchKey && row.subDepartments.length < 1) return false;
            if (!row.subDepartments) return false;
            if (searchKey && row.subDepartments.length > 0) return true;
            return false;
          }}
          expandableRowDisabled={(row) => {
            if (
              searchKey &&
              row.name.includes(searchKey) &&
              row.subDepartments.length > 0
            )
              return false;
            return row.subDepartments.length ? false : true;
          }}
          columns={departmentsColumns}
          data={data?.departments}
          customStyles={customStyles}
        />
      </Box>
      <Flex justify="end" mt={10}>
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
      </Flex>
    </Box>
  );
};

DepartmentList.displayName = "DepartmentList";
