import { useForm } from "@mantine/form";
import { DocumentDataRow, DocumentUpdateFormValues } from "../../types";
import { Button, Flex, Radio, Stack, Text, TextInput } from "@mantine/core";
import { FC } from "react";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

type CountryEditFormProps = {
  country: DocumentDataRow;
  id: string;
  close: () => void;
};

export const DocumentEditForm: FC<CountryEditFormProps> = ({
  country,
  id,
  close,
}) => {
  const { mutate, isPending } = useUpdateDocument();
  const form = useForm({
    initialValues: country && {
      name: country.name || "",
      useStatus: country.useStatus || "",
    },

    validate: {
      name: (value) => (!value ? "name is required" : null),
      useStatus: (value) => (!value ? "useStatus is required" : null),
    },
  });

  const onSubmit = async (values: DocumentUpdateFormValues) => {
    const data = { id, ...values };
    mutate(data);
    close();
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16}>
        <Flex align="center" justify="space-between">
          <Text w="50%" fz={14}>
            Country
          </Text>
          <TextInput
            w="50%"
            placeholder="Enter document name"
            {...form.getInputProps("name")}
          />
        </Flex>
        <Flex align="center">
          <Text w="50%" fz={14}>
            Status
          </Text>
          <Flex gap={30}>
            <Radio
              color="#1C1C1C"
              styles={{
                label: {
                  marginRight: "15px",
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
                },
              }}
              w={70}
              name="useStatus"
              defaultChecked={country.useStatus === "USE"}
              {...form.getInputProps("useStatus")}
              label="Use"
              value="USE"
            />
            <Radio
              color="#1C1C1C"
              styles={{
                label: {
                  marginRight: "15px",
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
                },
              }}
              defaultChecked={country.useStatus === "STOP"}
              {...form.getInputProps("useStatus")}
              name="useStatus"
              label="Stop"
              value="STOP"
            />
          </Flex>
        </Flex>
        <Flex justify="end" align="center" mt={15} gap={15}>
          <Button
            size="xs"
            color="#1C1C1C"
            w={80}
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

DocumentEditForm.displayName = "DocumentEditForm";
