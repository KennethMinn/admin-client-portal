import { Button, Drawer, Flex, Select, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";
import { useGetAllHigherDepartments } from "../../../department/hooks/higher/useGetAllHigherDepartments";
import { useGetLowerDepartmentsByParentId } from "../../../department/hooks/lower/useGetLowerDepartmentsByParentId";
import {
  DepartmentDataRow,
  SubDepartmentDataRow,
} from "../../../department/types";
import { useEffect } from "react";
import { EmployeeFilteringFormValue } from "../../types";

export const EmployeeFilteringForm = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      department: "",
      subDepartment: "",
      authority: "",
      useStatus: "",
    },
    // validate: {
    //   subDepartment: (value) => (!value ? "This field is required" : null),
    // },
  });

  const { data: higherDepartments } = useGetAllHigherDepartments();
  const { data: lowerDepartments } = useGetLowerDepartmentsByParentId(
    form.values.department
  );

  const onSubmit = (values: EmployeeFilteringFormValue) => {
    console.log(values);
  };

  useEffect(() => {
    form.setFieldValue("subDepartment", "");
  }, [form.values.department]);

  return (
    <>
      <Button
        onClick={open}
        color="#DADADA"
        c="#3D3D3D"
        leftSection={<IconFilter stroke={1.5} size={18} />}
      >
        Filter
      </Button>
      <Drawer
        size="sm"
        opened={opened}
        position="right"
        onClose={close}
        title="Filter"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <Select
              label="Higher Department"
              {...form.getInputProps("department")}
              maxDropdownHeight={160}
              placeholder="Higher Department"
              data={higherDepartments?.map((department: DepartmentDataRow) => ({
                label: department.name,
                value: department.id,
              }))}
            />
            <Select
              label="Lower Department"
              disabled={!form.values.department || !lowerDepartments}
              {...form.getInputProps("subDepartment")}
              placeholder="Lower Department"
              data={lowerDepartments?.map(
                (department: SubDepartmentDataRow) => ({
                  label: department.name,
                  value: department.id,
                })
              )}
            />
            <Select
              label="Role"
              placeholder="All Role"
              {...form.getInputProps("authority")}
              data={[
                { value: "ADMIN", label: "Admin" },
                { value: "USER", label: "User" },
              ]}
            />
            <Select
              label="Status"
              placeholder="All Status"
              {...form.getInputProps("useStatus")}
              data={[
                { value: "USE", label: "Use" },
                { value: "STOP", label: "Stop" },
              ]}
            />
            <Flex justify="end" align="center" mt={15} gap={15}>
              <Button
                w={100}
                radius={4}
                color="#1C1C1C"
                variant="outline"
                type="button"
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                color="#1C1C1C"
                w={100}
                radius={4}
                // loading={isPending}
                // disabled={isPending}
                type="submit"
              >
                Apply
              </Button>
            </Flex>
          </Stack>
        </form>
      </Drawer>
    </>
  );
};

EmployeeFilteringForm.displayName = "Employee Filtering Form";
