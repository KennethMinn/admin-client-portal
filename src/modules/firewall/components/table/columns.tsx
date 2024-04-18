import { TableColumn } from "react-data-table-component";
import { FireWallDataRow } from "../../types";
import { Flex } from "@mantine/core";
import { FirewallEditFormModal } from "../modal/edit/FirewallEditFormModal";
import { FirewallDeleteForm } from "../modal/delete/FirewallDeleteForm";

export const useFirewallColumns = () => {
  const firewallColumns: TableColumn<FireWallDataRow>[] = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "100px",
    },
    {
      name: "Item",
      selector: (row) => row.itemName,
      minWidth: "200px",
    },
    {
      name: "Permitted IP",
      selector: (row) => row.ipAddress,
      minWidth: "120px",
    },
    {
      name: "Registrant",
      selector: (row) => row.createdBy,
      minWidth: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex gap={20}>
          <FirewallEditFormModal id={row.id} />
          <FirewallDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return firewallColumns;
};
