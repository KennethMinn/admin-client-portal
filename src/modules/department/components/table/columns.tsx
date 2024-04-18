import { Badge, Flex } from "@mantine/core";
import { TableColumn } from "react-data-table-component";
import { DepartmentDataRow, SubDepartmentDataRow } from "../../types";
import { HigherDepartmentDeleteForm } from "../form/delete/HigherDepartmentDeleteForm";
import { HigherEditFormModal } from "../modal/edit/HigherEditFormModal";
import { LowerEditFormModal } from "../modal/edit/LowerEditFormModal";
import { LowerDepartmentDeleteForm } from "../form/delete/LowerDepartmentDeleteForm";
import { useTranslation } from "react-i18next";

export const useDepartmentColumns = () => {
  const { t } = useTranslation();

  const departmentsColumns: TableColumn<DepartmentDataRow>[] = [
    {
      name: t("column_no"),
      selector: (row) => row.no,
      width: "60px",
    },
    {
      name: t("country"),
      selector: (row) => row.country,
      maxWidth: "50px",
    },
    {
      name: "Department Code",
      selector: (row) => row.formattedCode,
      minWidth: "155px",
    },
    {
      name: "Department",
      selector: (row) => row.name,
      minWidth: "170px",
    },
    {
      name: "Creation department date",
      selector: (row) => row.createdDate,
      minWidth: "220px",
    },
    {
      name: "Department closing date",
      selector: (row) => row.closeDate ?? "-",
      minWidth: "220px",
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
          <HigherEditFormModal id={row.id} />
          <HigherDepartmentDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  const subDepartmentsColumns: TableColumn<SubDepartmentDataRow>[] = [
    {
      name: "Country",
      selector: (row) => row.country,
      maxWidth: "50px",
    },
    {
      name: "Department Code",
      selector: (row) => row.formattedCode,
      minWidth: "155px",
    },
    {
      name: "Department",
      selector: (row) => row.name,
      minWidth: "170px",
    },
    {
      name: "Creation department date",
      selector: (row) => row.createdDate,
      minWidth: "220px",
    },
    {
      name: "Department closing date",
      selector: (row) => row.closeDate ?? "-",
      minWidth: "220px",
    },
    {
      name: "Status",
      // selector: (row) => row.useStatus,
      maxWidth: "60px",
      cell: (row) => (
        <Badge
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
          <LowerEditFormModal id={row.id} />
          <LowerDepartmentDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return { departmentsColumns, subDepartmentsColumns };
};
