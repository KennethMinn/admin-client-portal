import { useForm } from "@mantine/form";
import { FireWallDataRow, FireWallUpdateFormValues } from "../../types";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { FC } from "react";
import { useUpdateFirewall } from "../../hooks/useUpdateFirewall";

type CountryEditFormProps = {
  firewall: FireWallDataRow;
  id: string;
  close: () => void;
};

export const FirewallEditForm: FC<CountryEditFormProps> = ({
  firewall,
  id,
  close,
}) => {
  const { mutate, isPending } = useUpdateFirewall();
  const form = useForm({
    initialValues: firewall && {
      itemName: firewall.itemName || "",
      ipAddress: firewall.ipAddress || "",
    },

    validate: {
      itemName: (value) => (!value ? "this field is required" : null),
      ipAddress: (value) => (!value ? "this field is required" : null),
    },
  });

  const onSubmit = async (values: FireWallUpdateFormValues) => {
    const data = { id, ...values };
    mutate(data);
    close();
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16}>
        <Stack>
          <Flex h={50} justify="space-between" align="center" gap={24}>
            <Text w="50%" fz={14}>
              Item name
            </Text>
            <TextInput
              w="50%"
              {...form.getInputProps("itemName")}
              placeholder="Enter item name"
            />
          </Flex>
          <Flex h={50} justify="space-between" align="center" gap={24}>
            <Text w="50%" fz={14}>
              Permitted IP
            </Text>
            <TextInput
              w="50%"
              {...form.getInputProps("ipAddress")}
              placeholder="Enter IP"
            />
          </Flex>
        </Stack>
        <Flex justify="end" align="center" mt={15} gap={15}>
          <Button
            color="#1C1C1C"
            w={80}
            size="xs"
            radius={4}
            variant="outline"
            type="button"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            color="#1C1C1C"
            w={80}
            size="xs"
            radius={4}
            loading={isPending}
            disabled={isPending}
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

FirewallEditForm.displayName = "FirewallEditForm";
