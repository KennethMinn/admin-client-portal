import { TableColumn } from "react-data-table-component";
import { EmployeeDataRow } from "../../types";
import { Avatar, Badge, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";
import { EmployeeDeleteForm } from "../delete/EmployeeDeleteForm";

export const useEmployeeColumns = () => {
  const navigate = useNavigate();
  const employeeColumns: TableColumn<EmployeeDataRow>[] = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "60px",
    },
    {
      name: "Country",
      selector: (row) => row.country,
      maxWidth: "50px",
    },
    {
      name: "Role",
      selector: (row) => row.authority,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => (
        <Flex gap={8}>
          <Avatar size="sm" src={row.profileUrl} alt="employee profile" />
          <Text
            c="blue"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            fz={13}
            onClick={() => navigate(`edit/${row.id}`)}
          >
            {row.name}
          </Text>
        </Flex>
      ),
      minWidth: "200px",
    },
    {
      name: "ID",
      selector: (row) => row.employeeId,
      minWidth: "150px",
    },
    {
      name: "Department",
      cell: (row) => (
        <Text fz={14}>
          {row.department}
          {" > "}
          {row.subDepartment}
        </Text>
      ),
      minWidth: "255px",
    },
    {
      name: "Position",
      selector: (row) => row.position,
      minWidth: "170px",
    },
    {
      name: "Ph number",
      selector: (row) => row.phone,
      minWidth: "150px",
    },
    {
      name: "Kakaotalk ID",
      selector: (row) => row.kakaoId,
      minWidth: "150px",
    },
    {
      name: "Status",
      // selector: (row) => row.useStatus,
      maxWidth: "60px",
      cell: (row) => (
        <Badge
          w={60}
          variant="light"
          color={row.useStatus === "USE" ? "green" : "red"}
        >
          {row.useStatus}
        </Badge>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex gap={20}>
          <IconEdit
            stroke={1.5}
            onClick={() => navigate(`edit/${row.id}`)}
            style={{ cursor: "pointer", color: "#5588B7" }}
          />
          <EmployeeDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return employeeColumns;
};
