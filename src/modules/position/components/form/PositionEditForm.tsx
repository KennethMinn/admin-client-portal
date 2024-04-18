import { useForm } from "@mantine/form";
import { Button, Flex, Radio, Stack, Text, TextInput } from "@mantine/core";
import { FC } from "react";
import { PositionDataRow, PositionUpdateFormValues } from "../../types";
import { useUpdatePosition } from "../../hooks/useUpdatePosition";

type PositionEditFormProps = {
  position: PositionDataRow;
  id: string;
  close: () => void;
};

export const PositionEditForm: FC<PositionEditFormProps> = ({
  position,
  id,
  close,
}) => {
  const { mutate, isPending } = useUpdatePosition();
  const form = useForm({
    initialValues: position && {
      name: position.name || "",
      useStatus: position.useStatus || "",
    },

    validate: {
      name: (value) => (!value ? "name is required" : null),
      useStatus: (value) => (!value ? "useStatus is required" : null),
    },
  });

  const onSubmit = async (values: PositionUpdateFormValues) => {
    const data = { id, ...values };
    mutate(data);
    close();
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16}>
        <Flex align="center" justify="space-between">
          <Text w="50%" fz={14}>
            Position
          </Text>
          <TextInput
            w="50%"
            placeholder="Enter position name"
            {...form.getInputProps("name")}
          />
        </Flex>
        <Flex align="center">
          <Text w="50%">Status</Text>
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
              defaultChecked={position.useStatus === "USE"}
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
              defaultChecked={position.useStatus === "STOP"}
              {...form.getInputProps("useStatus")}
              name="useStatus"
              label="Stop"
              value="STOP"
            />
          </Flex>
        </Flex>
        <Flex justify="end" align="center" mt={15} gap={8}>
          <Button
            color="#1C1C1C"
            w={80}
            radius={4}
            size="xs"
            variant="outline"
            type="button"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            size="xs"
            color="#1C1C1C"
            w={80}
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

PositionEditForm.displayName = "PositionEditForm";
