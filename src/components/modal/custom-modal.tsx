import { Divider, Modal } from "@mantine/core";
import { FC, ReactNode } from "react";

type ModalProps = {
  size: string | number;
  opened: boolean;
  close: () => void;
  header: string;
  children: ReactNode;
};

export const CustomModal: FC<ModalProps> = ({
  size,
  opened,
  close,
  header,
  children,
}) => {
  return (
    <Modal
      size={size}
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
      <Divider mb={15} />
      {children}
    </Modal>
  );
};

CustomModal.displayName = "CustomModal";
