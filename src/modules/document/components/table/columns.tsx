import { TableColumn } from "react-data-table-component";
import { DocumentDataRow } from "../../types";
import { Badge, Flex } from "@mantine/core";
import { DocumentEditFormModal } from "../modal/edit/DocumentEditFormModal";
import { DocumentDeleteForm } from "../modal/delete/DocumentDeleteForm";

export const useDocumentColumns = () => {
  const documentColumns: TableColumn<DocumentDataRow>[] = [
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
          <DocumentEditFormModal id={row.id} />
          <DocumentDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return documentColumns;
};
