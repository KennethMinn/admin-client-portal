import { useForm } from "@mantine/form";
import { DocumentCreateFormValues } from "../../types";
import { useCreateDocument } from "../../hooks/useCreateDocument";
import { Button, Flex, Text, TextInput } from "@mantine/core";
import { FC } from "react";

type CountryCreateFormProps = {
  close: () => void;
};

export const DocumentCreateForm: FC<CountryCreateFormProps> = ({ close }) => {
  const { mutate, isPending } = useCreateDocument();

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (!value ? "name is required" : null),
    },
  });

  const onSubmit = (values: DocumentCreateFormValues) => {
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
      <Flex h={50} justify="space-between" align="center" gap={24}>
        <Text w="50%" fz={14}>
          Document name
        </Text>
        <TextInput
          w="50%"
          {...form.getInputProps("name")}
          placeholder="Enter document name"
        />
      </Flex>
      <Flex gap={15} mt={30} justify="end" align="center">
        <Button
          radius={4}
          color="#1C1C1C"
          w={80}
          size="xs"
          variant="outline"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          radius={4}
          color="#1C1C1C"
          w={80}
          size="xs"
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

DocumentCreateForm.displayName = "DocumentCreateForm";
