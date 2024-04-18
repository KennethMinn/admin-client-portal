import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useDeletePosition } from "../../../hooks/useDeletePosition";
import { AlertModal } from "../../../../../components/modal/alert-modal";

export const PositionDeleteForm = ({ id }: { id: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useDeletePosition();

  const onDelete = async () => {
    mutate(id);
    close();
  };

  return (
    <>
      <AlertModal
        isLoading={isPending}
        onConfirm={onDelete}
        header="Confirm Deletion"
        title="Are you sure you want to delete?"
        // description="This action cannot be undone."
        opened={opened}
        close={close}
      />
      <IconTrash
        stroke={1.5}
        onClick={open}
        style={{ cursor: "pointer", color: "#D05151" }}
      />
    </>
  );
};

PositionDeleteForm.displayName = "PositionDeleteForm";
