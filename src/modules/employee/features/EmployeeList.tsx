import { useState } from "react";
import { useSearch } from "../../department/hooks/useSearch";
import {
  Badge,
  Box,
  Button,
  Flex,
  NativeSelect,
  Pagination,
  Progress,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useGetAllCountries } from "../../country/hooks/useGetAllCountries";
import { DepartmentFilteringForm } from "../../department/components/form/filter/DepartmentFilteringForm";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { EmployeeFilteringForm } from "../components/filter/EmployeeFilteringForm";
import { customStyles } from "../../department/components/table/table-styles";
import DataTable from "react-data-table-component";
import { useEmployeeColumns } from "../components/table/columns";
import { useGetAllEmployees } from "../hooks/useGetAllEmployees";
import { Country } from "../../country/types";
import { EmployeeSkillList } from "../components/EmployeeSkillList";
import { useGetHigherDepartment } from "../../department/hooks/higher/useGetHigherDepartment";

export const EmployeeList = () => {
  const employeeColumns = useEmployeeColumns();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [fresh, setRefresh] = useState(0);
  const [country, setCountry] = useState("");
  const { searchKey, setSearchKey } = useSearch();
  const { data: employees, isLoading } = useGetAllEmployees();

  const { data: countries } = useGetAllCountries();
  const totalPages = Math.ceil(
    searchKey || country ? employees?.length / 10 : employees?.lengthc / 10
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
        <Flex align="center" gap={15}>
          <Button
            color="#DADADA"
            c="#3D3D3D"
            leftSection={<IconRefresh stroke={1.5} size={18} />}
            variant="filled"
            onClick={() => {
              setSearchKey("");
              setCountry("");
              setCurrentPage(1);
              setRefresh((prev) => prev + 1);
            }}
          >
            Refresh
          </Button>
          <EmployeeFilteringForm />
          <DepartmentFilteringForm setSearchKey={setSearchKey} />
        </Flex>
      </Flex>
      <Flex justify="end" my={25}>
        <Button
          bg="#DADADA"
          c="#3D3D3D"
          onClick={() => navigate("create")}
          leftSection={<IconPlus size={15} />}
        >
          Create
        </Button>
      </Flex>

      <Tabs color="#1C1C1C" defaultValue="overview">
        <Tabs.List w={180}>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="skills">Skills</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" mt={20}>
          <Box
            component="div"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "3px",
            }}
          >
            <DataTable
              // highlightOnHover
              columns={employeeColumns ?? []}
              data={employees}
              customStyles={customStyles}
            />
          </Box>
          <Flex justify="end" mt={10}>
            {employees && (
              <Pagination
                radius="sm"
                size="sm"
                color="rgba(191, 191, 191, 1)"
                withEdges
                mt={10}
                total={Math.ceil(employees?.length / 10)}
                value={currentPage}
                onChange={setCurrentPage}
              />
            )}
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel mt={20} value="skills">
          <EmployeeSkillList employees={employees} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

EmployeeList.displayName = "EmployeeList";
