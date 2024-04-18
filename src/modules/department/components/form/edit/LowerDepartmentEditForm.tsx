import {
  Button,
  Checkbox,
  Flex,
  Radio,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";
import { getTodayDate } from "../../../../../utils/todayDate";
import { LowerDepartmentEditFormValues } from "../../../types";
import { useUpdateLowerDepartment } from "../../../hooks/lower/useUpdateLowerDepartment";

type LowerDepartmentEditFormProps = {
  close: () => void;
  id: string;
  data: LowerDepartmentEditFormValues;
};

export const LowerDepartmentEditForm: FC<LowerDepartmentEditFormProps> = ({
  close,
  id,
  data,
}) => {
  const today = getTodayDate();
  const { mutate, isPending } = useUpdateLowerDepartment();
  const form = useForm<LowerDepartmentEditFormValues>({
    initialValues: data && {
      name: data.name,
      closed: data.closed,
      useStatus: data.useStatus,
      chartMarkStatus: data.chartMarkStatus,
    },

    validate: {
      name: (value) => (!value ? "required" : null),
    },
  });
  const onSubmit = (values: LowerDepartmentEditFormValues) => {
    const data = { ...values, id };
    try {
      mutate(data);
      close();
    } catch (error) {
      console.error();
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack mt={25} gap={20}>
        <Flex align="center">
          <Text w="50%">Lower Department Name</Text>
          <TextInput
            w="50%"
            placeholder="Enter Department Name"
            {...form.getInputProps("name")}
          />
        </Flex>
        <Flex align="center">
          <Text w="50%">Closing Department</Text>
          <Flex align="center" gap={15}>
            <Checkbox
              defaultChecked={data.closed}
              {...form.getInputProps("closed")}
              id="isClosingLowerDepartment"
            />
            <Stack gap={0}>
              <label
                style={{ fontSize: "13px", cursor: "pointer" }}
                htmlFor="isClosingLowerDepartment"
              >
                Check when department is closed
              </label>
              <Text fz={11} opacity={0.6}>
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="isClosingLowerDepartment"
                >
                  Today's date : {today}
                </label>
              </Text>
            </Stack>
          </Flex>
        </Flex>
        <Flex align="center">
          <Text w="50%">Status</Text>
          <Flex gap={30}>
            <Radio
              color="#1C1C1C"
              styles={{
                label: {
                  marginRight: "15px",
                },
              }}
              w={70}
              name="useStatus"
              defaultChecked={data.useStatus === "USE"}
              {...form.getInputProps("useStatus")}
              label="Use"
              value="USE"
            />
            <Radio
              color="#1C1C1C"
              styles={{
                label: {
                  marginRight: "15px",
                },
              }}
              defaultChecked={data.useStatus === "STOP"}
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
                },
              }}
              name="chartMarkStatus"
              defaultChecked={data.chartMarkStatus === "SHOW"}
              {...form.getInputProps("chartMarkStatus")}
              label="Display"
              value="SHOW"
            />
            <Radio
              color="#1C1C1C"
              styles={{
                label: {
                  marginRight: "15px",
                },
              }}
              defaultChecked={data.chartMarkStatus === "HIDE"}
              {...form.getInputProps("chartMarkStatus")}
              name="chartMarkStatus"
              label="Not Display"
              value="HIDE"
            />
          </Flex>
        </Flex>
        <Flex mt={20} gap={15} justify="end" align="center">
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
            color="#1C1C1C"
            w={80}
            radius={4}
            size="xs"
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            Save
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

LowerDepartmentEditForm.displayName = "LowerDepartmentEditForm";
