import { useDisclosure } from "@mantine/hooks";
import { CustomModal } from "../../../../components/modal/custom-modal";
import { Button, Flex, Select, Slider, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { Skill } from "../../types";
import { useGetAllSkills } from "../../../skill/hooks/useGetAllSkills";

type SkillCreateFormProps = {
  newSkill: Skill;
  setSkills: Dispatch<SetStateAction<Skill[]>>;
  setNewSkill: Dispatch<SetStateAction<Skill>>;
};

export const SkillCreateForm: FC<SkillCreateFormProps> = ({
  newSkill,
  setNewSkill,
  setSkills,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: skills } = useGetAllSkills();
  const memoizedSkills = useMemo(() => skills, [skills]);

  const handleChange = (field: string, value: string | number) => {
    setNewSkill((prevSkill) => ({ ...prevSkill, [field]: value }));
    console.log(newSkill);
  };

  const handleAddSkill = () => {
    if (
      newSkill.name &&
      newSkill.percentage >= 1 &&
      newSkill.percentage <= 100
    ) {
      setSkills((prevSkills) => [...prevSkills, { ...newSkill }]);
      setNewSkill({ name: "", percentage: 0 });
      close();
    }
    return;
  };

  return (
    <>
      <CustomModal
        size={516}
        opened={opened}
        close={close}
        header="Skills  And Proficiency "
      >
        <Flex h={50} justify="space-between" align="center" gap={24}>
          <Text w="50%" fz={14}>
            Country
          </Text>
          <Select
            value={newSkill.name}
            onChange={(value) => handleChange("name", value!)}
            w="50%"
            placeholder="Select skills"
            data={memoizedSkills?.map((skill: Skill) => ({
              label: skill.name,
              value: skill.name,
            }))}
          />
        </Flex>
        <Flex h={50} justify="space-between" align="center" gap={24}>
          <Text w="50%" fz={14}>
            Proficiency level
          </Text>
          <Slider
            color="#1C1C1C"
            w="50%"
            value={newSkill.percentage}
            onChange={(value) => handleChange("percentage", value)}
          />
        </Flex>
        <Flex gap={15} mt={20} justify="end" align="center">
          <Button
            radius={4}
            size="xs"
            variant="outline"
            type="button"
            color="#1C1C1C"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            radius={4}
            size="xs"
            color="#1C1C1C"
            onClick={handleAddSkill}
            //   loading={isPending}
            //   disabled={isPending}
          >
            Submit
          </Button>
        </Flex>
      </CustomModal>

      <Flex justify="end">
        <Button
          bg="#DADADA"
          c="#3D3D3D"
          onClick={open}
          leftSection={<IconPlus size={15} />}
        >
          Add
        </Button>
      </Flex>
    </>
  );
};

SkillCreateForm.displayName = "SkillCreateForm";
