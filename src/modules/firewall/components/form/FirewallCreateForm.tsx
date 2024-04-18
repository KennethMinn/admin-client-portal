import { useForm } from "@mantine/form";
import { FireWallCreateFormValues } from "../../types";
import { useCreateFirewall } from "../../hooks/useCreateFirewall";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { FC } from "react";
import { useAuth } from "../../../../hooks/auth/useAuth";

type CountryCreateFormProps = {
  close: () => void;
};

export const FirewallCreateForm: FC<CountryCreateFormProps> = ({ close }) => {
  const { mutate, isPending } = useCreateFirewall();
  const { auth } = useAuth();

  const form = useForm({
    initialValues: {
      itemName: "",
      ipAddress: "",
      createdBy: auth?.username,
    },

    validate: {
      itemName: (value) => (!value ? "this field is required" : null),
      ipAddress: (value) => (!value ? "this field is required" : null),
      createdBy: (value) => (!value ? "this field is required" : null),
    },
  });

  const onSubmit = (values: FireWallCreateFormValues) => {
    try {
      mutate(values);
      close();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
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
      <Flex gap={15} mt={30} justify="end" align="center">
        <Button
          radius={4}
          size="xs"
          variant="outline"
          color="#1C1C1C"
          w={80}
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          radius={4}
          size="xs"
          color="#1C1C1C"
          w={80}
          loading={isPending}
          disabled={isPending}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

FirewallCreateForm.displayName = "FirewallCreateForm";
