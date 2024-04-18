import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { useGetDocument } from "../../../hooks/useGetDocument";
import { DocumentEditForm } from "../../form/DocumentEditForm";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type CountryEditFormModalProps = {
  id: string;
};

export const DocumentEditFormModal: FC<CountryEditFormModalProps> = ({
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: country } = useGetDocument(id);

  return (
    <>
      <CustomModal
        size={516}
        opened={opened}
        close={close}
        header="Document Management"
      >
        <Box component="div" px={10}>
          <DocumentEditForm country={country} id={id} close={close} />
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

DocumentEditFormModal.displayName = "DocumentEditFormModal";
