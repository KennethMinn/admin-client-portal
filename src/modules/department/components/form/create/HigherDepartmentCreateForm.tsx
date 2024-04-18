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
import { useCreateHigherDepartment } from "../../../hooks/higher/useCreateHigherDepartment";
import { useGetAllCountries } from "../../../../country/hooks/useGetAllCountries";
import { Country } from "../../../../country/types";
import { HigherDepartmentCreateFormValues } from "../../../types";

type HigherDepartmentCreateFormProps = {
  close: () => void;
};

export const HigherDepartmentCreateForm: FC<
  HigherDepartmentCreateFormProps
> = ({ close }) => {
  const { mutate: addHigherDepartment, isPending } =
    useCreateHigherDepartment();
  const { data: countries } = useGetAllCountries("USE");
  const form = useForm<HigherDepartmentCreateFormValues>({
    initialValues: {
      country: "",
      name: "",
      useStatus: "USE",
      chartMarkStatus: "SHOW",
    },

    validate: {
      country: (value: string) => (!value ? "required" : null),
      name: (value: string) => (!value ? "name is required" : null),
    },
  });
  const onSubmit = async (values: HigherDepartmentCreateFormValues) => {
    try {
      await addHigherDepartment(values);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack mt={25} gap={20}>
        <Flex align="center">
          <Text w="50%">Country</Text>
          <Select
            w="50%"
            {...form.getInputProps("country")}
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
        <Flex gap={15} mt={20} justify="end" align="center">
          <Button
            radius={4}
            size="xs"
            variant="outline"
            color="#1C1C1C"
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

HigherDepartmentCreateForm.displayName = "HigherDepartmentCreateForm";
