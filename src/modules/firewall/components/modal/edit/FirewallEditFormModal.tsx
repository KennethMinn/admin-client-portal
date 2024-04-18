import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { useGetFirewall } from "../../../hooks/useGetFirewall";
import { FirewallEditForm } from "../../form/FirewallEditForm";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type CountryEditFormModalProps = {
  id: string;
};

export const FirewallEditFormModal: FC<CountryEditFormModalProps> = ({
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: firewall } = useGetFirewall(id);

  return (
    <>
      <CustomModal
        size={516}
        opened={opened}
        close={close}
        header="Firewall Management"
      >
        <Box component="div" px={10}>
          <FirewallEditForm firewall={firewall} id={id} close={close} />
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

FirewallEditFormModal.displayName = "FirewallEditFormModal";
