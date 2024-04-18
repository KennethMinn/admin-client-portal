import { TableColumn } from "react-data-table-component";
import { SkillDataRow } from "../../types";
import { Badge, Flex } from "@mantine/core";
import { SkillEditFormModal } from "../modal/edit/SkillEditFormModal";
import { SkillDeleteForm } from "../modal/delete/SkillDeleteForm";

export const useSkillsColumns = () => {
  const skillColumns: TableColumn<SkillDataRow>[] = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "100px",
    },

    {
      name: "Skill",
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
          <SkillEditFormModal id={row.id} />
          <SkillDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return skillColumns;
};
