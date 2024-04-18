import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { AlertModal } from "../../../../../components/modal/alert-modal";
import { useDeleteLowerDepartment } from "../../../hooks/lower/useDeleteLowerDepartment";

export const LowerDepartmentDeleteForm = ({ id }: { id: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useDeleteLowerDepartment();

  const onDelete = async () => {
    mutate(id);
  };

  return (
    <>
      <AlertModal
        isLoading={isPending}
        onConfirm={onDelete}
        header="Delete Department"
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

LowerDepartmentDeleteForm.displayName = "HigherDepartmentDeleteForm";
