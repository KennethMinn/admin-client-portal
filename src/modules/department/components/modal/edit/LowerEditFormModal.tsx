import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";

import { LowerDepartmentEditForm } from "../../form/edit/LowerDepartmentEditForm";
import { useGetLowerDepartment } from "../../../hooks/lower/useGetLowerDepartment";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type LowerEditFormModal = {
  id: string;
};

export const LowerEditFormModal: FC<LowerEditFormModal> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: lowerDepartment } = useGetLowerDepartment(id);

  return (
    <>
      <CustomModal
        size={600}
        opened={opened}
        close={close}
        header="Department Management"
      >
        <Box component="div" px={10}>
          <LowerDepartmentEditForm
            id={id}
            data={lowerDepartment}
            close={close}
          />
        </Box>
      </CustomModal>

      <IconEdit
        stroke={1.5}
        onClick={open}
        style={{ cursor: "pointer", color: "#5588B7" }}
      />
    </>
  );
};

LowerEditFormModal.displayName = "EditFormModal";
