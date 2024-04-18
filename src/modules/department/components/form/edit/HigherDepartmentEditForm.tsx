import {
  Button,
  Checkbox,
  Flex,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";
import { getTodayDate } from "../../../../../utils/todayDate";
import { useUpdateHigherDepartment } from "../../../hooks/higher/useUpdateHigherDepartment";
import {
  DepartmentDataRow,
  HigherDepartmentEditFormValues,
} from "../../../types";
import { useGetAllCountries } from "../../../../country/hooks/useGetAllCountries";
import { Country } from "../../../../country/types";

type HigherDepartmentEditFormProps = {
  close: () => void;
  id: string;
  data: DepartmentDataRow;
};

export const HigherDepartmentEditForm: FC<HigherDepartmentEditFormProps> = ({
  close,
  id,
  data,
}) => {
  const today = getTodayDate();
  const { mutate, isPending } = useUpdateHigherDepartment();
  const { data: countries } = useGetAllCountries("USE");
  const form = useForm({
    initialValues: data && {
      countryId: data.countryId,
      name: data.name,
      closed: data.closed,
      useStatus: data.useStatus,
      chartMarkStatus: data.chartMarkStatus,
    },

    validate: {
      countryId: (value) => (!value ? "required" : null),
      name: (value) => (!value ? "required" : null),
    },
  });
  const onSubmit = async (values: HigherDepartmentEditFormValues) => {
    const data = {
      ...values,
      id: id,
    };

    try {
      await mutate(data);
      close();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack mt={25} gap={20}>
        <Flex align="center">
          <Text w="50%">Country</Text>
          <Select
            w="50%"
            {...form.getInputProps("countryId")}
            placeholder="Select Country"
            data={
              countries && [
                ...countries.map((country: Country) => ({
                  value: country.id,
                  label: country.name,
                })),
              ]
            }
          />
        </Flex>
        <Flex align="center">
          <Text w="50%">Department Name</Text>
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
              color="#1C1C1C"
              defaultChecked={data.closed}
              {...form.getInputProps("closed")}
              id="isClosingHigherDepartment"
            />
            <Stack gap={0}>
              <label
                style={{ fontSize: "13px", cursor: "pointer" }}
                htmlFor="isClosingHigherDepartment"
              >
                Check when department is closed
              </label>
              <Text fz={11} opacity={0.6}>
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="isClosingHigherDepartment"
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
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
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
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
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
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
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
                  cursor: "pointer",
                },
                radio: {
                  cursor: "pointer",
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
            radius={4}
            w={80}
            color="#1C1C1C"
            size="xs"
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

HigherDepartmentEditForm.displayName = "HigherDepartmentEditForm";
