import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { useGetHigherDepartment } from "../../../hooks/higher/useGetHigherDepartment";
import { HigherDepartmentEditForm } from "../../form/edit/HigherDepartmentEditForm";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type HigherEditFormModal = {
  id: string;
};

export const HigherEditFormModal: FC<HigherEditFormModal> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: higherDepartment } = useGetHigherDepartment(id);

  return (
    <>
      <CustomModal
        size={600}
        opened={opened}
        close={close}
        header="Department Management"
      >
        <Box component="div" px={10}>
          <HigherDepartmentEditForm
            id={id}
            data={higherDepartment}
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

HigherEditFormModal.displayName = "EditFormModal";
