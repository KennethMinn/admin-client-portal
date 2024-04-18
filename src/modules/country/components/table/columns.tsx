import { TableColumn } from "react-data-table-component";
import { CountryDataRow } from "../../types";
import { Badge, Flex } from "@mantine/core";
import { CountryEditFormModal } from "../modal/edit/CountryEditFormModal";
import { CountryDeleteForm } from "../modal/delete/CountryDeleteForm";

export const useCountryColumns = () => {
  const countryColumns: TableColumn<CountryDataRow>[] = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "100px",
    },
    {
      name: "Country Code",
      selector: (row) => row.formattedCode,
      minWidth: "200px",
    },
    {
      name: "Country",
      selector: (row) => row.name,
      minWidth: "120px",
    },
    {
      name: "Status",
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
          <CountryEditFormModal id={row.id} />
          <CountryDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return countryColumns;
};
