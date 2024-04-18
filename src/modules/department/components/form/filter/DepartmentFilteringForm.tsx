import { Box, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { FC } from "react";
import { DepartmentDataRow } from "../../../types";

type DepartmentFilteringFormValues = {
  // higherDepartment: string;
  // lowerDepartment: string;
  searchKey: string;
};

type DepartmentFilteringFormProps = {
  // higherDepartments: DepartmentDataRow[];
  setSearchKey: (searchKey: string) => void;
};

export const DepartmentFilteringForm: FC<DepartmentFilteringFormProps> = ({
  setSearchKey,
}) => {
  // const [higherDepartment, setHigherDepartment] = useState("");
  // const { data: lowerDepartments } =
  //   useGetLowerDepartmentsByParentId(higherDepartment);

  const form = useForm<DepartmentFilteringFormValues>({
    initialValues: {
      // higherDepartment: "",
      // lowerDepartment: "",
      searchKey: "",
    },
  });

  const onSubmit = (values: DepartmentFilteringFormValues) => {
    setSearchKey(values.searchKey);
    // form.reset();
  };

  // useEffect(() => {
  //   setHigherDepartment(form.values.higherDepartment);
  // }, [form.values.higherDepartment]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Flex gap={20}>
        {/* <Select
          // disabled={!!form.values.lowerDepartment}
          {...form.getInputProps("higherDepartment")}
          maxDropdownHeight={160}
          placeholder="Higher Department"
          data={higherDepartments.map((department) => ({
            label: department.name,
            value: department.id,
          }))}
        />
        <Select
          disabled={!form.values.higherDepartment || !lowerDepartments}
          {...form.getInputProps("lowerDepartment")}
          placeholder="Lower Department"
          data={lowerDepartments?.map((department: SubDataRow) => ({
            label: department.name,
            value: department.id,
          }))}
        /> */}
        <Box component="div" style={{ position: "relative" }}>
          <TextInput
            w={300}
            placeholder="Search department..."
            {...form.getInputProps("searchKey")}
          />
          <button
            type="submit"
            style={{
              height: "25px",
              lineHeight: "25px",
              backgroundColor: "transparent",
              border: "none",
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
              opacity: 0.7,
            }}
          >
            <IconSearch size={20} />
          </button>
        </Box>
      </Flex>
    </form>
  );
};

DepartmentFilteringForm.displayName = "DepartmentFilteringForm";
