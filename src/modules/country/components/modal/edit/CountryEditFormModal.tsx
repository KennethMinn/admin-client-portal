import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { useGetCountry } from "../../../hooks/useGetCountry";
import { CountryEditForm } from "../../form/CountryEditForm";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type CountryEditFormModalProps = {
  id: string;
};

export const CountryEditFormModal: FC<CountryEditFormModalProps> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: country } = useGetCountry(id);

  return (
    <>
      <CustomModal
        size={516}
        opened={opened}
        close={close}
        header="Country Management"
      >
        <Box component="div" px={10}>
          <CountryEditForm country={country} id={id} close={close} />
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

CountryEditFormModal.displayName = "CountryEditFormModal";
