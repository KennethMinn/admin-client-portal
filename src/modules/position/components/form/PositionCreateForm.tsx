import { useForm } from "@mantine/form";
import { Button, Flex, Text, TextInput } from "@mantine/core";
import { PositionCreateFormValues } from "../../types";
import { useCreatePosition } from "../../hooks/useCreatePosition";
import { FC } from "react";

type PositionCreateFormProps = {
  close: () => void;
};

export const PositionCreateForm: FC<PositionCreateFormProps> = ({ close }) => {
  const { mutate, isPending } = useCreatePosition();

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (!value ? "name is required" : null),
    },
  });

  const onSubmit = (values: PositionCreateFormValues) => {
    try {
      mutate(values);
      form.reset();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Flex h={50} justify="space-between" align="center" gap={24}>
        <Text w="50%" fz={14}>
          Position
        </Text>
        <TextInput
          w="50%"
          {...form.getInputProps("name")}
          placeholder="Enter position name"
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
          color="#1C1C1C"
          w={80}
          radius={4}
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

PositionCreateForm.displayName = "PositionCreateForm";
