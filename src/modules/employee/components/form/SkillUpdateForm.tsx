import { useDisclosure } from "@mantine/hooks";
import { CustomModal } from "../../../../components/modal/custom-modal";
import { Button, Flex, Select, Slider, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { Skill } from "../../types";
import { useGetAllSkills } from "../../../skill/hooks/useGetAllSkills";

type SkillUpdateFormProps = {
  initialSkill: Skill;
  index: number;
  setSkills: Dispatch<SetStateAction<Skill[]>>;
};

export const SkillUpdateForm: FC<SkillUpdateFormProps> = ({
  initialSkill,
  index,
  setSkills,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: skills } = useGetAllSkills();
  const memoizedSkills = useMemo(() => skills, [skills]);
  const [updatedSkill, setUpdatedSkill] = useState<Skill>(initialSkill);

  const handleChange = (field: string, value: string | number) => {
    setUpdatedSkill((prevSkill) => ({ ...prevSkill, [field]: value }));
  };

  const handleUpdateSkill = () => {
    if (
      updatedSkill.name &&
      updatedSkill.percentage >= 1 &&
      updatedSkill.percentage <= 100
    ) {
      setSkills((prevSkills) =>
        prevSkills.map((skill, i) => (i === index ? updatedSkill : skill))
      );
      close();
    }
  };

  // Update initialSkill when the edit button is clicked
  const handleEditClick = () => {
    setUpdatedSkill(initialSkill);
    open();
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
            value={updatedSkill.name}
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
            value={updatedSkill.percentage}
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
            color="#1C1C1C"
            radius={4}
            size="xs"
            onClick={handleUpdateSkill}
            //   loading={isPending}
            //   disabled={isPending}
          >
            Update
          </Button>
        </Flex>
      </CustomModal>

      <Flex justify="end">
        <IconEdit
          onClick={handleEditClick}
          stroke={1.5}
          style={{ cursor: "pointer", color: "#5588B7" }}
        />
      </Flex>
    </>
  );
};

SkillUpdateForm.displayName = "SkillUpdateForm";
