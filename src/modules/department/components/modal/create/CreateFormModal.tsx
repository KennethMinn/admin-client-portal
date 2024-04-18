import { Button, Flex, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HigherDepartmentCreateForm } from "../../form/create/HigherDepartmentCreateForm";
import { LowerDepartmentCreateForm } from "../../form/create/LowerDepartmentCreateForm";
import { FC } from "react";
import { DepartmentDataRow } from "../../../types";
import { IconPlus } from "@tabler/icons-react";
import { CustomModal } from "../../../../../components/modal/custom-modal";

type CreateFormModalProps = {
  higherDepartments: DepartmentDataRow[];
};

export const CreateFormModal: FC<CreateFormModalProps> = ({
  higherDepartments,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <CustomModal
        size={600}
        opened={opened}
        close={close}
        header="Department Management"
      >
        <Tabs defaultValue="higherDepartment">
          <Tabs.List w="100%">
            <Tabs.Tab w="50%" value="higherDepartment">
              Higher Department
            </Tabs.Tab>
            <Tabs.Tab w="50%" value="lowerDepartment">
              Lower Department
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="higherDepartment" px={10}>
            <HigherDepartmentCreateForm close={close} />
          </Tabs.Panel>
          <Tabs.Panel value="lowerDepartment" px={10}>
            <LowerDepartmentCreateForm
              higherDepartments={higherDepartments}
              close={close}
            />
          </Tabs.Panel>
        </Tabs>
      </CustomModal>

      <Flex justify="end" my={20}>
        <Button
          bg="#DADADA"
          c="#3D3D3D"
          onClick={open}
          leftSection={<IconPlus size={15} />}
        >
          Create
        </Button>
      </Flex>
    </>
  );
};

CreateFormModal.displayName = "CreateFormModal";
