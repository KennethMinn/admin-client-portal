import {
  Button,
  Flex,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";

import { useCreateLowerDepartment } from "../../../hooks/lower/useCreateLowerDepartment";
import {
  DepartmentDataRow,
  LowerDepartmentCreateFormValues,
} from "../../../types";

type LowerDepartmentCreateFormProps = {
  close: () => void;
  higherDepartments: DepartmentDataRow[];
};

export const LowerDepartmentCreateForm: FC<LowerDepartmentCreateFormProps> = ({
  close,
  higherDepartments,
}) => {
  const form = useForm<LowerDepartmentCreateFormValues>({
    initialValues: {
      parentDepartmentId: "",
      name: "",
      useStatus: "USE",
      chartMarkStatus: "SHOW",
    },

    validate: {
      // country: (value) => (value.length < 1 ? "country is required" : null),
      parentDepartmentId: (value) => {
        if (!higherDepartments?.length) return "create higher department first";
        if (!value) return "value is required";
        return null;
      },
      name: (value) => (!value ? "name is required" : null),
    },
  });

  const { mutate, isPending } = useCreateLowerDepartment();

  const onSubmit = (values: LowerDepartmentCreateFormValues) => {
    try {
      mutate(values);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack mt={25} gap={20}>
        <Flex align="center">
          <Text w="50%">Higher Department Name</Text>
          <Select
            w="50%"
            {...form.getInputProps("parentDepartmentId")}
            placeholder="Select Higher Department"
            data={higherDepartments?.map((data: DepartmentDataRow) => ({
              label: data.name + ` - ${data.country}`,
              value: data.id,
            }))}
          />
        </Flex>
        <Flex align="center">
          <Text w="50%">Lower Department Name</Text>
          <TextInput
            w="50%"
            placeholder="Enter Department Name"
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
              defaultChecked
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
              {...form.getInputProps("useStatus")}
              name="useStatus"
              label="Stop"
              value="STOP"
            />
          </Flex>
        </Flex>
        <Flex align="center">
          <Text w="50%">Org chart mark status</Text>
          <Flex gap={30}>
            <Radio
              color="#1C1C1C"
              w={70}
              styles={{
                label: {
                  marginRight: "15px",
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
                },
              }}
              name="chartMarkStatus"
              defaultChecked
              {...form.getInputProps("chartMarkStatus")}
              label="Display"
              value="SHOW"
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
              {...form.getInputProps("chartMarkStatus")}
              name="chartMarkStatus"
              label="Not Display"
              value="HIDE"
            />
          </Flex>
        </Flex>
        <Flex mt={20} gap={15} justify="end" align="center">
          <Button
            radius={4}
            size="xs"
            color="#1C1C1C"
            variant="outline"
            type="button"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            radius={4}
            size="xs"
            color="#1C1C1C"
            loading={isPending}
            disabled={isPending}
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

LowerDepartmentCreateForm.displayName = "LowerDepartmentCreateForm";
