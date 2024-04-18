import { TableColumn } from "react-data-table-component";
import { Badge, Flex } from "@mantine/core";

import { PositionDataRow } from "../../types";
import { PositionDeleteForm } from "../modal/delete/PositionDeleteForm";
import { PositionEditFormModal } from "../modal/edit/PositionEditFormModal";

export const usePositionColumns = () => {
  const positionColumns: TableColumn<PositionDataRow>[] = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "100px",
    },
    {
      name: "Position Code",
      selector: (row) => row.formattedCode,
      minWidth: "200px",
    },
    {
      name: "Position name",
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
          <PositionEditFormModal id={row.id} />
          <PositionDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return positionColumns;
};
