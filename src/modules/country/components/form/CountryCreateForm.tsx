import { useForm } from "@mantine/form";
import { CountryCreateFormValues } from "../../types";
import { useCreateCountry } from "../../hooks/useCreateCountry";
import { Button, Flex, Text, TextInput } from "@mantine/core";
import { FC } from "react";

type CountryCreateFormProps = {
  close: () => void;
};

export const CountryCreateForm: FC<CountryCreateFormProps> = ({ close }) => {
  const { mutate, isPending } = useCreateCountry();

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (!value ? "name is required" : null),
    },
  });

  const onSubmit = (values: CountryCreateFormValues) => {
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
          Country
        </Text>
        <TextInput
          w="50%"
          {...form.getInputProps("name")}
          placeholder="Enter country name"
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

CountryCreateForm.displayName = "CountryCreateForm";
