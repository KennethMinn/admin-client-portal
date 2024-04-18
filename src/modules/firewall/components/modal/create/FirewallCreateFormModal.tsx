import { Box, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import { CustomModal } from "../../../../../components/modal/custom-modal";
import { FirewallCreateForm } from "../../form/FirewallCreateForm";

export const FirewallCreateFormModal: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <CustomModal
        size={516}
        opened={opened}
        close={close}
        header="FireWall Management"
      >
        <Box component="div" px={10}>
          <FirewallCreateForm close={close} />
        </Box>
      </CustomModal>

      <Flex justify="end">
        <Button
          bg="#DADADA"
          c="#3D3D3D"
          onClick={open}
          leftSection={<IconPlus size={15} />}
        >
          Create
        </Button>
      </Flex>
    </>
  );
};

FirewallCreateFormModal.displayName = "FirewallCreateFormModal";
