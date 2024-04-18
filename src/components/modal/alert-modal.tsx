import { Button, Flex, Modal, Text } from "@mantine/core";
import { FC } from "react";

type AlertModalProps = {
  opened: boolean;
  close: () => void;
  onConfirm: () => void;
  header: string;
  title: string;
  description?: string;
  isLoading: boolean;
};

export const AlertModal: FC<AlertModalProps> = ({
  opened,
  close,
  header,
  title,
  description,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal
      size="sm"
      centered
      opened={opened}
      onClose={close}
      title={header}
      styles={{
        title: {
          fontSize: "20px",
          fontWeight: 600,
        },
      }}
    >
      <Flex direction="column">
        <Text>{title}</Text>
        {description && (
          <Text opacity={0.5} fz={12}>
            {description}
          </Text>
        )}
      </Flex>
      <Flex justify="end" gap={15} mt={20}>
        <Button radius={4} size="xs" onClick={close} color="gray">
          Cancel
        </Button>
        <Button
          radius={4}
          size="xs"
          loading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
          color="red"
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};

AlertModal.displayName = "AlertModal";
