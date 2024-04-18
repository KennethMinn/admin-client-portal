import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { AlertModal } from "../../../../../components/modal/alert-modal";
import { useDeleteCountry } from "../../../hooks/useDeleteCountry";

export const CountryDeleteForm = ({ id }: { id: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useDeleteCountry();

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

CountryDeleteForm.displayName = "CountryDeleteForm";
