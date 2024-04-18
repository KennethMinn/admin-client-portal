import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { useGetPosition } from "../../../hooks/useGetPosition";
import { PositionEditForm } from "../../form/PositionEditForm";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type PositionEditFormModalProps = {
  id: string;
};

export const PositionEditFormModal: FC<PositionEditFormModalProps> = ({
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: position } = useGetPosition(id);

  return (
    <>
      <CustomModal
        size={516}
        opened={opened}
        close={close}
        header="Position Management"
      >
        <Box component="div" px={10}>
          <PositionEditForm position={position} id={id} close={close} />
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

PositionEditFormModal.displayName = "PositionEditFormModal";
