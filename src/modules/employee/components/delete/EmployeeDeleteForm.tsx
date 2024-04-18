import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteEmployee } from "../../hooks/useDeleteEmployee";
import { AlertModal } from "../../../../components/modal/alert-modal";

export const EmployeeDeleteForm = ({ id }: { id: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useDeleteEmployee();

  const onDelete = async () => {
    mutate(id);
  };

  return (
    <>
      <AlertModal
        isLoading={isPending}
        onConfirm={onDelete}
        header="Delete Employee"
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

EmployeeDeleteForm.displayName = "EmployeeDeleteForm";
